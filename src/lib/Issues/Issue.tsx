import React from 'react'
import S from '../../stitches.config'
import { Headings, Text, Link } from '../../components'
import { AlertCircle } from 'react-feather'

/**
 * ------------ IssueHeader -----------
 * */

const issueHeaderCn = S.css({
    gridArea: 'header',
    paddingBottom: '$4',
    borderBottom: '$1 solid $gray2',
})

const issueTitleCn = S.css({
    marginBottom: '$3',
})

const IssueTitle = S.styled('span', {
    fontSize: '$4xl',
    color: '$black',
    fontWeight: '$normal',
    maxWidth: 1050,
    lineHeight: '1.25',
})

const IssueNumber = S.styled('span', {
    fontSize: '$4xl',
    color: '$gray4',
    fontWeight: '$normal',
})

const OpenChip = S.styled('span', {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '$2 $3',
    backgroundColor: '$accent',
    fontSize: '$sm',
    fontWeight: '$medium',
    color: '$white',
    borderRadius: '$oval',
    marginRight: '$2',

    '& > *': {
        marginRight: '$1',
    },
})

const Meta = S.styled('div', {
    display: 'flex',
    alignItems: 'center',
})

const MetaText = S.styled(Text, {
    color: '$lightBlack',
})

function IssueHeader() {
    return (
        <header className={issueHeaderCn}>
            <Headings.H1 className={issueTitleCn}>
                <IssueTitle>
                    Bug: React 17.0.0-rc.1 checkboxes and radio groups sometimes
                    fire{' '}
                </IssueTitle>
                <IssueNumber>#19841</IssueNumber>
            </Headings.H1>
            <Meta>
                <OpenChip>
                    <AlertCircle color="#ffffff" size={16} />
                    Open
                </OpenChip>
                <MetaText as="span" size="sm">
                    <Link to="denniscual">denniscual </Link>
                    opened this issue 2 days ago · 8 comments
                </MetaText>
            </Meta>
        </header>
    )
}

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
