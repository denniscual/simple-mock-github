import React from 'react'
import { Outlet } from 'react-router-dom'
import { ButtonGroup, IconButton, Button, Headings } from '../../components'
import { Link as RootLink } from 'react-router-dom'
import Download from '../../components/icons/Download'
import S from '../../stitches.config'

const LightH3 = S.styled(Headings.H3, {
    fontWeight: '$normal',
})

const RepoIcon = S.styled('span', {
    color: '$black',
    fontSize: '$lg',
    marginRight: '$3',
})

const Separator = S.styled('span', {
    color: '$black',
    fontSize: '$xl',
})

const Link = S.styled(RootLink, {
    color: '$primary',

    '&:hover': {
        textDecoration: 'underline',
    },
})
Link.displayName = 'Link'

const RepoLink = S.styled(Link, {
    fontWeight: '$bold',
})

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

export default function HomeHeader() {
    return (
        <Header>
            <HeaderAction>
                <LightH3>
                    <RepoIcon>
                        <Download />
                    </RepoIcon>
                    <Link to="#">denniscual</Link> <Separator>/</Separator>{' '}
                    <RepoLink to="#">restatum</RepoLink>
                </LightH3>
                <ButtonGroup>
                    <IconButton size="sm" startIcon={<Download />}>
                        Unstar
                    </IconButton>
                    <Button size="sm">1</Button>
                </ButtonGroup>
            </HeaderAction>
            <nav>Nav</nav>
        </Header>
    )
}
