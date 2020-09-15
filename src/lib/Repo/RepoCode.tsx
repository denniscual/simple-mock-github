import React from 'react'
import S from '../../stitches.config'
import { Headings, Text, NativeLink, Loader } from '../../components'
import {
    getRepo,
    GetRepoData,
    getRepoContributors,
    GetRepoContributorsData,
    getRepoREADME,
} from '../../api'
import { useQuery } from 'react-query'
import { StringToGFM } from '../../components'

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ Readme -----------
 * */

function RepoREADME() {
    const { data } = useQuery(getRepoREADME.key, getRepoREADME) as {
        data: string
    }
    return <StringToGFM as="section" html={data} />
}

/**
 * ------------ Other details -----------
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
    const { data } = useQuery(getRepo.key, getRepo) as {
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

const Img = S.styled('img', {
    display: 'inline-block',
    borderRadius: '50%',
    width: 32,
    height: 32,
})
Img.displayName = 'Img'

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
List.defaultProps = {
    size: 'sm',
}
List.displayName = 'List'

function RepoContributors() {
    const { data } = useQuery(getRepoContributors.key, getRepoContributors) as {
        data: GetRepoContributorsData
    }
    return (
        <List size={data.length >= 7 ? 'base' : 'sm'}>
            {data.map((contributor) => (
                <li key={contributor.id}>
                    <a
                        href={contributor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Img
                            src={contributor.avatar_url}
                            alt={`img-by-${contributor.login}`}
                        />
                    </a>
                </li>
            ))}
        </List>
    )
}

function RepoOtherDetails() {
    return (
        <div>
            <Section>
                <Headings.H5>About</Headings.H5>
                <RepoAbout />
            </Section>
            <Section>
                <Headings.H5>Contributors</Headings.H5>
                <React.Suspense fallback={<Loader size="xs" color="primary" />}>
                    <RepoContributors />
                </React.Suspense>
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
