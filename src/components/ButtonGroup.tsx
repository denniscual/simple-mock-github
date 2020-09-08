import React from 'react'
import S from '../stitches.config'

const Container = S.styled('div', {
    display: 'flex',

    '& > *:nth-child(odd)': {
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderRightWidth: 0,
    },

    '& > *:nth-child(even)': {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
})

const ButtonGroup: React.FC = ({ children }) => {
    return <Container>{children}</Container>
}

export default ButtonGroup
