import React from 'react'
import S from '../../stitches.config'
import {
    Headings,
    Text,
    NativeLink,
    Loader,
    SuspenseAvatar,
} from '../../components'
import {
    getRepo,
    GetRepoData,
    getRepoContributors,
    GetRepoContributorsData,
    getRepoREADME,
} from '../../api'
import { useQuery } from 'react-query'
import { Markdown } from '../../components'
import { useParams } from 'react-router-dom'
import DetailSection from './DetailSection'

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ Readme -----------
 * */

function RepoREADME() {
    const params = useParams() as { owner: string; repo: string }
    const { data } = useQuery(getRepoREADME.key, (key) =>
        getRepoREADME(key as string, params)
    ) as {
        data: string
    }
    return <Markdown as="section" html={data} />
}

/**
 * ------------ About -----------
 * */
function getDomain(url: string) {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0]
}

function RepoAbout() {
    const params = useParams() as { owner: string; repo: string }
    const { data } = useQuery(getRepo.key, (key) =>
        getRepo(key as string, params)
    ) as {
        data: GetRepoData
    }
    return (
        <>
            <Text>{data.description}</Text>
            <NativeLink href={data.homepage} color="primary" target="_blank">
                {getDomain(data.homepage)}
            </NativeLink>
        </>
    )
}

/**
 * ------------ Contributor -----------
 * */

const List = S.styled('ul', {
    display: 'grid',
    rowGap: '$2',
    columnGap: '$2',

    variants: {
        size: {
            sm: {
                gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))',
            },
            base: {
                gridTemplateColumns: 'repeat(auto-fit, minmax(32px, 1fr))',
            },
        },
    },
})
List.displayName = 'List'

function Contributor({
    url,
    avatar_url,
    login,
}: {
    url: string
    avatar_url: string
    login: string
}) {
    return (
        <li>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <SuspenseAvatar alt={`img-by-${login}`} src={avatar_url} />
            </a>
        </li>
    )
}

function RepoContributors() {
    const params = useParams() as { owner: string; repo: string }
    const { data } = useQuery(getRepoContributors.key, (key) =>
        getRepoContributors(key as string, params)
    ) as {
        data: GetRepoContributorsData
    }
    return (
        <List size={data.length >= 7 ? 'base' : 'sm'}>
            <SuspenseList revealOrder="forwards">
                {data.map((contributor) => (
                    <React.Suspense
                        fallback={<Loader size="xs" color="primary" />}
                        key={contributor.id}
                    >
                        <Contributor
                            url={contributor.url}
                            login={contributor.login}
                            avatar_url={contributor.avatar_url}
                        />
                    </React.Suspense>
                ))}
            </SuspenseList>
        </List>
    )
}

/**
 * ------------ Other details -----------
 * */
function RepoOtherDetails() {
    return (
        <aside>
            <DetailSection title="About">
                <RepoAbout />
            </DetailSection>
            <DetailSection title="Contributors">
                <RepoContributors />
            </DetailSection>
        </aside>
    )
}

const Container = S.styled('section', {
    display: 'grid',
    gridTemplateColumns: '75% 25%',
    columnGap: '$6',
})

export default function RepoCode() {
    return (
        <Container>
            <RepoREADME />
            <RepoOtherDetails />
        </Container>
    )
}
