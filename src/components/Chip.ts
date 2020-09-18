import S from '../stitches.config'

const Chip = S.styled('span', {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '$medium',
    color: '$white',
    borderRadius: '$oval',

    '& > *': {
        marginRight: '$1',
    },

    variants: {
        color: {
            primary: {
                backgroundColor: '$primary',
                color: '$white',
            },
            accent: {
                backgroundColor: '$accent',
                color: '$white',
            },
            base: {
                backgroundColor: '$gray3',
                color: '$lightBlack',
                border: '$1 solid $gray2',
                lineHeight: '18px',
            },
            danger: {
                backgroundColor: '$danger',
                color: '$white',
            },
        },
        size: {
            sm: {
                padding: '0 $2',
                fontSize: '$xs',
            },
            base: {
                padding: '$2 $3',
                fontSize: '$sm',
            },
        },
    },
})

Chip.displayName = 'Chip'
Chip.defaultProps = {
    color: 'base',
    size: 'base',
}

export default Chip
