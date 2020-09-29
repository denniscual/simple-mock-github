import React from 'react'
import { Outlet } from 'react-router-dom'
import RepoHeader from './RepoHeader'
import { Loader } from '../../components'
import S from '../../stitches.config'
import { NavLink } from 'react-router-dom'

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

const Header = S.styled('header', {
    px: '$8',
    paddingTop: '$4',
    backgroundColor: '$lightGray',
    display: 'grid',
    rowGap: '$4',
    boxShadow: 'inset 0 -1px 0 $gray2',
})
Header.displayName = 'Header'

const Links = S.styled('ul', {
    display: 'flex',
})

const navLinkCn = S.css({
    p: '$4',
    color: '$black',
    display: 'inline-block',
    fontSize: '$sm',

    '&.nav-link-active': {
        borderBottom: '2px solid #f9826c',
        fontWeight: '$bold',

        '&:hover': {
            borderBottom: '2px solid #f9826c',
        },
    },

    '&:hover': {
        textDecoration: 'none',
        color: '$black',
        borderBottom: '2px solid $dimGray',
    },
})

const Content = S.styled('div', {
    p: '$8',
    margin: '0 auto',
    maxWidth: 1216,
})

export default function Repo() {
    return (
        <div>
            <Header>
                <RepoHeader />
                <nav>
                    <Links>
                        <li>
                            <NavLink
                                className={navLinkCn}
                                activeClassName="nav-link-active"
                                to="code"
                            >
                                Code
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={navLinkCn}
                                activeClassName="nav-link-active"
                                to="issues"
                            >
                                Issues
                            </NavLink>
                        </li>
                    </Links>
                </nav>
            </Header>
            <Content>
                <React.Suspense
                    fallback={
                        <LoaderContainer>
                            <Loader size="lg" color="primary" />
                        </LoaderContainer>
                    }
                >
                    <Outlet />
                </React.Suspense>
            </Content>
        </div>
    )
}
