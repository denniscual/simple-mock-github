import React from 'react'
import S from '../../stitches.config'
import {
    Text,
    NativeLink,
    Loader,
    SuspenseAvatar,
    ListItem,
    Link,
    Headings,
} from '../../components'
import {
    getRepo,
    GetRepoData,
    getRepoContributors,
    GetRepoContributorsData,
    getRepoREADME,
    getRepoContent,
    GetRepoContentData,
} from '../../api'
import { useQuery } from 'react-query'
import { Markdown } from '../../components'
import { useParams } from 'react-router-dom'
import { Folder, File } from 'react-feather'
import DetailSection from './DetailSection'

type Params = { owner: string; repo: string }

// @ts-ignore
const SuspenseList = React.unstable_SuspenseList

const LoaderContainer = S.styled('div', {
    display: 'flex',
    justifyContent: 'center',
})
LoaderContainer.displayName = 'LoaderContainer'

/**
 * ------------ RepoContent -----------
 * */

const RepoContentHeader = S.styled('header', {
    p: '$4',
    backgroundColor: '$mildBlue',
    fontSize: '$sm',
    borderTopLeftRadius: '$1',
    borderTopRightRadius: '$1',
    border: '$1 solid $gray2',
    borderBottom: 'none',
})

const RepoContentItem = S.styled(ListItem, {
    padding: '$2 $4',
    fontSize: '$sm',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: '$3',
    alignItems: 'center',
})

const RepoContentItemLink = S.styled(Link, {
    fontWeight: '$normal',
    color: '$black',
})

function RepoContent() {
    const params = useParams() as Params
    const { data } = useQuery([getRepoContent.key, params], () =>
        getRepoContent({
            ...params,
            path: '',
        })
    ) as {
        data: GetRepoContentData
    }

    const repoContentList = React.useMemo(() => {
        if (Array.isArray(data)) {
            return (
                <ul>
                    {data
                        .slice()
                        .reduce(
                            (acc, value) => {
                                if (value.type === 'dir') {
                                    acc[0] = acc[0].concat(value)
                                } else {
                                    acc[1] = acc[1].concat(value)
                                }
                                return acc
                            },
                            [[], []]
                        )
                        .flat()
                        // @ts-ignore
                        .map((content) => (
                            <RepoContentItem key={content.id}>
                                {content.type === 'dir' ? (
                                    <Folder size={15} color="#0366d6" />
                                ) : (
                                    <File size={15} color="#24292e" />
                                )}
                                <RepoContentItemLink
                                    to={`path/${content.path}`}
                                >
                                    {content.name}
                                </RepoContentItemLink>
                            </RepoContentItem>
                        ))}
                </ul>
            )
        }
        return <ListItem as="div">{data.name}</ListItem>
    }, [data])

    return (
        <section>
            <RepoContentHeader>Repo files</RepoContentHeader>
            {repoContentList}
        </section>
    )
}

/**
 * ------------ Readme -----------
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
                <Markdown as="section" html={data} />
            </MarkdownContainer>
        </ReadmeSection>
    )
}

/**
 * ------------ About -----------
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

const ContentContainer = S.styled('div', {
    display: 'grid',
    rowGap: '$4',
})

export default function RepoCode() {
    return (
        <Container>
            <ContentContainer>
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
            </ContentContainer>
            <RepoOtherDetails />
        </Container>
    )
}
