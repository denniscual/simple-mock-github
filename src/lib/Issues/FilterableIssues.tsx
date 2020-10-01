import React from 'react'
import { Button, Text, Headings } from '../../components'
import S from '../../stitches.config'
import IssueList from './IssueList'
import {
    getRepoIssues,
    GetRepoIssuesData,
    IssuesStatesKey,
    IssuesStates,
} from '../../api'
import { useQuery } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import { AlertCircle, Check } from 'react-feather'

// TODO: Wrap the Issues on its own React.Suspense so that on "Receded" it will not hide the header.

const ButtonState = S.styled(Button, {
    fontWeight: '$light',
    padding: 0,
})

function FilterIssuesState({
    currentState,
    ownState,
    ...otherProps
}: {
    currentState: IssuesStatesKey
    ownState: IssuesStatesKey
    children: React.ReactNode
    onClick: React.MouseEventHandler
}) {
    return currentState === ownState ? (
        <Text as="span" size="sm" {...otherProps} fontWeight="bold" />
    ) : (
        <ButtonState appearance="text" {...otherProps} />
    )
}

const FilterHeaderBox = S.styled('header', {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: '$4',
    backgroundColor: '$gray3',
    border: '$1 solid $gray2',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',

    '& > *': {
        marginRight: '$4',
    },

    '& > *:last-child': {
        marginRight: 0,
    },
})

const InfoBoard = S.styled('header', {
    border: '$1 solid $gray2',
    p: '$6',
    borderRadius: '$1',
    textAlign: 'center',
    marginBottom: '$5',
    lineHeight: '1.6',
})

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
    state: IssuesStatesKey
    page: number
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

export default function Issues() {
    const [searchParams, setSearchParams] = useSearchParams()
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

    function dispatch(action: IssuesQueryAction) {
        const nextQuery = issuesQueryReducer({ state, page }, action)
        setSearchParams({ ...nextQuery, page: String(nextQuery.page) })
    }

    return (
        <div>
            <InfoBoard>
                <Headings.H5>
                    Want to contribute to {params.owner}/{params.repo}?
                </Headings.H5>
                <Text size="sm">
                    If you have a bug or an idea, read the contributing
                    guidelines before opening an issue.
                </Text>
                <Text size="sm">
                    If you have a bug or an idea, read the contributing
                    guidelines before opening an issue.
                </Text>
            </InfoBoard>
            <section>
                <FilterHeaderBox>
                    <FilterIssuesState
                        currentState={state}
                        ownState={IssuesStates.open}
                        onClick={() => {
                            dispatch({ type: 'ISSUES_OPEN' })
                        }}
                    >
                        <AlertCircle size={14} color="#24292e" /> Open
                    </FilterIssuesState>
                    <FilterIssuesState
                        currentState={state}
                        ownState={IssuesStates.closed}
                        onClick={() => dispatch({ type: 'ISSUES_CLOSED' })}
                    >
                        <Check size={14} color="#24292e" /> Closed
                    </FilterIssuesState>
                </FilterHeaderBox>
                <IssueList items={issuesWithoutPulls} />
            </section>
        </div>
    )
}
