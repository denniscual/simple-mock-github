import React from 'react'
import { Outlet } from 'react-router-dom'
import S from '../../stitches.config'
import { Loader, Text } from '../../components'
import GitHubIcon from './GitHubIcon'
import { usePaginatedQuery } from 'react-query'
import { searchRepos, SearchReposData } from '../../api'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from 'use-onclickoutside'
import { Book, CornerDownLeft, ChevronRight, ChevronLeft } from 'react-feather'
import { createStore, useSt8, useDispatch } from 'restatum'

const searchReposStore = createStore({
    searchQuery: {
        initialState: '',
    },
    page: {
        initialState: 1,
    },
})

const Header = S.styled('header', {
    px: '$8',
    py: '$4',
    backgroundColor: '$black',
    display: 'flex',
    alignItems: 'center',

    '& > *': {
        marginRight: '$4',
    },

    '& > *:last-child': {
        marginRight: 0,
    },
})
Header.displayName = 'Header'

const LoaderContainer = S.styled('div', {
    margin: '$8',
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

const GitHubLink = S.styled('a', {
    fontWeight: '$bold',
    color: '$white',
    whiteSpace: 'nowrap',
    display: 'inline-block',
})

const listCn = S.css({})
const listItemCn = S.css({
    p: '$3',
    borderBottom: '$1 solid $gray2',
    fontSize: '$sm',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    columnGap: '$3',
    alignItems: 'center',

    '&:hover': {
        backgroundColor: '$primary',
        color: '$white',

        '.tablet-icon': {
            color: '$white',
        },

        '.jump-to': {
            visibility: 'visible',
        },
    },

    '&:last-child': {
        borderBottom: 'none',
    },
})

const JumpTo = S.styled('span', {
    backgroundColor: '$lightGray',
    color: '$lightBlack',
    p: '$1',
    fontSize: '$xs',
    borderRadius: '$1',
    visibility: 'hidden',
})

const PaginationContainer = S.styled('header', {
    borderBottom: '$1 solid $gray2',
    p: '$3',
    fontSize: '$xs',
    color: '$lightBlack',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const paginationIconCn = S.css({
    verticalAlign: 'top',
})
const PaginationControlButton = S.styled('button', {
    fontSize: '$xs',
    fontWeight: '$normal',
    padding: '$1 $2',
    outline: 0,
    fontFamily: '$sans',
    borderRadius: '$1',
    border: 'none',
    backgroundColor: 'transparent',

    variants: {
        status: {
            disabled: {
                color: '$lightBlack',
            },
            notDisabled: {
                color: '$primary',
                cursor: 'pointer',

                '&:hover': {
                    color: '$dimBlue',
                },
            },
        },
    },
})

function SearchResultList({
    searchQuery,
    onItemClick,
}: {
    searchQuery: string
    onItemClick: () => void
}) {
    const navigate = useNavigate()
    const perPage = 7
    const [page, setPage] = useSt8(searchReposStore.page)

    const { resolvedData, isFetching } = usePaginatedQuery(
        [searchRepos.key, searchQuery, page],
        () => {
            return searchRepos({
                q: searchQuery as string,
                per_page: perPage,
                page: page,
            })
        }
    ) as {
        resolvedData: SearchReposData
        isFetching: boolean
    }

    const totalCount = resolvedData.total_count
    const pagesCount = Math.ceil(totalCount / perPage)
    const hasNext = page < pagesCount
    const hasPrev = page > 1

    if (searchQuery !== '' && resolvedData.items.length === 0) {
        return (
            <ResultText as="span" size="sm">
                No found items
            </ResultText>
        )
    }

    return (
        <>
            <PaginationContainer>
                <span>Total count of {totalCount}</span>
                <div>
                    <PaginationControlButton
                        status={hasPrev ? 'notDisabled' : 'disabled'}
                        onClick={() => {
                            if (hasPrev) {
                                setPage((page) => --page)
                            }
                        }}
                    >
                        <ChevronLeft className={paginationIconCn} size={13} />{' '}
                        Prev
                    </PaginationControlButton>
                    <PaginationControlButton
                        status={hasNext ? 'notDisabled' : 'disabled'}
                        onClick={() => {
                            if (hasNext) {
                                setPage((page) => ++page)
                            }
                        }}
                    >
                        Next{' '}
                        <ChevronRight className={paginationIconCn} size={13} />
                    </PaginationControlButton>
                </div>
            </PaginationContainer>
            <ul className={listCn}>
                {resolvedData.items.map((item) => (
                    <li
                        key={item.id}
                        style={isFetching ? { color: '#b2b9c2' } : {}}
                        className={listItemCn}
                        onClick={(event: any) => {
                            event.preventDefault()
                            onItemClick()
                            navigate(`${item.full_name}/code`)
                        }}
                    >
                        <Book className="tablet-icon" size={14} />
                        {item.full_name}
                        <JumpTo className="jump-to">
                            Jump to <CornerDownLeft size={12} />
                        </JumpTo>
                    </li>
                ))}
            </ul>
        </>
    )
}

const SearchableContainer = S.styled('div', {
    display: 'block',
    position: 'relative',
})

const SearchInput = S.styled('input', {
    padding: '$1 $2',
    fontSize: '$sm',
    outline: 0,
    width: 350,

    variants: {
        status: {
            active: {
                backgroundColor: '$lightGray',
                border: '$1 solid $gray2',
                borderTopLeftRadius: '$1',
                borderTopRightRadius: '$1',
            },
            notActive: {
                borderRadius: '$1',
                backgroundColor: '$white',
                border: '$1 solid $gray2',
                borderBottom: 'none',
            },
        },
    },
})
SearchInput.displayName = 'SearchInput'
SearchInput.defaultProps = {
    status: 'notActive',
}

const ResultContainer = S.styled('div', {
    position: 'absolute',
    width: '100%',
    border: '$1 solid $gray2',
    borderTop: 'none',
    borderBottomLeftRadius: '$1',
    borderBottomRightRadius: '$1',
    boxSizing: 'border-box',
    backgroundColor: '$white',

    variants: {
        status: {
            active: {
                display: 'block',
                boxShadow: '0 4px 10px rgba(0,0,0,.1)',
            },
            notActive: {
                display: 'none',
            },
        },
    },
})
ResultContainer.displayName = 'ResultContainer'
ResultContainer.defaultProps = {
    status: 'notActive',
}

const ResultText = S.styled(Text, {
    textAlign: 'center',
    display: 'block',
    py: '$3',
})

function SearchableRepos() {
    const [isTheFocusOnSearch, setIsTheFocusOnSearch] = React.useState(false)
    const [searchQuery, setSearchQuery] = useSt8(searchReposStore.searchQuery)
    const setPage = useDispatch(searchReposStore.page)
    // @ts-ignore
    const defferedSearchQuery = React.unstable_useDeferredValue(searchQuery, {
        timeoutMs: 2000,
    }) as string

    // Close the window when clicking outside.
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    function onClose() {
        setIsTheFocusOnSearch(false)
    }
    function onOpen() {
        setIsTheFocusOnSearch(true)
    }
    useOnClickOutside(containerRef, onClose)

    const focusStatus = isTheFocusOnSearch ? 'active' : 'notActive'

    return (
        <SearchableContainer ref={containerRef}>
            <SearchInput
                autoComplete="off"
                onFocus={onOpen}
                onChange={(event) => {
                    setSearchQuery(event.currentTarget.value)
                    // reset the page
                    setPage(1)
                }}
                value={searchQuery}
                type="text"
                placeholder="Search or jump to..."
                status={focusStatus}
            />
            <ResultContainer status={focusStatus}>
                {searchQuery === '' ? (
                    <ResultText size="sm">Try to search "reactjs"</ResultText>
                ) : (
                    <React.Suspense
                        fallback={
                            <ResultText as="span" size="sm">
                                <Loader color="primary" size="xs" />
                            </ResultText>
                        }
                    >
                        <SearchResultList
                            searchQuery={defferedSearchQuery}
                            onItemClick={() => {
                                onClose()
                                setSearchQuery('')
                            }}
                        />
                    </React.Suspense>
                )}
            </ResultContainer>
        </SearchableContainer>
    )
}

export default function Home() {
    return (
        <div>
            <Header>
                <GitHubLink href="www.github.com">
                    <GitHubIcon />
                </GitHubLink>
                <searchReposStore.StoreProvider>
                    <SearchableRepos />
                </searchReposStore.StoreProvider>
            </Header>
            <main>
                <React.Suspense
                    fallback={
                        <LoaderContainer>
                            <Loader size="lg" color="primary" />
                        </LoaderContainer>
                    }
                >
                    <Outlet />
                </React.Suspense>
            </main>
        </div>
    )
}
