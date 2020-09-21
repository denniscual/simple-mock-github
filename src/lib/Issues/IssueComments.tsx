import React from 'react'
import S from '../../stitches.config'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Loader, Markdown, SuspenseAvatar, Text, Link } from '../../components'
import TimeAgo from 'react-timeago'
import {
    getRepoIssue,
    GetRepoIssueData,
    getGFMSpecs,
    getRepoIssueComments,
    GetRepoIssueCommentsData,
} from '../../api'

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

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

const commentContentBodyCn = S.css({
    p: '$4',
})

function CommentContentBody({ id, body }: { id: number; body: string }) {
    const { owner, repo, issueNumber } = useParams() as {
        owner: string
        repo: string
        issueNumber: string
    }

    const { data: markdownHtml } = useQuery(
        [getGFMSpecs.key, { owner, repo, issueNumber, id }],
        () => getGFMSpecs(body)
    ) as { data: string }

    return (
        <div className={commentContentBodyCn}>
            <Markdown as="div" html={markdownHtml} />
        </div>
    )
}

const CommentContainer = S.styled('article', {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '$4',
})

function IssueComment({
    id,
    login,
    createdAt,
    body,
    avatarUrl,
}: {
    id: number
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
                <CommentContentBody id={id} body={body} />
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
    const { data } = useQuery(
        [getRepoIssue.key, { owner, repo, issueNumber }],
        () =>
            getRepoIssue({
                owner,
                repo,
                issue_number: Number(issueNumber),
            })
    ) as { data: GetRepoIssueData }

    return (
        <IssueComment
            id={data.id}
            body={data.body}
            createdAt={data.created_at}
            login={data.user.login}
            avatarUrl={data.user.avatar_url}
        />
    )
}

const issueCommentsCn = S.css({
    display: 'grid',
    rowGap: '$8',
    ridArea: 'comments',
})

export default function IssueComments() {
    const { owner, repo, issueNumber } = useParams() as {
        owner: string
        repo: string
        issueNumber: string
    }

    const { data: comments } = useQuery(
        [getRepoIssueComments.key, { owner, repo, issueNumber }],
        () =>
            getRepoIssueComments({
                owner,
                repo,
                issue_number: Number(issueNumber),
            })
    ) as { data: GetRepoIssueCommentsData }

    const commentsEl = comments.map((comment) => (
        <React.Suspense
            key={comment.id}
            fallback={
                <LoaderContainer>
                    <Loader size="lg" color="primary" />
                </LoaderContainer>
            }
        >
            <IssueComment
                login={comment.user.login}
                avatarUrl={comment.user.avatar_url}
                id={comment.id}
                body={comment.body}
                createdAt={comment.created_at}
            />
        </React.Suspense>
    ))

    return (
        <section className={issueCommentsCn}>
            <IssueMainComment />
            <SuspenseList revealOrder="forwards" tail="collapsed">
                {commentsEl}
            </SuspenseList>
        </section>
    )
}

