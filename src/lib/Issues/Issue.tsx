import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'
import IssueComments from './IssueComments'
import { DetailSection } from '../Repo'

/**
 * ------------ IssueOtherDetails -----------
 * */

const issueOtherDetailsCn = S.css({
    gridArea: 'other-details',
})

function IssueOtherDetails() {
    return (
        <aside className={issueOtherDetailsCn}>
            <DetailSection title="Assignee">Assigneed</DetailSection>
            <DetailSection title="Labels">Labels</DetailSection>
        </aside>
    )
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
        gridTemplateAreas: `
            "issue-header issue-header"
            "comments other-details"
            "loader-container loader-container"
    `,
        columnGap: '$8',
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
