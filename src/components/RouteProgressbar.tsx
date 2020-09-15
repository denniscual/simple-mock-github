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

    React.useLayoutEffect(() => {
        if (pending) {
            NProgress.start()
        } else {
            NProgress.done()
        }
    }, [pending])

    return null
}
