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

    const repoContentList = React.useMemo(() => {
        // This is an absolute link.
        // TODO: Change this link, use the react-router hooks.
        function createContentUrl(path: string) {
            return `/${params.owner}/${params.repo}/code/content/${path}`
        }
        if (Array.isArray(data)) {
            return (
                <ul>
                    {data
                        .slice()
                        .reduce(
                            // Sort the files based on the type. We want to make the dir first then the file type.
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
    }, [data, params.owner, params.repo])

    return (
        <div>
            <RepoContentHeader>Repo files</RepoContentHeader>
            {repoContentList}
        </div>
    )
}
