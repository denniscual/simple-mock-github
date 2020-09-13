import React from 'react'
import { ButtonGroup, IconButton, Button, Headings } from '../../components'
import { Link as RootLink } from 'react-router-dom'
import Download from '../../components/icons/Download'
import S from '../../stitches.config'
import { useQuery } from 'react-query'

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

const HeaderAction = S.styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

HeaderAction.displayName = 'HeaderAction'

function getRepo(...args: any): Promise<string[]> {
    return new Promise((res) => {
        setTimeout(() => {
            res([])
        }, 1000)
    })
}

export default function RepoHeader() {
    useQuery('Repo', getRepo)
    return (
        <HeaderAction>
            <LightH3>
                <RootLink to="issues">Issues</RootLink>
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
    )
}
