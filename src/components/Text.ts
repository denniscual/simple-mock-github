import S from '../stitches.config'

// TODO: Continue this. the types will go back in the future.
const Text = S.styled('p', {
    opacity: 1,
    margin: 0,
    fontFamily: '$sans',
    color: '$black',

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
    },
})

Text.defaultProps = {
    size: 'base',
}

export default Text
