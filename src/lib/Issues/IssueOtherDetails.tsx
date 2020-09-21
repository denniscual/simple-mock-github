import React from 'react'
import S from '../../stitches.config'
import { DetailSection } from '../Repo'
import { getRepoIssue, GetRepoIssueData } from '../../api'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Link, Loader, SuspenseAvatar, Text } from '../../components'
import LabelLink from './LabelLink'

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

/**
 * ------------ IssueOtherDetails -----------
 * */

const List = S.styled('ul', {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',

    '& > *': {
        marginBottom: '$2',
        marginRight: '$2',
    },

    '& > *:last-child': {
        marginRight: 0,
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
                                    <Link
                                        color="primary"
                                        size="sm"
                                        to={`/${assignee.login}`}
                                    >
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

export default function IssueOtherDetails() {
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

    return (
        <aside className={issueOtherDetailsCn}>
            <IssueAssignees />
            <DetailSection
                title={
                    <SmallText as="span" size="xs" fontWeight="bold">
                        Labels
                    </SmallText>
                }
            >
                {data.labels.length > 0 ? (
                    <List>
                        {data.labels.map((label) => (
                            <li key={label.id}>
                                <LabelLink
                                    key={label.id}
                                    href={label.url}
                                    style={{
                                        backgroundColor: `#${label.color}`,
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {label.name}
                                </LabelLink>
                            </li>
                        ))}
                    </List>
                ) : (
                    <SmallText as="span" size="xs">
                        No labels
                    </SmallText>
                )}
            </DetailSection>
        </aside>
    )
}

