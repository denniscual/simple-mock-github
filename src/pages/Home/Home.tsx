import React from 'react'
import { Outlet } from 'react-router-dom'
import S from '../../stitches.config'

const Header = S.styled('header', {
    px: '$8',
    py: '$4',
    backgroundColor: '$black',
})
Header.displayName = 'Header'

export default function Home() {
    return (
        <div>
            <Header>header header</Header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
