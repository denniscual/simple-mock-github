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

    variants: {
        color: {
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
                background: '$lightGray',
                color: '$red',
            },
        },
        appearance: {
            disabled: {
                backgroundColor: '$lightGray',
                color: '$dimGray',
            },
        },
    },
})

Button.defaultProps = {
    color: 'default',
}

Button.displayName = 'Button'

export default Button
