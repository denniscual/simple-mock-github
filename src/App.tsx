import React from 'react'
import { Button, PillButton } from './components'
import S from './stitches.config'

// TODO:
// - review the button.
// - integrate IconButton.

const Container = S.styled('div', {
    margin: '5em auto',
    width: '80vw',
    display: 'grid',
    rowGap: 40,
})

const Section = S.styled('section', {
    display: 'grid',
    rowGap: '$4',
})

const SectionTitle = S.styled('h3', {
    fontSize: '$3xl',
})

const SectionTiles = S.styled('div', {
    display: 'flex',

    '& > *': {
        marginRight: '$4',

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
                    <Button size="sm" color="primary">
                        Primary button
                    </Button>
                    <Button size="sm" color="accent">
                        Accent button
                    </Button>
                    <Button size="sm">Default button</Button>
                    <Button size="sm" color="danger">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button
                        size="sm"
                        appearance="lightContained"
                        color="primary"
                    >
                        Primary button
                    </Button>
                    <Button
                        size="sm"
                        appearance="lightContained"
                        color="accent"
                    >
                        Accent button
                    </Button>
                    <Button size="sm">Default button</Button>
                    <Button
                        size="sm"
                        appearance="lightContained"
                        color="danger"
                    >
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button size="sm" color="primary" appearance="text">
                        Primary button
                    </Button>
                    <Button size="sm" color="accent" appearance="text">
                        Accent button
                    </Button>
                    <Button size="sm" appearance="text">
                        Default button
                    </Button>
                    <Button size="sm" color="danger" appearance="text">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button size="sm" color="primary" appearance="outlined">
                        Primary button
                    </Button>
                    <Button size="sm" color="accent" appearance="outlined">
                        Accent button
                    </Button>
                    <Button size="sm" appearance="outlined">
                        Default button
                    </Button>
                    <Button size="sm" color="danger" appearance="outlined">
                        Danger button
                    </Button>
                </SectionTiles>
                <SectionTiles>
                    <Button color="primary">Primary button</Button>
                    <Button color="accent">Accent button</Button>
                    <Button>Default button</Button>
                    <Button color="danger">Danger button</Button>
                </SectionTiles>
                <SectionTiles>
                    <Button appearance="lightContained" color="primary">
                        Primary button
                    </Button>
                    <Button appearance="lightContained" color="accent">
                        Accent button
                    </Button>
                    <Button>Default button</Button>
                    <Button appearance="lightContained" color="danger">
                        Danger button
                    </Button>
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
                    <Button
                        status="disabled"
                        appearance="lightContained"
                        color="primary"
                    >
                        Primary button
                    </Button>
                    <Button
                        status="disabled"
                        appearance="lightContained"
                        color="accent"
                    >
                        Accent button
                    </Button>
                    <Button status="disabled">Default button</Button>
                    <Button
                        status="disabled"
                        appearance="lightContained"
                        color="danger"
                    >
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
                <SectionTitle>Pill Buttons</SectionTitle>
                <SectionTiles>
                    <PillButton size="sm" color="primary">
                        Primary button
                    </PillButton>
                    <PillButton size="sm" color="accent">
                        Accent button
                    </PillButton>
                    <PillButton size="sm">Default button</PillButton>
                    <PillButton size="sm" color="danger">
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton
                        size="sm"
                        appearance="lightContained"
                        color="primary"
                    >
                        Primary button
                    </PillButton>
                    <PillButton
                        size="sm"
                        appearance="lightContained"
                        color="accent"
                    >
                        Accent button
                    </PillButton>
                    <PillButton size="sm">Default button</PillButton>
                    <PillButton
                        size="sm"
                        appearance="lightContained"
                        color="danger"
                    >
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton size="sm" color="primary" appearance="text">
                        Primary button
                    </PillButton>
                    <PillButton size="sm" color="accent" appearance="text">
                        Accent button
                    </PillButton>
                    <PillButton size="sm" appearance="text">
                        Default button
                    </PillButton>
                    <PillButton size="sm" color="danger" appearance="text">
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton size="sm" color="primary" appearance="outlined">
                        Primary button
                    </PillButton>
                    <PillButton size="sm" color="accent" appearance="outlined">
                        Accent button
                    </PillButton>
                    <PillButton size="sm" appearance="outlined">
                        Default button
                    </PillButton>
                    <PillButton size="sm" color="danger" appearance="outlined">
                        Danger button
                    </PillButton>
                </SectionTiles>

                <SectionTiles>
                    <PillButton color="primary">Primary button</PillButton>
                    <PillButton color="accent">Accent button</PillButton>
                    <PillButton>Default button</PillButton>
                    <PillButton color="danger">Danger button</PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton appearance="lightContained" color="primary">
                        Primary button
                    </PillButton>
                    <PillButton appearance="lightContained" color="accent">
                        Accent button
                    </PillButton>
                    <PillButton>Default button</PillButton>
                    <PillButton appearance="lightContained" color="danger">
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton color="primary" appearance="outlined">
                        Primary button
                    </PillButton>
                    <PillButton color="accent" appearance="outlined">
                        Accent button
                    </PillButton>
                    <PillButton appearance="outlined">
                        Default button
                    </PillButton>
                    <PillButton color="danger" appearance="outlined">
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton color="primary" status="disabled">
                        Primary button
                    </PillButton>
                    <PillButton color="accent" status="disabled">
                        Accent button
                    </PillButton>
                    <PillButton status="disabled">Default button</PillButton>
                    <PillButton color="danger" status="disabled">
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton
                        status="disabled"
                        appearance="lightContained"
                        color="primary"
                    >
                        Primary button
                    </PillButton>
                    <PillButton
                        status="disabled"
                        appearance="lightContained"
                        color="accent"
                    >
                        Accent button
                    </PillButton>
                    <PillButton status="disabled">Default button</PillButton>
                    <PillButton
                        status="disabled"
                        appearance="lightContained"
                        color="danger"
                    >
                        Danger button
                    </PillButton>
                </SectionTiles>
                <SectionTiles>
                    <PillButton
                        color="primary"
                        appearance="outlined"
                        status="disabled"
                    >
                        Primary button
                    </PillButton>
                    <PillButton
                        color="accent"
                        appearance="outlined"
                        status="disabled"
                    >
                        Accent button
                    </PillButton>
                    <PillButton appearance="outlined" status="disabled">
                        Default button
                    </PillButton>
                    <PillButton
                        color="danger"
                        appearance="outlined"
                        status="disabled"
                    >
                        Danger button
                    </PillButton>
                </SectionTiles>
            </Section>
        </Container>
    )
}
