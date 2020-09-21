import S from '../stitches.config'

const Text = S.styled('p', {
    opacity: 1,
    fontFamily: '$sans',
    color: '$black',
    my: '$0',
    lineHeight: '1.5',

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
                fontWeight: '$hairline',
            },
            light: {
                fontWeight: '$light',
            },
            normal: {
                fontWeight: '$normal',
            },
            medium: {
                fontWeight: '$medium',
            },
            bold: {
                fontWeight: 'bold',
            },
        },
    },
})

Text.defaultProps = {
    size: 'base',
    fontWeight: 'normal',
}

Text.displayName = 'Text'

export default Text
