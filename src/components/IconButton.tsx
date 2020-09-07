import React from 'react'
import Button from './Button'
import S from '../stitches.config'
import Stitches from '@stitches/react'

const RootIconButton = S.styled(Button, {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
        verticalAlign: 'bottom',
    },

    variants: {
        size: {
            sm: {
                fontSize: '$xs',
                padding: '$1 $2',

                '& > *': {
                    marginRight: '$1',

                    '&:last-child': {
                        marginRight: 0,
                    },
                },
            },
            base: {
                fontSize: '$sm',
                padding: '$2 $4',

                '& > *': {
                    marginRight: '$2',

                    '&:last-child': {
                        marginRight: 0,
                    },
                },
            },
        },
    },
})

RootIconButton.defaultProps = {
    size: 'base',
    appearance: 'contained',
}

RootIconButton.displayName = 'RootIconButton'

type IconButtonProps = {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
} & React.ComponentProps<typeof RootIconButton>

// FIXME: We need to know the solution on how we can inherit the types of the Button.

export default function IconButton({
    startIcon,
    endIcon,
    children,
    ...props
}: any) {
    return (
        <RootIconButton {...props}>
            {startIcon && startIcon}
            <span>{children}</span>
            {endIcon && endIcon}
        </RootIconButton>
    )
}
