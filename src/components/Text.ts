import S from '../stitches.config'

// TODO: Continue this. the types will go back in the future.
const Text = S.styled('p', {
    opacity: 1,
    fontFamily: '$sans',
    color: '$black',
    my: '$0',

    variants: {
        size: {
            xs: {
                fontSize: '$xs',
            },
            sm: {
                fontSize: '$sm',
            },
            base: {
                fontSize: '$base',
            },
            xl: {
                fontSize: '$xl',
            },
        },
        fontWeight: {
            hairline: {
                fontSize: '$xs',
            },
            light: {
                fontSize: '$sm',
            },
            normal: {
                fontSize: '$base',
            },
            medium: {
                fontSize: '$xl',
            },
        },
    },
})

Text.defaultProps = {
    size: 'base',
}

export default Text
