import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderActions from './HeaderActions'
import S from '../../stitches.config'

const Header = S.styled('header', {
    px: '$8',
    paddingTop: '$4',
    backgroundColor: '$lightGray',
    display: 'grid',
    rowGap: '$4',
})
Header.displayName = 'Header'

export default function Home() {
    return (
        <div>
            <Header>
                <HeaderActions />
                <nav>Nav</nav>
            </Header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}
