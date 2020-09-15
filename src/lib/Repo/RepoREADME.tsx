import React from 'react'
import { getRepoREADME } from '../../api'
import { useQuery } from 'react-query'
import { StringToGFM } from '../../components'

export default function RepoREADME() {
    const { data } = useQuery(getRepoREADME.key, getRepoREADME) as {
        data: string
    }
    const ref = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
        console.log({ ref })
    }, [])
    return <StringToGFM as="section" ref={ref} html={data} />
}
