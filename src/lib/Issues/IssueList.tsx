import React from 'react'
import { useParams } from 'react-router-dom'
import { getRepoIssues, GetRepoIssuesData } from '../../api'
import { usePaginatedQuery } from 'react-query'
import { Text, Link, NativeLink } from '../../components'
import S from '../../stitches.config'
import { AlertCircle, MessageSquare } from 'react-feather'

const ListItem = S.styled('li', {
    borderTop: '$1 solid $gray2',
    borderRight: '$1 solid $gray2',
    borderLeft: '$1 solid $gray2',
    padding: '$2 $4',
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr auto',
    justifyItems: 'baseline',
    columnGap: '$2',

    '&:last-child': {
        borderBottom: '$1 solid $gray2',
    },

    '&:hover': {
        backgroundColor: '$gray3',
    },
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

const IssueLabelLink = S.styled('a', {
    borderRadius: '2em',
    border: '$1 solid transparent',
    padding: '0 $2',
    fontSize: '$xs',
    fontWeight: '$medium',
    lineHeight: '18px',
    color: '$black',
    marginRight: '$1',

    '&:last-child': {
        marginRight: 0,
    },
})

const IssueList = React.memo(function IssueList({
    state,
    page,
}: {
    state: string
    page: number
}) {
    const params = useParams() as {
        repo: string
        owner: string
    }
    const { resolvedData } = usePaginatedQuery(
        [
            getRepoIssues.key,
            {
                ...params,
                state,
                page,
            },
        ],
        getRepoIssues
    ) as {
        resolvedData: GetRepoIssuesData
    }

    console.log({ resolvedData })

    return (
        <ul>
            {resolvedData.map((data) => (
                <ListItem key={data.id}>
                    <AlertCircleContainer>
                        {data.state === 'open' ? (
                            <AlertCircle color="#2ea44f" size={16} />
                        ) : (
                            <AlertCircle color="#cb2431" size={16} />
                        )}
                    </AlertCircleContainer>
                    <div>
                        <Link size="lg" to={`${data.id}`}>
                            {data.title}
                        </Link>
                        <MetaContainer>
                            <Text as="span" size="xs">
                                {`#${data.number} opened by `}
                                <NativeLink
                                    href={data.user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="sm"
                                >
                                    {data.user.login}
                                </NativeLink>
                            </Text>
                        </MetaContainer>
                    </div>
                    <div>
                        {data.labels.map((label) => (
                            <IssueLabelLink
                                key={label.id}
                                href={label.url}
                                style={{
                                    backgroundColor: `#${label.color}`,
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {label.name}
                            </IssueLabelLink>
                        ))}
                    </div>
                    {data.comments > 0 && (
                        <CommentCountText size="xs" as="span">
                            <MessageSquare color="#586069" size={14} />
                            {data.comments}
                        </CommentCountText>
                    )}
                </ListItem>
            ))}
        </ul>
    )
})

export default IssueList
