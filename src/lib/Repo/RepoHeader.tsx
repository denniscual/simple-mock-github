import React from 'react'
import { Link as RouterLink, Headings } from '../../components'
import S from '../../stitches.config'
import { useQuery } from 'react-query'
import { getRepo, GetRepoData } from '../../api'
import { useParams } from 'react-router-dom'
import { Book } from 'react-feather'

const LightH3 = S.styled(Headings.H3, {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '$normal',
})

const RepoIcon = S.styled(Book, {
    color: '$black',
    marginRight: '$2',
})

const Separator = S.styled('span', {
    color: '$black',
    fontSize: '$xl',
    mx: '$1',
})

const Link = S.styled(RouterLink, {
    color: '$primary',
    fontSize: '$xl',
    fontWeight: '$normal',
})
Link.displayName = 'Link'

const RepoLink = S.styled(Link, {
    fontWeight: '$bold',
})

const Container = S.styled('div', {
    height: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

RepoHeader.displayName = 'RepoHeader'

function RepoProfile() {
    const params = useParams() as { owner: string; repo: string }
    const { data } = useQuery([getRepo.key, params], (key) =>
        getRepo(key as string, params)
    ) as { data: GetRepoData }

    return (
        <>
            <RepoIcon size={18} />
            <Link to="..">{data.owner.login}</Link>
            <Separator>/</Separator>
            <RepoLink to="code">{data.name}</RepoLink>
        </>
    )
}

export default function RepoHeader() {
    return (
        <Container>
            <LightH3>
                <RepoProfile />
            </LightH3>
        </Container>
    )
}
