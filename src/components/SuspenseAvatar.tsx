import React from 'react'
import { useQuery } from 'react-query'
import S from '../stitches.config'

const Img = S.styled('img', {
    display: 'inline-block',
    borderRadius: '50%',

    variants: {
        size: {
            xs: {
                width: 20,
                height: 20,
            },
            sm: {
                width: 26,
                height: 26,
            },
            base: {
                width: 32,
                height: 32,
            },
            lg: {
                width: 40,
                height: 40,
            },
        },
    },
})
Img.displayName = 'Img'
Img.defaultProps = {
    size: 'base',
}

export default function SuspenseAvatar(
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    > & {
        src: string
        size?: React.ComponentPropsWithRef<typeof Img>['size']
    }
) {
    /**
     * Here basically we just used the `useQuery` to trigger loading
     * on Suspense.
     */
    useQuery([props.alt, props.src], (_, src) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve(src)
            }
            img.onerror = (error) => {
                console.error(error)
                resolve(src)
            }
            img.src = src as string
        })
    })

    // @ts-ignore
    return <Img {...props} alt={props.alt} />
}
