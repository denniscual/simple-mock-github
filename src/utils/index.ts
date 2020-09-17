import React from 'react'
import * as serviceWorker from './serviceWorker'

function useIsThisFirstRender() {
    const count = React.useRef(1)
    count.current++
    return count.current === 2
}

export { serviceWorker, useIsThisFirstRender }
