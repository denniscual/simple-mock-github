import S from '../stitches.config'

const Button = S.styled('button', {
    color: '$black',
    borderRadius: '$1',
    fontWeight: '$medium',
    fontFamily: '$sans',
    outline: 0,
    cursor: 'pointer',

    variants: {
        size: {
            sm: {
                fontSize: '$xs',
                padding: '$1 $2',
            },
            base: {
                fontSize: '$sm',
                padding: '$2 $4',
            },
        },
        color: {
            primary: {
                backgroundColor: '$blue',
                color: '$white',

                '&:hover': {
                    backgroundColor: '$dimBlue',
                },
            },
            base: {
                backgroundColor: '$lightGray',

                '&:hover': {
                    backgroundColor: '$gray',
                },
            },
            accent: {
                backgroundColor: '$accent',
                color: '$white',

                '&:hover': {
                    backgroundColor: '$green',
                },
            },
            danger: {
                backgroundColor: '$danger',
                color: '$white',

                '&:hover': {
                    backgroundColor: '$dimRed',
                },
            },
        },
        appearance: {
            contained: {
                border: '$1 solid $mildGray',
            },
            lightContained: {
                border: 'none',
            },
            text: {
                border: 'none',
                backgroundColor: 'transparent',
            },
            outlined: {
                backgroundColor: 'transparent',
            },
        },
        status: {
            enabled: {
                opacity: '1',
            },
            disabled: {
                opacity: '0.5',
                pointerEvents: 'none',
                cursor: 'none',
            },
        },
    },
})

// These are variants composition.
// `compoundVariant` is an api to create a result based on the combined variant props.
// E.g on the code below this states that this is a combinatiion of
// color: 'base', and appearance: 'contained' and has added styles
// which is the next object.

// Composition variants for color and appearance: 'text'

Button.compoundVariant(
    // The combinator.
    {
        color: 'accent',
        appearance: 'text',
    },

    {
        backgroundColor: 'transparent',
        color: '$black',

        '&:hover': {
            color: '$accent',
            backgroundColor: 'transparent',
        },
    }
)

Button.compoundVariant(
    {
        color: 'base',
        appearance: 'text',
    },
    {
        backgroundColor: 'transparent',
        color: '$black',

        '&:hover': {
            color: '$dimBlack',
            backgroundColor: 'transparent',
        },
    }
)

Button.compoundVariant(
    {
        color: 'primary',
        appearance: 'text',
    },
    {
        backgroundColor: 'transparent',
        color: '$black',

        '&:hover': {
            color: '$primary',
            backgroundColor: 'transparent',
        },
    }
)

Button.compoundVariant(
    {
        color: 'danger',
        appearance: 'text',
    },
    {
        backgroundColor: 'transparent',
        color: '$black',

        '&:hover': {
            color: '$danger',
            backgroundColor: 'transparent',
        },
    }
)

// Composition variants for color and appearance: 'outlined'

Button.compoundVariant(
    {
        color: 'primary',
        appearance: 'outlined',
    },
    {
        color: '$primary',
        border: '$1 solid $primary',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: '$lightBlue',
        },
    }
)

Button.compoundVariant(
    {
        color: 'accent',
        appearance: 'outlined',
    },
    {
        color: '$accent',
        border: '$1 solid $accent',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: '$lightGreen',
        },
    }
)

Button.compoundVariant(
    {
        color: 'danger',
        appearance: 'outlined',
    },
    {
        color: '$danger',
        border: '$1 solid $danger',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: '$lightRed',
        },
    }
)

Button.compoundVariant(
    {
        color: 'base',
        appearance: 'outlined',
    },
    {
        color: '$black',
        border: '$1 solid $mildGray',
        backgroundColor: 'transparent',
    }
)

// Composition variants for color and appearance: 'lightContained'

Button.compoundVariant(
    {
        color: 'primary',
        appearance: 'lightContained',
    },
    {
        color: '$primary',
        backgroundColor: '$lightBlue',

        '&:hover': {
            backgroundColor: '$mildBlue',
        },
    }
)

Button.compoundVariant(
    {
        color: 'accent',
        appearance: 'lightContained',
    },
    {
        color: '$accent',
        backgroundColor: '$lightGreen',

        '&:hover': {
            backgroundColor: '$mildGreen',
        },
    }
)

Button.compoundVariant(
    {
        color: 'danger',
        appearance: 'lightContained',
    },
    {
        color: '$danger',
        backgroundColor: '$lightRed',

        '&:hover': {
            backgroundColor: '$mildRed',
        },
    }
)

Button.defaultProps = {
    size: 'base',
    color: 'base',
    appearance: 'contained',
    status: 'enabled',
}

Button.displayName = 'Button'

export default Button
