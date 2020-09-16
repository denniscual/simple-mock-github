import React from 'react'
import S from '../../stitches.config'
import {
    Headings,
    Text,
    NativeLink,
    Loader,
    SuspenseImage,
} from '../../components'
import {
    getRepo,
    GetRepoData,
    getRepoContributors,
    GetRepoContributorsData,
    getRepoREADME,
} from '../../api'
import { useQuery } from 'react-query'
import { StringToGFM } from '../../components'
import { useParams } from 'react-router-dom'

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
    return <StringToGFM as="section" html={data} />
}

/**
 * ------------ About -----------
 * */
function getDomain(url: string) {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0]
}

const Section = S.styled('section', {
    py: '$4',
    display: 'grid',
    rowGap: '$4',
    borderBottom: '$1 solid $gray2',
})

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
const avatarClassName = S.css({
    display: 'inline-block',
    borderRadius: '50%',
    width: 32,
    height: 32,
})

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
                <SuspenseImage
                    className={avatarClassName}
                    alt={`img-by-${login}`}
                    src={avatar_url}
                />
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
        <div>
            <Section>
                <Headings.H5>About</Headings.H5>
                <RepoAbout />
            </Section>
            <Section>
                <Headings.H5>Contributors</Headings.H5>
                <RepoContributors />
            </Section>
        </div>
    )
}

const Container = S.styled('div', {
    display: 'grid',
    gridTemplateColumns: '75% 25%',
    columnGap: '$6',
})

// TODO: Check mamaya about the loading orchestrate.
// TODO: Check the react-query for handle error in CM.
export default function RepoCode() {
    return (
        <Container>
            <RepoREADME />
            <RepoOtherDetails />
        </Container>
    )
}
