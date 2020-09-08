import React from 'react'
import Link from './Link'
import S from '../stitches.config'

const RootIconLink = S.styled(Link, {
    display: 'flex',
    alignItems: 'center',

    '& svg': {
        verticalAlign: 'bottom',
    },

    variants: {
        size: {
            sm: {
                fontSize: '$xs',

                '& > *': {
                    marginRight: '$1',

                    '&:last-child': {
                        marginRight: 0,
                    },
                },
            },
            base: {
                fontSize: '$sm',

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

RootIconLink.defaultProps = {
    size: 'base',
    appearance: 'contained',
}

RootIconLink.displayName = 'RootIconLink'

export default function IconButton({
    startIcon,
    endIcon,
    children,
    ...props
}: any) {
    return (
        <RootIconLink {...props}>
            {startIcon && startIcon}
            <span>{children}</span>
            {endIcon && endIcon}
        </RootIconLink>
    )
}
