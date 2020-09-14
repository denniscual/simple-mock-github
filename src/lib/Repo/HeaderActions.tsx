import React from 'react'
import {
    Loader,
    ButtonGroup,
    IconButton,
    Button,
    Headings,
} from '../../components'
import { Link as RootLink } from 'react-router-dom'
import Download from '../../components/icons/Download'
import S from '../../stitches.config'
import { useQuery } from 'react-query'
import { getRepo, GetRepoData } from '../../api'

const LightH3 = S.styled(Headings.H3, {
    display: 'flex',
    alignItems: 'center',
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
    height: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

HeaderAction.displayName = 'HeaderAction'

function RepoProfile() {
    const { data } = useQuery(getRepo.key, getRepo) as { data: GetRepoData }

    console.log({ data })
    return (
        <>
            <Link to="#">denniscual</Link> <Separator>/</Separator>{' '}
            <RepoLink to="#">restatum</RepoLink>
        </>
    )
}

export default function RepoHeader() {
    return (
        <HeaderAction>
            <LightH3>
                <RepoIcon>
                    <Download />
                </RepoIcon>
                <RepoProfile />
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
