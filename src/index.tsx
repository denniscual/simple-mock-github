import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import { serviceWorker } from './utils'
import 'reset.css'

// @ts-ignore
ReactDOM.unstable_createBlockingRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
