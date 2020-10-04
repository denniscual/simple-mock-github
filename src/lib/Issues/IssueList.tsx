import React from 'react'
import {
    Text,
    Link,
    ListItem as RootListItem,
    LabelLink,
} from '../../components'
import S from '../../stitches.config'
import { AlertCircle, MessageSquare } from 'react-feather'
import TimeAgo from 'react-timeago'
import { useParams, useSearchParams } from 'react-router-dom'
import { getRepoIssues, GetRepoIssuesData, IssuesStatesKey } from '../../api'
import { useQuery } from 'react-query'

const ListItem = S.styled(RootListItem, {
    padding: '$2 $4',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    justifyItems: 'baseline',
    columnGap: '$2',
})

const AlertCircleContainer = S.styled('span', {
    display: 'inline-block',
    marginTop: '$1',
})

const CommentCountText = S.styled(Text, {
    color: '$lightBlack',
    fontWeight: '$bold',
    display: 'flex',
    alignItems: 'center',

    '& > *:first-child': {
        marginRight: '$1',
    },
})

const MetaContainer = S.styled('div', {
    marginTop: '$1',
})

export default function IssueList() {
    const [searchParams] = useSearchParams()
    // search params
    const page = Number(searchParams.get('page'))
    const state = searchParams.get('state') as IssuesStatesKey
    // params
    const params = useParams() as {
        repo: string
        owner: string
    }

    const input = {
        ...params,
        page,
        state,
    }

    const { data: issues } = useQuery([getRepoIssues.key, input], () =>
        getRepoIssues(input)
    ) as {
        data: GetRepoIssuesData
    }

    // Only get issues without pull requests.
    const issuesWithoutPulls = issues.filter((issue) => !issue.pull_request)

    return (
        <ul>
            {issuesWithoutPulls.map((issue) => (
                <ListItem key={issue.id}>
                    <AlertCircleContainer>
                        {issue.state === 'open' ? (
                            <AlertCircle color="#2ea44f" size={16} />
                        ) : (
                            <AlertCircle color="#cb2431" size={16} />
                        )}
                    </AlertCircleContainer>
                    <div>
                        <Link size="lg" to={`${issue.number}`}>
                            {issue.title}
                        </Link>{' '}
                        {issue.labels.map((label) => (
                            <LabelLink
                                key={label.id}
                                href="#"
                                style={{
                                    backgroundColor: `#${label.color}`,
                                }}
                            >
                                {label.name}
                            </LabelLink>
                        ))}
                        <MetaContainer>
                            <Text as="span" size="xs">
                                #${issue.number} opened{' '}
                                <TimeAgo date={issue.created_at} /> by{' '}
                                <Link to={`/${issue.user.login}`} size="sm">
                                    {issue.user.login}
                                </Link>
                            </Text>
                        </MetaContainer>
                    </div>
                    {issue.comments > 0 && (
                        <CommentCountText size="xs" as="span">
                            <MessageSquare color="#586069" size={14} />
                            {issue.comments}
                        </CommentCountText>
                    )}
                </ListItem>
            ))}
        </ul>
    )
}
