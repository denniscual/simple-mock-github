import { createStyled } from '@stitches/react'

const tokens = {
    colors: {
        $primary: '#0366d6',
        $accent: '#2ea44f',
        $danger: '#cb2431',
        $lightGray: '#fafbfc',
        $mildGray: 'rgba(27,31,35,.15)',
        $gray: '#f3f4f6',
        $gray2: '#e1e4e8',
        $gray3: '#f6f8fa',
        $gray4: '#6a737d',
        $dimGray: '#959da5',
        $lightBlue: '#f1f8ff',
        $mildBlue: '#def',
        $blue: '#0366d6',
        $dimBlue: '#0258b9',
        $lightGreen: '#dafae3',
        $mildGreen: '#b9f3c9',
        $green: '#2c974b',
        $dimGreen: '#2ea44f',
        $lightRed: '#ffd7db',
        $mildRed: '#f3c3c8',
        $red: '#cb2431',
        $dimRed: '#ae1420',
        $lightBlack: '#586069',
        $black: '#24292e',
        $dimBlack: '#121315',
        $white: '#ffffff',
    },
    fonts: {
        $sans:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    // This must be a Rem.
    fontSizes: {
        $xs: '12px',
        $sm: '14px',
        $base: '16px',
        $lg: '18px',
        $xl: '20px',
        $2xl: '22px',
        $3xl: '28px',
        $4xl: '32px',
    },
    fontWeights: {
        $hairline: '100',
        $light: '300',
        $normal: '400',
        $medium: '500',
        $bold: '600',
    },
    space: {
        $0: '0px',
        $1: '4px',
        $2: '8px',
        $3: '12px',
        $4: '16px',
        $5: '20px',
        $6: '24px',
        $7: '28px',
        $8: '32px',
    },
    borderWidths: {
        $1: '1px',
        $2: '2px',
    },
    radii: {
        $1: '6px',
        $oval: '2em',
    },
}

type SpaceKey = keyof typeof tokens.space

const { styled, css } = createStyled({
    prefix: '',
    tokens,
    breakpoints: {
        sm: (rule) => `@media (min-width: 640px) { ${rule} }`,
        md: (rule) => `@media (min-width: 768px) { ${rule} }`,
        lg: (rule) => `@media (min-width: 1024px) { ${rule} }`,
        xl: (rule) => `@media (min-width: 1280px) { ${rule} }`,
    },
    utils: {
        m: (config: any) => (value: SpaceKey) => ({
            marginTop: value,
            marginRight: value,
            marginBottom: value,
            marginLeft: value,
        }),
        mx: (config: any) => (value: SpaceKey) => ({
            marginRight: value,
            marginLeft: value,
        }),
        my: (config: any) => (value: SpaceKey) => ({
            marginTop: value,
            marginBottom: value,
        }),
        p: (config: any) => (value: SpaceKey) => ({
            paddingTop: value,
            paddingRight: value,
            paddingBottom: value,
            paddingLeft: value,
        }),
        px: (config: any) => (value: SpaceKey) => ({
            paddingRight: value,
            paddingLeft: value,
        }),
        py: (config: any) => (value: SpaceKey) => ({
            paddingTop: value,
            paddingBottom: value,
        }),
        box: (config: any) => (value: SpaceKey) => ({
            width: value,
            height: value,
        }),
    },
})

css.global({
    'html, body, .App, .root': {
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important`,
        lineHeight: '1.5',
        background: '$white',
        textDecoration: 'none',
        boxSizing: 'border-box',
        color: '$black',
    },
    a: {
        textDecoration: 'none',
    },
})

export default {
    styled,
    css,
}
