import React from 'react'
import { Button, Text, Headings } from '../../components'
import S from '../../stitches.config'
import IssueList from './IssueList'
import { getRepoIssues, GetRepoIssuesData } from '../../api'
import { usePaginatedQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { AlertCircle, Check } from 'react-feather'

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
    fontWeight: '$light',
    padding: 0,
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
        <Text as="span" size="sm" {...otherProps} fontWeight="bold" />
    ) : (
        <ButtonState appearance="text" {...otherProps} />
    )
}

// This will delay the showing of loader indicator.
const delayedLoader = S.css.keyframes({
    to: {
        visibility: 'visible',
    },
})

const LoadingText = S.styled(Text, {
    animation: `${delayedLoader} 0s linear 0.5s forwards`,
    visibility: 'hidden',
})

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

    // Only get issues without pull requests.
    const issuesWithoutPulls = issues.filter((issue) => !issue.pull_request)

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
                        currentState={issuesQuery.state}
                        ownState="open"
                        onClick={() => dispatch({ type: 'ISSUES_OPEN' })}
                    >
                        <AlertCircle size={14} color="#24292e" /> Open
                    </FilterIssuesState>
                    <FilterIssuesState
                        currentState={issuesQuery.state}
                        ownState="closed"
                        onClick={() => dispatch({ type: 'ISSUES_CLOSED' })}
                    >
                        <Check size={14} color="#24292e" /> Closed
                    </FilterIssuesState>
                    {isFetching && (
                        <LoadingText as="span" size="sm">
                            Loading issues...
                        </LoadingText>
                    )}
                </FilterHeaderBox>
                <IssueList items={issuesWithoutPulls} />
            </section>
        </div>
    )
}
