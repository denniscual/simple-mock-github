import React from 'react'
import { GetRepoIssuesData } from '../../api'
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

const LabelLink = S.styled('a', {
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

export default function IssueList({ items }: { items: GetRepoIssuesData }) {
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
                        <Link size="lg" to={`${item.id}`}>
                            {item.title}
                        </Link>
                        <MetaContainer>
                            <Text as="span" size="xs">
                                {`#${item.number} opened by `}
                                <NativeLink
                                    href={item.user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="sm"
                                >
                                    {item.user.login}
                                </NativeLink>
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
