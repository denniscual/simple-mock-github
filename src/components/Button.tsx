import S from '../stitches.config'

const Button = S.styled('button', {
    fontSize: '$2',
    color: '$black',
    borderRadius: '$1',
    padding: '5px 16px',
    fontWeight: '$4',
    outline: 0,
    cursor: 'pointer',

    variants: {
        color: {
            primary: {
                backgroundColor: '$blue',
                color: '$white',

                '&:hover': {
                    backgroundColor: '$dimBlue',
                },
            },
            default: {
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
// color: 'default', and appearance: 'contained' and has added styles
// which is the next object.

// Composition variants for color and appearance: 'text'

Button.compoundVariant(
    // The combinator.
    {
        color: 'accent',
        appearance: 'text',
    },
    // The added styles.
    {
        color: '$accent',

        '&:hover': {
            backgroundColor: '$lightGreen',
        },
    }
)

Button.compoundVariant(
    {
        color: 'default',
        appearance: 'text',
    },
    {
        backgroundColor: 'transparent',
    }
)

Button.compoundVariant(
    {
        color: 'primary',
        appearance: 'text',
    },
    {
        color: '$primary',

        '&:hover': {
            backgroundColor: '$lightBlue',
        },
    }
)

Button.compoundVariant(
    {
        color: 'danger',
        appearance: 'text',
    },
    {
        color: '$danger',

        '&:hover': {
            backgroundColor: '$lightRed',
            color: '$danger',
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

        '&:hover': {
            backgroundColor: '$lightRed',
        },
    }
)

Button.compoundVariant(
    {
        color: 'default',
        appearance: 'outlined',
    },
    {
        color: '$black',
        border: '$1 solid $mildGray',
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
    color: 'default',
    appearance: 'contained',
    status: 'enabled',
}

export default Button
