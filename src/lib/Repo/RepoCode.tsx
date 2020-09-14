import React from 'react'
import RepoREADME from './RepoREADME'
import S from '../../stitches.config'

const Container = S.styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    columnGap: '$6',
})

function RepoOtherDetails() {
    return <section>Repo other details</section>
}

export default function RepoCode() {
    return (
        <Container>
            <RepoREADME />
            <RepoOtherDetails />
        </Container>
    )
}
