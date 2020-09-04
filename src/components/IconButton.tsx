import React from 'react'
import Button from './Button'
import S from '../stitches.config'

// FIXME: We need to research or file a bug on the stiches because
// some variants doesn't work but other are working correctly like
// contained and lightContained. it works! But outlined and text are not working.
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
}

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
