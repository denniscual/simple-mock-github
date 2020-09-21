import React from 'react'
import S from '../../stitches.config'
import IssueHeader from './IssueHeader'
import IssueComments from './IssueComments'
import IssueOtherDetails from './IssueOtherDetails'

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
