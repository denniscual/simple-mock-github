import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'
import { getRepoIssue, GetRepoIssueData, getRepoIssueBody } from '../../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Loader, Markdown, SuspenseAvatar, Text, Link } from '../../components'
import TimeAgo from 'react-timeago'

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'loader-container',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ IssueComments -----------
 * */

const CommentMetaText = S.styled(Text, {
    color: '$lightBlack',
})

const CommentContentSection = S.styled('section', {
    border: '$1 solid $gray2',
    borderRadius: '$1',
})

const CommentContentHeader = S.styled('header', {
    padding: '$2 $4',
    backgroundColor: '$gray3',
    borderBottom: '$1 solid $gray2',
    display: 'flex',
    justifyContent: 'space-between',
})

const CommentContentBody = S.styled('div', {
    p: '$4',
})

const CommentContainer = S.styled('article', {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '$4',
})

function IssueComment({
    login,
    createdAt,
    body,
    avatarUrl,
}: {
    login: string
    createdAt: string
    body: string
    avatarUrl: string
}) {
    return (
        <CommentContainer>
            <React.Suspense fallback={<Loader size="xs" color="primary" />}>
                <SuspenseAvatar size="lg" alt="sample" src={avatarUrl} />
            </React.Suspense>
            <CommentContentSection>
                <CommentContentHeader>
                    <CommentMetaText as="span" size="sm">
                        <Link to={`/${login}`}>{login}</Link> commented{' '}
                        <TimeAgo date={createdAt} />
                    </CommentMetaText>
                </CommentContentHeader>
                <CommentContentBody>
                    <Markdown as="div" html={body} />
                </CommentContentBody>
            </CommentContentSection>
        </CommentContainer>
    )
}

// This is the first comment by the author of the issue.
function IssueMainComment() {
    const { owner, repo, issueNumber } = useParams() as {
        owner: string
        repo: string
        issueNumber: string
    }
    const { data: issue } = useQuery(
        [getRepoIssue.key, { owner, repo, issueNumber }],
        () =>
            getRepoIssue({
                owner,
                repo,
                issue_number: Number(issueNumber),
            })
    ) as { data: GetRepoIssueData }

    const { data: issueBody } = useQuery(
        [getRepoIssueBody.key, { owner, repo, issueNumber, body: issue.body }],
        () => getRepoIssueBody(issue.body),
        {
            // `issue` would be `null` at first (falsy),
            // so the query will not execute until the user exists
            // Use this property if the query is depending to other query.
            enabled: issue,
        }
    ) as { data: string }

    return (
        <IssueComment
            body={issueBody}
            createdAt={issue.created_at}
            login={issue.user.login}
            avatarUrl={issue.user.avatar_url}
        />
    )
}

const issueCommentsCn = S.css({
    gridArea: 'comments',
})

function IssueComments() {
    return (
        <div className={issueCommentsCn}>
            <IssueMainComment />
        </div>
    )
}

/**
 * ------------ IssueOtherDetails -----------
 * */

const issueOtherDetailsCn = S.css({
    gridArea: 'other-details',
})

function IssueOtherDetails() {
    return <aside className={issueOtherDetailsCn}>Other details</aside>
}

/**
 * ------------ Issue -----------
 * */

const Container = S.styled('section', {
    '& > *': {
        marginBottom: '$8',
    },

    md: {
        display: 'grid',
        gridTemplateColumns: '75% 25%',
        gridTemplateAreas: `
            "issue-header issue-header"
            "comments other-details"
            "loader-container loader-container"
    `,
        columnGap: '$8',
    },
})

export default function Issue() {
    return (
        <Container>
            <IssueHeader />
            <React.Suspense
                fallback={
                    <LoaderContainer>
                        <Loader size="lg" color="primary" />
                    </LoaderContainer>
                }
            >
                <IssueComments />
                <IssueOtherDetails />
            </React.Suspense>
        </Container>
    )
}
