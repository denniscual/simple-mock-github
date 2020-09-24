import React from 'react'
import { Outlet } from 'react-router-dom'
import S from '../../stitches.config'
import { Loader, Text } from '../../components'
import GitHubIcon from './GitHubIcon'
import { usePaginatedQuery } from 'react-query'
import { searchRepos, SearchReposData } from '../../api'
import { useParams, useNavigate } from 'react-router-dom'
import useOnClickOutside from 'use-onclickoutside'

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
    py: '$3',

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

    '&:hover': {
        backgroundColor: '$primary',
        color: '$white',
    },

    '&:first-child': {
        paddingTop: 0,
    },

    '&:last-child': {
        borderBottom: 'none',
        paddingBottom: 0,
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
    const params = useParams() as {
        repo: string
    }

    const q = searchQuery !== '' ? searchQuery : params.repo

    const { resolvedData } = usePaginatedQuery([searchRepos.key, q], (_, q) => {
        return searchRepos({
            q: q as string,
            per_page: 7,
        })
    }) as {
        resolvedData: SearchReposData
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
                    {item.full_name}
                </li>
            ))}
        </ul>
    )
}

const ResultText = S.styled(Text, {
    textAlign: 'center',
    display: 'block',
})

function SearchFormRepo() {
    const [isTheFocusOnSearch, setIsTheFocusOnSearch] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    // Close the window when clicking outside.
    const formRef = React.useRef<HTMLFormElement | null>(null)
    function onClose() {
        setIsTheFocusOnSearch(false)
    }
    function onOpen() {
        setIsTheFocusOnSearch(true)
    }
    useOnClickOutside(formRef, onClose)

    const result = React.useMemo(() => {
        if (searchQuery === '') {
            return <ResultText size="sm">Try to search "reactjs"</ResultText>
        }
        return (
            <React.Suspense
                fallback={
                    <ResultText>
                        <Loader color="primary" size="xs" />
                    </ResultText>
                }
            >
                <SearchResultList
                    searchQuery={searchQuery}
                    onItemClick={() => {
                        onClose()
                        setSearchQuery('')
                    }}
                />
            </React.Suspense>
        )
    }, [searchQuery])

    return (
        <form ref={formRef}>
            <SearchLabel htmlFor="search">
                <SearchInput
                    // @ts-ignore
                    autocomplete="off"
                    onFocus={onOpen}
                    onChange={(event) =>
                        setSearchQuery(event.currentTarget.value)
                    }
                    type="text"
                    name="search"
                    placeholder="Search repo..."
                    status={isTheFocusOnSearch ? 'active' : 'notActive'}
                />
                <ResultContainer
                    status={isTheFocusOnSearch ? 'active' : 'notActive'}
                >
                    {result}
                </ResultContainer>
            </SearchLabel>
        </form>
    )
}

export default function Home() {
    return (
        <div>
            <Header>
                <GitHubLink href="www.github.com">
                    <GitHubIcon />
                </GitHubLink>
                <SearchFormRepo />
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
