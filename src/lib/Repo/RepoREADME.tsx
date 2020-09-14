import React from 'react'
import { getRepoREADME, GetRepoREADMEData } from '../../api'
import { useQuery } from 'react-query'

export default function RepoREADME() {
    const { data } = useQuery(getRepoREADME.key, getRepoREADME) as {
        data: GetRepoREADMEData
    }
    return <section>RepoREADME</section>
}
