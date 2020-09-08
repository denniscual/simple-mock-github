import React from 'react'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

// Put here all of the Providers.

export default function Root() {
    return (
        <Router>
            <App />
        </Router>
    )
}
