import React from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default function Progressbar({
    pending,
    delay = 500,
}: {
    pending: boolean
    delay?: number
}) {
    React.useEffect(() => {
        // Add timeout so that we can delay the showing of progress bar.
        // We set 500 ms just like the delay for showing the Loader Component.
        // We don't need to show the timeout if the routes rendering navigation
        // only takes below 500ms. Show if the rendering/showing comes up above.
        const timeoutId = setTimeout(() => {
            if (pending) {
                NProgress.start()
            }
        }, delay)
        if (!pending) {
            NProgress.done()
        }
        return () => clearTimeout(timeoutId)
    }, [delay, pending])

    return null
}
