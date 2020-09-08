import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Text, Link, ButtonGroup, IconButton, Button } from './components'
import Docs from './Docs'
import Download from './components/icons/Download'
import S from './stitches.config'

const Header = S.styled('header', {
    px: '$8',
    paddingTop: '$4',
    backgroundColor: '$lightGray',
    display: 'grid',
    rowGap: '$4',
})
Header.displayName = 'Header'

const HeaderAction = S.styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

HeaderAction.displayName = 'HeaderAction'

function Home() {
    return (
        <div>
            <Header>
                <HeaderAction>
                    <div>
                        <Text as="span">
                            <Download />
                        </Text>
                        <Link to="#">denniscual</Link>/
                        <Link to="#">restatum</Link>
                    </div>
                    <ButtonGroup>
                        <IconButton size="sm" startIcon={<Download />}>
                            Unstar
                        </IconButton>
                        <Button size="sm">1</Button>
                    </ButtonGroup>
                </HeaderAction>
                <nav>Nav</nav>
            </Header>
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="docs" element={<Docs />} />
            </Route>
        </Routes>
    )
}
