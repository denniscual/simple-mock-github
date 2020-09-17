import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'

/**
 * ------------ IssueComments -----------
 * */

const issueCommentsCn = S.css({
    gridArea: 'comments',
})

function IssueComments() {
    return <section className={issueCommentsCn}>Comments</section>
}

/**
 * ------------ IssueOtherDetails -----------
 * */

const issueOtherDetailsCn = S.css({
    gridArea: 'other-details',
})

function IssueOtherDetails() {
    return <aside className={issueOtherDetailsCn}>Other details</aside>
}

/**
 * ------------ Issue -----------
 * */

const Container = S.styled('section', {
    '& > *': {
        marginBottom: '$8',
    },

    md: {
        display: 'grid',
        gridTemplateColumns: '75% 25%',
        gridTemplateAreas: `"header header"
    "comments other-details"
    `,
    },
})

export default function Issue() {
    return (
        <Container>
            <IssueHeader />
            <IssueComments />
            <IssueOtherDetails />
        </Container>
    )
}
