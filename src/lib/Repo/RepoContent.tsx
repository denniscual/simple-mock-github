import React from 'react'
import S from '../../stitches.config'
import { ListItem, Link } from '../../components'
import { getRepoContent, GetRepoContentData } from '../../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Folder, File } from 'react-feather'

type Params = {
    owner: string
    repo: string
    '*'?: string
}

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

export default function RepoContent() {
    const params = useParams() as Params
    const path = params['*']
    const { data } = useQuery([getRepoContent.key, params], () =>
        getRepoContent({
            ...params,
            path: path ?? '',
        })
    ) as {
        data: GetRepoContentData
    }

    // This is an absolute link.
    function createContentUrl(path: string) {
        return `/${params.owner}/${params.repo}/code/path/${path}`
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
                                    to={createContentUrl(content.path)}
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
