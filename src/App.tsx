import React from 'react'
import { Button, IconButton } from './components'
import S from './stitches.config'

const Container = S.styled('div', {
    margin: '5em auto',
    width: '80vw',
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
                    <Button color="primary">Primary button</Button>
                    <Button color="accent">Accent button</Button>
                    <Button>Default button</Button>
                    <Button color="danger">Danger button</Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="text">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="text">
                        Accent button
                    </Button>
                    <Button appearance="text">Default button</Button>
                    <Button color="danger" appearance="text">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="outlined">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="outlined">
                        Accent button
                    </Button>
                    <Button appearance="outlined">Default button</Button>
                    <Button color="danger" appearance="outlined">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" status="disabled">
                        Primary button
                    </Button>
                    <Button color="accent" status="disabled">
                        Accent button
                    </Button>
                    <Button status="disabled">Default button</Button>
                    <Button color="danger" status="disabled">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="text" status="disabled">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="text" status="disabled">
                        Accent button
                    </Button>
                    <Button appearance="text" status="disabled">
                        Default button
                    </Button>
                    <Button color="danger" appearance="text" status="disabled">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button
                        color="primary"
                        appearance="outlined"
                        status="disabled"
                    >
                        Primary button
                    </Button>
                    <Button
                        color="accent"
                        appearance="outlined"
                        status="disabled"
                    >
                        Accent button
                    </Button>
                    <Button appearance="outlined" status="disabled">
                        Default button
                    </Button>
                    <Button
                        color="danger"
                        appearance="outlined"
                        status="disabled"
                    >
                        Danger button
                    </Button>
                </SectionTiles>
            </Section>
            <Section>
                <SectionTitle>Icon Buttons</SectionTitle>
                <SectionTiles>
                    <Button color="primary">Primary button</Button>
                    <Button color="accent">Accent button</Button>
                    <Button>Default button</Button>
                    <Button color="danger">Danger button</Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="text">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="text">
                        Accent button
                    </Button>
                    <Button appearance="text">Default button</Button>
                    <Button color="danger" appearance="text">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="outlined">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="outlined">
                        Accent button
                    </Button>
                    <Button appearance="outlined">Default button</Button>
                    <Button color="danger" appearance="outlined">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" status="disabled">
                        Primary button
                    </Button>
                    <Button color="accent" status="disabled">
                        Accent button
                    </Button>
                    <Button status="disabled">Default button</Button>
                    <Button color="danger" status="disabled">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary" appearance="text" status="disabled">
                        Primary button
                    </Button>
                    <Button color="accent" appearance="text" status="disabled">
                        Accent button
                    </Button>
                    <Button appearance="text" status="disabled">
                        Default button
                    </Button>
                    <Button color="danger" appearance="text" status="disabled">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button
                        color="primary"
                        appearance="outlined"
                        status="disabled"
                    >
                        Primary button
                    </Button>
                    <Button
                        color="accent"
                        appearance="outlined"
                        status="disabled"
                    >
                        Accent button
                    </Button>
                    <Button appearance="outlined" status="disabled">
                        Default button
                    </Button>
                    <Button
                        color="danger"
                        appearance="outlined"
                        status="disabled"
                    >
                        Danger button
                    </Button>
                </SectionTiles>
            </Section>
        </Container>
    )
}
