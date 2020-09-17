import React from 'react'
import { Text, Link } from '../../components'
import S from '../../stitches.config'
import { AlertCircle, MessageSquare } from 'react-feather'
import TimeAgo from 'react-timeago'

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

const LabelLink = S.styled('a', {
    borderRadius: '$oval',
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

type Item = {
    id: number
    state: string
    title: string
    number: number
    user: {
        html_url: string
        login: string
    }
    labels: {
        id: number
        url: string
        color: string
        name: string
    }[]
    comments: number
    created_at: string
}

// As much as possible we want this Component handle the issues and pulls.
export default function IssueList({ items }: { items: Item[] }) {
    return (
        <ul>
            {items.map((item) => (
                <ListItem key={item.id}>
                    <AlertCircleContainer>
                        {item.state === 'open' ? (
                            <AlertCircle color="#2ea44f" size={16} />
                        ) : (
                            <AlertCircle color="#cb2431" size={16} />
                        )}
                    </AlertCircleContainer>
                    <div>
                        <Link size="lg" to={`${item.number}`}>
                            {item.title}
                        </Link>
                        <MetaContainer>
                            <Text as="span" size="xs">
                                #${item.number} opened{' '}
                                <TimeAgo date={item.created_at} /> by{' '}
                                <Link to={`/${item.user.login}`} size="sm">
                                    {item.user.login}
                                </Link>
                            </Text>
                        </MetaContainer>
                    </div>
                    <div>
                        {item.labels.map((label) => (
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
                        ))}
                    </div>
                    {item.comments > 0 && (
                        <CommentCountText size="xs" as="span">
                            <MessageSquare color="#586069" size={14} />
                            {item.comments}
                        </CommentCountText>
                    )}
                </ListItem>
            ))}
        </ul>
    )
}
