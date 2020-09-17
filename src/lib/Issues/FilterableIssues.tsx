import React from 'react'
import { Button, Text } from '../../components'
import S from '../../stitches.config'
import IssueList from './IssueList'
import { getRepoIssues, GetRepoIssuesData } from '../../api'
import { usePaginatedQuery } from 'react-query'
import { useParams } from 'react-router-dom'

type IssuesQueryOpenAction = {
    type: 'ISSUES_OPEN'
}

type IssuesQueryClosedAction = {
    type: 'ISSUES_CLOSED'
}

type IssuesQueryNextPageAction = {
    type: 'ISSUES_NEXT_PAGE'
}

type IssuesQueryAction =
    | IssuesQueryOpenAction
    | IssuesQueryClosedAction
    | IssuesQueryNextPageAction

type IssuesQueryState = {
    state: 'open' | 'closed'
    page: number
}

const initIssuesQuery: IssuesQueryState = {
    state: 'open',
    page: 1,
}

function issuesQueryReducer(
    state: IssuesQueryState,
    action: IssuesQueryAction
): IssuesQueryState {
    switch (action.type) {
        case 'ISSUES_OPEN': {
            return {
                state: 'open',
                page: 1,
            }
        }
        case 'ISSUES_CLOSED': {
            return {
                state: 'closed',
                page: 1,
            }
        }
        case 'ISSUES_NEXT_PAGE': {
            return {
                ...state,
                page: ++state.page,
            }
        }
        default: {
            return state
        }
    }
}

const ButtonState = S.styled(Button, {
    fontWeight: '$bold',
})

function FilterIssuesState({
    currentState,
    ownState,
    ...otherProps
}: {
    currentState: string
    ownState: string
    children: React.ReactNode
    onClick: React.MouseEventHandler
}) {
    return currentState === ownState ? (
        <Text size="sm" {...otherProps} />
    ) : (
        <ButtonState appearance="text" {...otherProps} />
    )
}

export default function Issues() {
    const [issuesQuery, dispatch] = React.useReducer(
        issuesQueryReducer,
        initIssuesQuery
    )

    const params = useParams() as {
        repo: string
        owner: string
    }

    const { resolvedData: issues, isFetching } = usePaginatedQuery(
        [
            getRepoIssues.key,
            {
                ...params,
                ...issuesQuery,
            },
        ],
        getRepoIssues
    ) as {
        resolvedData: GetRepoIssuesData
        isFetching: boolean
    }

    const [value, setValue] = React.useState('')

    return (
        <div>
            <header>
                <input
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
                <div>
                    <nav>
                        <FilterIssuesState
                            currentState={issuesQuery.state}
                            ownState="open"
                            onClick={() => dispatch({ type: 'ISSUES_OPEN' })}
                        >
                            Open
                        </FilterIssuesState>
                        <FilterIssuesState
                            currentState={issuesQuery.state}
                            ownState="closed"
                            onClick={() => dispatch({ type: 'ISSUES_CLOSED' })}
                        >
                            Closed
                        </FilterIssuesState>
                        <ButtonState
                            appearance="text"
                            onClick={() =>
                                dispatch({ type: 'ISSUES_NEXT_PAGE' })
                            }
                        >
                            Next page
                        </ButtonState>
                    </nav>
                    <IssueList items={issues} />
                </div>
            </header>
        </div>
    )
}
