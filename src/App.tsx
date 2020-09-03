import React from 'react'
import { Button, IconButton } from './components'
import S from './stitches.config'

const Container = S.styled('div', {
    margin: '5em auto',
    width: '400px',
    display: 'grid',
    rowGap: 40,
})

const Section = S.styled('section', {
    display: 'grid',
    rowGap: '$3',
})

const SectionTitle = S.styled('h3', {
    fontSize: '$lg',
})

const SectionTiles = S.styled('div', {
    display: 'flex',

    '& > *': {
        marginRight: '$3',

        '&:last-child': {
            marginRight: 0,
        },
    },
})

export default function App() {
    return (
        <Container>
            <Section>
                <SectionTitle>Buttons</SectionTitle>
                <SectionTiles>
                    <Button>Hello world</Button>
                    <IconButton />
                </SectionTiles>
            </Section>
            <Section>
                <SectionTitle>Buttons</SectionTitle>
                <SectionTiles>
                    <Button>Hello world</Button>
                    <IconButton />
                </SectionTiles>
            </Section>
        </Container>
    )
}
