import React from 'react'
import S from '../stitches.config'
import { Text, Link, PillButton } from '../components'

const Container = S.styled('section', {
    borderRadius: '$1',
    border: '1px solid $gray2',
    color: '$lightBlack',
})

const CommentHeader = S.styled('div', {
    backgroundColor: '$gray3',
    padding: '$2 $4',
    borderBottom: '1px solid $gray2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

const CommentBody = S.styled('div', {
    p: '$4',
    backgroundColor: '$white',
})

export default function Comment({
    commentTitle,
    commentBody,
}: {
    commentTitle: React.ReactNode
    commentBody: React.ReactNode
}) {
    return (
        <Container>
            <CommentHeader>
                <Text size="sm">{commentTitle}</Text>
                <PillButton size="sm" appearance="outlined">
                    Collaborator
                </PillButton>
            </CommentHeader>
            <CommentBody>{commentBody}</CommentBody>
        </Container>
    )
}
