import React from 'react'
import S from '../../stitches.config'
import {
    Markdown,
    Text,
    NativeLink,
    Loader,
    SuspenseAvatar,
    Headings,
} from '../../components'
import {
    getRepo,
    GetRepoData,
    getRepoContributors,
    GetRepoContributorsData,
    getRepoREADME,
} from '../../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import DetailSection from './DetailSection'
import RepoContent from './RepoContent'

type Params = { owner: string; repo: string }

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ Repo code content -----------
 * */

const ReadmeSection = S.styled('section', {
    border: '$1 solid $gray2',
    borderRadius: '$1',
    p: '$4',
})

const ReadmeTitle = S.styled(Headings.H6, {
    marginBottom: '$4',
})

const MarkdownContainer = S.styled('div', {
    p: '$4',
})

function RepoREADME() {
    const params = useParams() as Params
    const { data } = useQuery([getRepoREADME.key, params], (key) =>
        getRepoREADME(key as string, params)
    ) as {
        data: string
    }
    return (
        <ReadmeSection>
            <ReadmeTitle>README.md</ReadmeTitle>
            <MarkdownContainer>
                <Markdown as="div" html={data} />
            </MarkdownContainer>
        </ReadmeSection>
    )
}

const CodeContentContainer = S.styled('div', {
    '& > *': {
        marginBottom: '$4',

        '&:last-child': {
            marginBottom: 0,
        },
    },
})

function RepoCodeContent() {
    return (
        <CodeContentContainer>
            <RepoContent />
            <React.Suspense
                fallback={
                    <LoaderContainer>
                        <Loader size="lg" color="primary" />
                    </LoaderContainer>
                }
            >
                <RepoREADME />
            </React.Suspense>
        </CodeContentContainer>
    )
}

/**
 * ------------ Other details -----------
 * */
function getDomain(url: string) {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0]
}

function RepoAbout() {
    const params = useParams() as { owner: string; repo: string }
    const { data } = useQuery([getRepo.key, params], (key) =>
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

function RepoOtherDetails() {
    return (
        <aside>
            <DetailSection title={<Headings.H5>About</Headings.H5>}>
                <RepoAbout />
            </DetailSection>
            <DetailSection title={<Headings.H5>Contributors</Headings.H5>}>
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
            <RepoCodeContent />
            <RepoOtherDetails />
        </Container>
    )
}
