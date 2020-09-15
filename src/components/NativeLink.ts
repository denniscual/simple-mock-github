import S from '../stitches.config'

const NativeLink = S.styled('a', {
    fontWeight: '$medium',
    fontFamily: '$sans',
    outline: 0,
    cursor: 'pointer',

    '&:hover': {
        textDecoration: 'underline',
    },

    variants: {
        size: {
            sm: {
                fontSize: '$xs',
            },
            base: {
                fontSize: '$sm',
            },
        },
        color: {
            primary: {
                color: '$primary',

                '&:hover': {
                    color: '$dimBlue',
                },
            },
            accent: {
                color: '$accent',

                '&:hover': {
                    color: '$dimGreen',
                },
            },
            base: {
                color: '$black',

                '&:hover': {
                    color: '$primary',
                },
            },
            danger: {
                color: '$danger',

                '&:hover': {
                    color: '$dimRed',
                },
            },
        },
    },
})

NativeLink.displayName = 'NativeLink'

NativeLink.defaultProps = {
    color: 'base',
    size: 'base',
}

export default NativeLink
