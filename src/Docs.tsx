import React from 'react'
import {
    Button,
    PillButton,
    IconButton,
    IconPillButton,
    Text,
    Headings,
    Stack,
    Link,
    IconLink,
} from './components'
import S from './stitches.config'
import { CaretDownFill, Download } from './components/icons'

const Container = S.styled('div', {
    margin: '5em auto',
    width: '80vw',
    display: 'grid',
    rowGap: 40,
})
Container.displayName = 'Container'

const SectionTitle = S.styled('h3', {
    fontSize: '$3xl',
})
SectionTitle.displayName = 'SectionTitle'

const SectionTiles = S.styled('div', {
    display: 'flex',

    variants: {
        direction: {
            row: {
                '& > *': {
                    marginRight: '$4',

                    '&:last-child': {
                        marginRight: 0,
                    },
                },
            },
            column: {
                flexDirection: 'column',

                '& > *': {
                    marginBottom: '$4',

                    '&:last-child': {
                        marginBottom: 0,
                    },
                },
            },
        },
    },
})
SectionTiles.displayName = 'SectionTiles'
SectionTiles.defaultProps = {
    direction: 'row',
}

export default function Docs() {
    return (
        <Container>
            <Stack>
                <SectionTitle>Links</SectionTitle>
                <SectionTiles>
                    <Link color="primary" to="asdf">
                        Primary Link
                    </Link>
                    <Link color="accent" to="asdf">
                        Accent Link
                    </Link>
                    <Link to="asdf">Default Link</Link>
                    <Link color="danger" to="asdf">
                        Danger Link
                    </Link>
                </SectionTiles>
            </Stack>
            <Stack>
                <SectionTitle>Icon links</SectionTitle>
                <SectionTiles>
                    <IconLink
                        size="sm"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                        color="primary"
                        to="asdf"
                    >
                        Primary Link
                    </IconLink>
                    <IconLink
                        size="sm"
                        startIcon={<Download />}
                        color="accent"
                        to="asdf"
                    >
                        Accent Link
                    </IconLink>
                    <IconLink
                        size="sm"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                        to="asdf"
                    >
                        Default Link
                    </IconLink>
                    <IconLink
                        size="sm"
                        color="danger"
                        to="asdf"
                        endIcon={<CaretDownFill />}
                    >
                        Danger Link
                    </IconLink>
                </SectionTiles>
                <SectionTiles>
                    <IconLink
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                        color="primary"
                        to="asdf"
                    >
                        Primary Link
                    </IconLink>
                    <IconLink startIcon={<Download />} color="accent" to="asdf">
                        Accent Link
                    </IconLink>
                    <IconLink
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                        to="asdf"
                    >
                        Default Link
                    </IconLink>
                    <IconLink
                        color="danger"
                        to="asdf"
                        endIcon={<CaretDownFill />}
                    >
                        Danger Link
                    </IconLink>
                </SectionTiles>
            </Stack>
            <Stack>
                <SectionTitle>Texts</SectionTitle>
                <SectionTiles direction="column">
                    <Text size="xs" fontWeight="hairline">
                        Hello world
                    </Text>
                    <Text size="sm">Hello world</Text>
                    <Text>Hello world</Text>
                    <Text size="xl">Hello world</Text>
                </SectionTiles>
            </Stack>
            <Stack>
                <SectionTitle>Headings</SectionTitle>
                <SectionTiles direction="column">
                    <Headings.H6>Hello world</Headings.H6>
                    <Headings.H5>Hello world</Headings.H5>
                    <Headings.H4>Hello world</Headings.H4>
                    <Headings.H3 color="primary">Hello world</Headings.H3>
                    <Headings.H2 color="accent">Hello world</Headings.H2>
                    <Headings.H1 color="danger">Hello world</Headings.H1>
                </SectionTiles>
            </Stack>
            <Stack>
                <SectionTitle>Icon Button</SectionTitle>
                <SectionTiles>
                    <IconButton
                        size="sm"
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary
                    </IconButton>
                    <IconButton
                        size="sm"
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        size="sm"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton
                        size="sm"
                        color="danger"
                        startIcon={<Download />}
                        appearance="outlined"
                    >
                        Danger
                    </IconButton>
                </SectionTiles>
                <SectionTiles>
                    <IconButton color="primary" endIcon={<CaretDownFill />}>
                        Primary
                    </IconButton>
                    <IconButton
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton color="danger" startIcon={<Download />}>
                        Danger
                    </IconButton>
                </SectionTiles>
                <SectionTiles>
                    <IconButton
                        appearance="lightContained"
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary
                    </IconButton>
                    <IconButton
                        appearance="lightContained"
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        appearance="lightContained"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton
                        appearance="lightContained"
                        color="danger"
                        startIcon={<Download />}
                    >
                        Danger
                    </IconButton>
                </SectionTiles>
                <SectionTiles>
                    <IconButton
                        appearance="outlined"
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary
                    </IconButton>
                    <IconButton
                        appearance="outlined"
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        appearance="outlined"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton
                        appearance="outlined"
                        color="danger"
                        startIcon={<Download />}
                    >
                        Danger
                    </IconButton>
                </SectionTiles>
                <SectionTiles>
                    <IconButton
                        appearance="text"
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary
                    </IconButton>
                    <IconButton
                        appearance="text"
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        appearance="text"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton
                        appearance="text"
                        color="danger"
                        startIcon={<Download />}
                    >
                        Danger
                    </IconButton>
                </SectionTiles>
                <SectionTiles>
                    <IconButton
                        as="a"
                        href="#"
                        appearance="text"
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        appearance="text"
                        color="accent"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Accent
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        appearance="text"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        appearance="text"
                        color="danger"
                        startIcon={<Download />}
                    >
                        Danger
                    </IconButton>
                </SectionTiles>
            </Stack>
            <Stack>
                <SectionTitle>Icon pill buttons</SectionTitle>
                <SectionTiles>
                    <IconPillButton
                        size="sm"
                        color="primary"
                        appearance="outlined"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Primary button
                    </IconPillButton>
                    <IconPillButton
                        size="sm"
                        color="accent"
                        appearance="outlined"
                        endIcon={<CaretDownFill />}
                    >
                        Accent button
                    </IconPillButton>
                    <IconPillButton
                        size="sm"
                        appearance="outlined"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Default button
                    </IconPillButton>
                    <IconPillButton
                        size="sm"
                        color="danger"
                        appearance="outlined"
                        endIcon={<CaretDownFill />}
                    >
                        Danger button
                    </IconPillButton>
                </SectionTiles>
                <SectionTiles>
                    <IconPillButton
                        startIcon={<Download />}
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary button
                    </IconPillButton>
                    <IconPillButton color="accent" endIcon={<CaretDownFill />}>
                        Accent button
                    </IconPillButton>
                    <IconPillButton endIcon={<CaretDownFill />}>
                        Default button
                    </IconPillButton>
                    <IconPillButton
                        startIcon={<Download />}
                        color="danger"
                        endIcon={<CaretDownFill />}
                    >
                        Danger button
                    </IconPillButton>
                </SectionTiles>
                <SectionTiles>
                    <IconPillButton
                        startIcon={<Download />}
                        color="primary"
                        appearance="outlined"
                        endIcon={<CaretDownFill />}
                    >
                        Primary button
                    </IconPillButton>
                    <IconPillButton
                        color="accent"
                        appearance="outlined"
                        endIcon={<CaretDownFill />}
                    >
                        Accent button
                    </IconPillButton>
                    <IconPillButton
                        appearance="outlined"
                        endIcon={<CaretDownFill />}
                    >
                        Default button
                    </IconPillButton>
                    <IconPillButton
                        color="danger"
                        appearance="outlined"
                        startIcon={<Download />}
                        endIcon={<CaretDownFill />}
                    >
                        Danger button
                    </IconPillButton>
                </SectionTiles>
                <SectionTiles>
                    <IconPillButton
                        status="disabled"
                        startIcon={<Download />}
                        color="primary"
                        endIcon={<CaretDownFill />}
                    >
                        Primary button
                    </IconPillButton>
                    <IconPillButton
                        status="disabled"
                        color="accent"
                        endIcon={<CaretDownFill />}
                    >
                        Accent button
                    </IconPillButton>
                    <IconPillButton
                        status="disabled"
                        endIcon={<CaretDownFill />}
                    >
                        Default button
                    </IconPillButton>
                    <IconPillButton
                        status="disabled"
                        startIcon={<Download />}
                        color="danger"
                        endIcon={<CaretDownFill />}
                    >
                        Danger button
                    </IconPillButton>
                </SectionTiles>
            </Stack>
            <Stack>
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
            </Stack>
            <Stack>
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
            </Stack>
        </Container>
    )
}
