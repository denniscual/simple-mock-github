import React from 'react'
import { Outlet } from 'react-router-dom'
import S from '../../stitches.config'
import { Loader, Text } from '../../components'
import GitHubIcon from './GitHubIcon'
import { usePaginatedQuery } from 'react-query'
import { searchRepos, SearchReposData } from '../../api'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from 'use-onclickoutside'
import { Tablet } from 'react-feather'

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

const SearchLabel = S.styled('label', {
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

const listCn = S.css({})
const listItemCn = S.css({
    p: '$3',
    borderBottom: '$1 solid $gray2',
    fontSize: '$sm',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '$2',

    '&:hover': {
        backgroundColor: '$primary',
        color: '$white',

        '.tablet-icon': {
            color: '$white',
        },
    },

    '&:last-child': {
        borderBottom: 'none',
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

    const { resolvedData } = usePaginatedQuery(
        [searchRepos.key, searchQuery],
        (_, _searchQuery) => {
            return searchRepos({
                q: _searchQuery as string,
                per_page: 7,
            })
        }
    ) as {
        resolvedData: SearchReposData
    }

    if (searchQuery !== '' && resolvedData.items.length === 0) {
        return (
            <ResultText as="span" size="sm">
                No found items
            </ResultText>
        )
    }

    return (
        <ul className={listCn}>
            {resolvedData.items.map((item) => (
                <li
                    key={item.id}
                    className={listItemCn}
                    onClick={(event: any) => {
                        event.preventDefault()
                        onItemClick()
                        navigate(item.full_name, { replace: true })
                    }}
                >
                    <Tablet className="tablet-icon" size={14} />
                    {item.full_name}
                </li>
            ))}
        </ul>
    )
}

const ResultText = S.styled(Text, {
    textAlign: 'center',
    display: 'block',
    py: '$3',
})

function SearchableRepos() {
    const [isTheFocusOnSearch, setIsTheFocusOnSearch] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    // @ts-ignore
    const defferedSearchQuery = React.unstable_useDeferredValue(searchQuery, {
        timeoutMs: 2000,
    }) as string

    // Close the window when clicking outside.
    const labelRef = React.useRef<HTMLLabelElement | null>(null)
    function onClose() {
        setIsTheFocusOnSearch(false)
    }
    function onOpen() {
        setIsTheFocusOnSearch(true)
    }
    useOnClickOutside(labelRef, onClose)

    const activeStatus = isTheFocusOnSearch ? 'active' : 'notActive'

    // TODO: Remove the label, change it into a div.

    return (
        <SearchLabel htmlFor="search" ref={labelRef}>
            <SearchInput
                // @ts-ignore
                autocomplete="off"
                onFocus={onOpen}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                type="text"
                name="search"
                placeholder="Search repo..."
                status={activeStatus}
            />
            <ResultContainer status={activeStatus}>
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
        </SearchLabel>
    )
}

export default function Home() {
    return (
        <div>
            <Header>
                <GitHubLink href="www.github.com">
                    <GitHubIcon />
                </GitHubLink>
                <SearchableRepos />
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
