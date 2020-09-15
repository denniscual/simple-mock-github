import React from 'react'
import { useParams } from 'react-router-dom'
import { getRepoIssues, GetRepoIssuesData } from '../../api'
import { usePaginatedQuery } from 'react-query'
import { Button, Text } from '../../components'
import S from '../../stitches.config'

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

    return (
        <ul>
            {resolvedData.map((data) => (
                <li key={data.id}>{data.title}</li>
            ))}
        </ul>
    )
})

export default IssueList
