import React from 'react'
import RepoContent from './RepoContent'
import S from '../../stitches.config'
import { useParams, useResolvedPath } from 'react-router-dom'
import { Text, Link } from '../../components'

const Container = S.styled('section', {
    display: 'grid',
    rowGap: '$4',
})

const Separator = S.styled('span', {
    fontSize: '$base',
    mx: '$1',
})

export default function RepoSubCode() {
    const params = useParams() as {
        repo: string
        '*': string
    }

    const contentParam = params['*']
    const pageCodePath = useResolvedPath('..')
    const pageContentPathname = useResolvedPath('').pathname

    const splittedContentParam = contentParam.split('/')
    const pathnames = splittedContentParam.map((path, idx) => {
        const pathname =
            idx === 0
                ? `${pageContentPathname}/${path}`
                : `${pageContentPathname}/${splittedContentParam
                      .slice(0, idx + 1)
                      .join('/')}`
        return {
            pathname,
            label: path,
        }
    })

    const breadcrumbs = [
        { pathname: pageCodePath, label: params.repo },
        ...pathnames,
    ].map(({ pathname, label }, idx, arr) => {
        const key = `${label}-${pathname}-${idx}`

        if (idx === arr.length - 1) {
            return (
                <Text key={key} as="span">
                    {label}
                </Text>
            )
        }

        return (
            <React.Fragment key={key}>
                <Link to={pathname} size="lg" color="primary">
                    {label}
                </Link>
                <Separator>/</Separator>
            </React.Fragment>
        )
    })

    return (
        <Container>
            <header>{breadcrumbs}</header>
            <RepoContent />
        </Container>
    )
}
