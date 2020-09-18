import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'
import { getRepoIssue, GetRepoIssueData, getRepoIssueBody } from '../../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Loader, Markdown } from '../../components'

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'loader-container',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ IssueComments -----------
 * */

const issueCommentsCn = S.css({
    gridArea: 'comments',
})

function IssueComments() {
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
        <section className={issueCommentsCn}>
            <Markdown as="article" html={issueBody} />
        </section>
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
