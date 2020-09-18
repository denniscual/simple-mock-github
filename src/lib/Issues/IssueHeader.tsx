import React from 'react'
import { Headings, Text, Link, Chip } from '../../components'
import { AlertCircle } from 'react-feather'
import { getRepoIssue, GetRepoIssueData } from '../../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import S from '../../stitches.config'

const issueTitleCn = S.css({
    marginBottom: '$3',
})

const IssueTitle = S.styled('span', {
    fontSize: '$4xl',
    color: '$black',
    fontWeight: '$normal',
    maxWidth: 1050,
    lineHeight: '1.25',
})

const IssueNumber = S.styled('span', {
    fontSize: '$4xl',
    color: '$gray4',
    fontWeight: '$normal',
})

const OpenChip = S.styled(Chip, {
    marginRight: '$2',

    '& > *': {
        marginRight: '$1',
    },
})

const Meta = S.styled('div', {
    display: 'flex',
    alignItems: 'center',
})

const MetaText = S.styled(Text, {
    color: '$lightBlack',
})

const Container = S.styled('header', {
    gridArea: 'issue-header',
    paddingBottom: '$4',
    borderBottom: '$1 solid $gray2',
})

export default function IssueHeader() {
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
        <Container>
            <Headings.H1 className={issueTitleCn}>
                <IssueTitle>{data.title} </IssueTitle>
                <IssueNumber>#{data.number}</IssueNumber>
            </Headings.H1>
            <Meta>
                <OpenChip color="accent">
                    <AlertCircle color="#ffffff" size={16} />
                    Open
                </OpenChip>
                <MetaText as="span" size="sm">
                    <Link to={`/${data.user.login}`}>{data.user.login} </Link>
                    opened this issue <TimeAgo date={data.created_at} /> ·{' '}
                    {data.comments} comments
                </MetaText>
            </Meta>
        </Container>
    )
}
