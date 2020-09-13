import React from 'react'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ReactQueryConfigProvider } from 'react-query'

// Put here all of the Providers.

// This is for query to support React CM
const queryConfig = {
    shared: {
        suspense: true,
    },
}

export default function Root() {
    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <Router>
                <App />
            </Router>
        </ReactQueryConfigProvider>
    )
}
