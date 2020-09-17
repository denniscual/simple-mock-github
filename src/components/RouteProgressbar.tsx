import React from 'react'
import { useLocationPending } from 'react-router-dom'
import Progressbar from './Progressbar'

/*
 * A progress bar which mimics the progress bar of youtube, etc.
 *
 */
export default function RouteProgressbar() {
    const pending = useLocationPending()
    return <Progressbar pending={pending} />
}
