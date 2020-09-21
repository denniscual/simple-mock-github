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

const SearchInput = S.styled('input', {
    borderRadius: '$1',
    backgroundColor: '$white',
    padding: '$1 $2',
    fontSize: '$sm',
    outline: 0,
    width: 350,
    border: '$1 solid $gray2',
})

const ResultList = S.styled('ul', {})

export default function Home() {
    return (
        <div>
            <Header>
                <GitHubLink href="www.github.com">
                    <GitHubIcon />
                </GitHubLink>
                <form>
                    <label htmlFor="search">
                        <SearchInput
                            type="text"
                            name="search"
                            placeholder="Search or jump to"
                        />
                        <ResultList></ResultList>
                    </label>
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
