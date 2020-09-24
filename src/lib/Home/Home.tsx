import React from 'react'
import { Outlet } from 'react-router-dom'
import S from '../../stitches.config'
import { Loader } from '../../components'
import GitHubIcon from './GitHubIcon'

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

const ResultList = S.styled('ul', {
    position: 'absolute',
    width: '100%',
    height: 100,
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

ResultList.displayName = 'ResultList'
ResultList.defaultProps = {
    staus: 'notActive',
}

export default function Home() {
    const [isTheFocusOnSearch, setIsTheFocusOnSearch] = React.useState(false)

    return (
        <div>
            <Header>
                <GitHubLink href="www.github.com">
                    <GitHubIcon />
                </GitHubLink>
                <form>
                    <SearchLabel htmlFor="search">
                        <SearchInput
                            onFocus={() => setIsTheFocusOnSearch(true)}
                            onBlur={() => setIsTheFocusOnSearch(false)}
                            type="text"
                            name="search"
                            placeholder="Search repo"
                            status={isTheFocusOnSearch ? 'active' : 'notActive'}
                        />
                        <ResultList
                            status={isTheFocusOnSearch ? 'active' : 'notActive'}
                        ></ResultList>
                    </SearchLabel>
                </form>
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
