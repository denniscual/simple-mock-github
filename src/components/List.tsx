import S from '../stitches.config'

const ListItem = S.styled('li', {
    borderTop: '$1 solid $gray2',
    borderRight: '$1 solid $gray2',
    borderLeft: '$1 solid $gray2',

    '&:last-child': {
        borderBottom: '$1 solid $gray2',
        // All of the list item has border radius at the bottom.
        borderBottomLeftRadius: '$1',
        borderBottomRightRadius: '$1',
    },

    '&:hover': {
        backgroundColor: '$gray3',
    },
})

const List = S.styled('ul', {})

export { ListItem, List }
