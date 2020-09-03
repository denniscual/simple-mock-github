import { createStyled } from '@stitches/react'

const { styled, css } = createStyled({
    prefix: '',
    tokens: {
        colors: {
            $accent: '#2ea44f',
            $lightGray: '#fafbfc',
            $mildGray: 'rgba(27,31,35,.15)',
            $gray: '#f3f4f6',
            $dimGray: '#959da5',
            $lightBlue: '#f1f8ff',
            $lightBlack: '#586069',
            $lightGreen: '#2ea44f',
            $green: '#2c974b',
            $black: '#24292e',
            $white: '#ffffff',
            $red: '#cb2431',
        },
        fontSizes: {
            $1: '12px',
            $2: '14px',
            $3: '16px',
            $4: '18px',
            $5: '20px',
            $6: '22px',
            $lg: '28px',
        },
        fontWeights: {
            $1: '100',
            $2: '300',
            $3: '400',
            $4: '500',
        },
        space: {
            $1: '4px',
            $2: '8px',
            $3: '16px',
        },
        borderWidths: {
            $1: '1px',
            $2: '2px',
        },
        radii: {
            $1: '6px',
        },
    },
    breakpoints: {},
    utils: {},
})

css.global({
    'html body *': {
        // TODO: Im not sure why this style doesn't override the element styles.
        // SOmething like I need to add the `!important` which basically
        // can create an issue for a tool like styling Markdown.
        // We will find another safer way in the future.
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important`,
        fontSize: '$2',
        lineHeight: '1.2',
        color: '$black',
        background: '$white',
        textDecoration: 'none',
        boxSizing: 'border-box',
    },
})

export default {
    styled,
    css,
}
