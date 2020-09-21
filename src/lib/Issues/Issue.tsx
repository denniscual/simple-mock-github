import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'
import IssueComments from './IssueComments'
import { DetailSection } from '../Repo'
import { getRepoIssue, GetRepoIssueData } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Link, Loader, SuspenseAvatar, Headings, Text } from '../../components'

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

/**
 * ------------ IssueOtherDetails -----------
 * */

const List = S.styled('ul', {
    display: 'grid',
    rowGap: '$2',
    columnGap: '$2',

    variants: {
        size: {
            sm: {
                gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))',
            },
            base: {
                gridTemplateColumns: 'repeat(auto-fit, minmax(32px, 1fr))',
            },
        },
    },
})
List.displayName = 'List'
List.defaultProps = {
    size: 'base',
}

const SmallText = S.styled(Text, {
    color: '$lightBlack',
})

const AssigneeText = S.styled(Text, {
    verticalAlign: 'top',
})

type UrlParams = {
    owner: string
    repo: string
    issueNumber: string
}

function IssueAssignees() {
    const { owner, repo, issueNumber } = useParams() as UrlParams
    const { data } = useQuery(
        [getRepoIssue.key, { owner, repo, issueNumber }],
        () =>
            getRepoIssue({
                owner,
                repo,
                issue_number: Number(issueNumber),
            })
    ) as { data: GetRepoIssueData }

    const { assignees } = data

    return (
        <DetailSection
            title={
                <SmallText as="span" size="xs" fontWeight="bold">
                    Assignees
                </SmallText>
            }
        >
            {assignees.length > 0 ? (
                <List>
                    <SuspenseList revealOrder="forwards">
                        {assignees.map((assignee) => (
                            <React.Suspense
                                fallback={<Loader size="xs" color="primary" />}
                                key={assignee.id}
                            >
                                <li>
                                    <Link size="sm" to={`/${assignee.login}`}>
                                        <SuspenseAvatar
                                            size="xs"
                                            alt={`img-by-${assignee.login}`}
                                            src={assignee.avatar_url}
                                        />{' '}
                                        <AssigneeText
                                            as="span"
                                            size="xs"
                                            fontWeight="bold"
                                        >
                                            {assignee.login}
                                        </AssigneeText>
                                    </Link>
                                </li>
                            </React.Suspense>
                        ))}
                    </SuspenseList>
                </List>
            ) : (
                <SmallText as="span" size="xs">
                    No one assigned
                </SmallText>
            )}
        </DetailSection>
    )
}

const issueOtherDetailsCn = S.css({
    gridArea: 'other-details',
})

function IssueOtherDetails() {
    return (
        <aside className={issueOtherDetailsCn}>
            <IssueAssignees />
            <DetailSection title="Labels">Labels</DetailSection>
        </aside>
    )
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
            <IssueComments />
            <IssueOtherDetails />
        </Container>
    )
}
