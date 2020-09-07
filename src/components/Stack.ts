import S from '../stitches.config'

const Stack = S.styled('div', {
    display: 'grid',

    variants: {
        gap: {
            xs: {
                rowGap: '$1',
            },
            sm: {
                rowGap: '$2',
            },
            base: {
                rowGap: '$4',
            },
            lg: {
                rowGap: '$5',
            },
        },
    },
})

Stack.defaultProps = {
    gap: 'base',
}

Stack.displayName = 'Stack'

export default Stack
