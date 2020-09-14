import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderActions from './HeaderActions'
import S from '../../stitches.config'
import { NavLink as RootNavLink } from 'react-router-dom'

const Header = S.styled('header', {
    px: '$8',
    paddingTop: '$4',
    backgroundColor: '$lightGray',
    display: 'grid',
    rowGap: '$4',
    boxShadow: 'inset 0 -1px 0 $gray2',
    marginBottom: '$8',
})
Header.displayName = 'Header'

const Links = S.styled('ul', {
    display: 'flex',
})

const NavLink = S.styled(RootNavLink, {
    p: '$4',
    color: '$black',
    display: 'inline-block',
    fontSize: '$sm',

    '&.nav-link-active': {
        borderBottom: '2px solid #f9826c',
        fontWeight: '$bold',
    },

    '&:hover': {
        textDecoration: 'none',
        color: '$black',
    },
})

const Content = S.styled('div', {
    px: '$8',
    margin: '0 auto',
    maxWidth: 1216,
})

export default function Repo() {
    return (
        <div>
            <Header>
                <HeaderActions />
                <nav>
                    <Links>
                        <li>
                            <NavLink
                                end
                                activeClassName="nav-link-active"
                                to=""
                            >
                                Code
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="nav-link-active"
                                to="issues"
                            >
                                Issues
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName="nav-link-active"
                                to="pull-requests"
                            >
                                Pull requests
                            </NavLink>
                        </li>
                    </Links>
                </nav>
            </Header>
            <React.Suspense fallback="Loading repo details">
                <Content>
                    <Outlet />
                </Content>
            </React.Suspense>
        </div>
    )
}
