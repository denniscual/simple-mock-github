import React from 'react'
import S from '../stitches.config'
import { Text, PillButton } from '../components'

const Container = S.styled('section', {
    color: '$lightBlack',
})

const CommentHeader = S.styled('div', {
    backgroundColor: '$gray3',
    padding: '$2 $4',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '$1',
    borderTopLeftRadius: '$1',
    border: '1px solid $gray2',
})

const CommentBody = S.styled('div', {
    p: '$4',
    backgroundColor: '$white',
    borderBottom: '1px solid $gray2',
    borderLeft: '1px solid $gray2',
    borderRight: '1px solid $gray2',
    borderBottomRightRadius: '$1',
    borderBottomLeftRadius: '$1',
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
