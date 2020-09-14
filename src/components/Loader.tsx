import React from 'react'
import S from '../stitches.config'

const rippleXs = S.css.keyframes({
    '0%': {
        top: '11px',
        left: '11px',
        width: 0,
        height: 0,
        opacity: 1,
    },
    '100%': {
        top: 0,
        left: 0,
        width: '22px',
        height: '22px',
        opacity: 0,
    },
})

const rippleSm = S.css.keyframes({
    '0%': {
        top: '26px',
        left: '26px',
        width: 0,
        height: 0,
        opacity: 1,
    },
    '100%': {
        top: 0,
        left: 0,
        width: '52px',
        height: '52px',
        opacity: 0,
    },
})

const rippleLg = S.css.keyframes({
    '0%': {
        top: '36px',
        left: '36px',
        width: 0,
        height: 0,
        opacity: 1,
    },
    '100%': {
        top: 0,
        left: 0,
        width: '72px',
        height: '72px',
        opacity: 0,
    },
})

const RootLoader = S.styled('div', {
    display: 'inline-block',
    position: 'relative',

    '& > div': {
        position: 'absolute',
        opacity: 1,
        borderRadius: '50%',
    },

    '& > div:nth-child(2)': {
        animationDelay: '-0.5s',
    },

    variants: {
        color: {
            primary: {
                '& > div': {
                    border: '3px solid $primary',
                },
            },
            accent: {
                '& > div': {
                    border: '3px solid $accent',
                },
            },
            base: {
                '& > div': {
                    border: '3px solid $gray',
                },
            },
            danger: {
                '& > div': {
                    border: '3px solid $danger',
                },
            },
        },
        size: {
            xs: {
                width: 30,
                height: 30,

                '& > div': {
                    animation: `${rippleXs} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;`,
                },
            },
            sm: {
                width: 60,
                height: 60,

                '& > div': {
                    animation: `${rippleSm} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;`,
                },
            },
            lg: {
                width: 80,
                height: 80,

                '& > div': {
                    animation: `${rippleLg} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;`,
                },
            },
        },
    },
})

RootLoader.displayName = 'RootLoader'
RootLoader.defaultProps = {
    size: 'sm',
    color: 'base',
}

export default function Loader(props: any) {
    return (
        <RootLoader {...props}>
            <div></div>
            <div></div>
        </RootLoader>
    )
}
