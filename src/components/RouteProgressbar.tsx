import React from 'react'
import { useLocationPending } from 'react-router-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

/*
 * A progress bar which mimics the progress bar of youtube, etc.
 *
 */
export default function RouteProgressbar() {
    const pending = useLocationPending()

    React.useEffect(() => {
        // Add timeout so that we can delay the showing of progress bar.
        // We set 500 ms just like the delay for showing the Loader Component.
        // We don't need to show the timeout if the routes rendering navigation
        // only takes below 500ms. Show if the rendering/showing comes up above.
        const timeoutId = setTimeout(() => {
            if (pending) {
                NProgress.start()
            }
        }, 500)
        if (!pending) {
            NProgress.done()
        }
        return () => clearTimeout(timeoutId)
    }, [pending])

    return null
}
