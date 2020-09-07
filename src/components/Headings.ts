import S from '../stitches.config'

const H1 = S.styled('h1', {
    fontSize: '$3xl',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H1.defaultProps = {
    color: 'base',
}
H1.displayName = 'H1'

const H2 = S.styled('h2', {
    fontSize: '$2xl',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H2.defaultProps = {
    color: 'base',
}
H2.displayName = 'H2'

const H3 = S.styled('h3', {
    fontSize: '$xl',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H3.defaultProps = {
    color: 'base',
}
H3.displayName = 'H3'

const H4 = S.styled('h4', {
    fontSize: '$lg',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H4.defaultProps = {
    color: 'base',
}
H4.displayName = 'H4'

const H5 = S.styled('h5', {
    fontSize: '$base',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H5.defaultProps = {
    color: 'base',
}
H5.displayName = 'H5'

const H6 = S.styled('h6', {
    fontSize: '$sm',
    fontWeight: '$bold',
    my: '$0',

    variants: {
        color: {
            primary: {
                color: '$primary',
            },
            accent: {
                color: '$accent',
            },
            base: {
                color: '$black',
            },
            danger: {
                color: '$danger',
            },
        },
    },
})
H6.defaultProps = {
    color: 'base',
}
H6.displayName = 'H6'

export default {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
}
