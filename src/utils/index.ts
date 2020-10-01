import * as serviceWorker from './serviceWorker'
import React from 'react'

/**
 * ------------ LazyComponent -----------
 * */

type Factory = () => Promise<{ default: React.ComponentType<any> }>

class LazyComponent {
    private _loader: null | Promise<{
        default: React.ComponentType<any>
    }> = null
    private _factory: Factory

    constructor(factory: Factory) {
        this._factory = factory
    }

    public preload = () => {
        if (!this._loader) {
            this._loader = this._factory()
        }
    }

    public lazy = () => {
        return React.lazy(this._factory)
    }
}

export { serviceWorker, LazyComponent }
