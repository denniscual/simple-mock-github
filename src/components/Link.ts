import { Link as RootLink } from 'react-router-dom'
import S from '../stitches.config'

const Link = S.styled(RootLink, {
    fontWeight: '$medium',
    fontFamily: '$sans',
    outline: 0,
    cursor: 'pointer',
    lineHeight: '1.5',

    variants: {
        size: {
            sm: {
                fontSize: '$xs',
            },
            base: {
                fontSize: '$sm',
            },
            lg: {
                fontSize: '$base',
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

Link.displayName = 'Link'

Link.defaultProps = {
    color: 'base',
    size: 'base',
}

export default Link
