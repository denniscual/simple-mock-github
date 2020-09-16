import React from 'react'
import { useQuery } from 'react-query'

export default function SuspenseImg(
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    > & {
        src: string
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
    return <img {...props} alt={props.alt} />
}
