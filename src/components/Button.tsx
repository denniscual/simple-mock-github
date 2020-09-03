import S from '../stitches.config'

const Button = S.styled('button', {
    fontSize: '$2',
    color: '$black',
    borderRadius: '$1',
    padding: '5px 16px',
    fontWeight: '$4',
    outline: 0,
    border: '$1 solid $mildGray',
    cursor: 'pointer',
    backgroundColor: '$lightGray',

    variants: {
        color: {
            default: {
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
                color: '$red',
            },
        },
        appearance: {
            disabled: {
                opacity: '0.5',
            },
        },
    },
})

Button.defaultProps = {
    color: 'default',
}

Button.displayName = 'Button'

export default Button
