import React from 'react'

type Factory = () => Promise<{ default: React.ComponentType<any> }>

class LazyComponent {
    private _resource: null | Promise<{
        default: React.ComponentType<any>
    }> = null
    private _factory: Factory

    constructor(factory: Factory) {
        this._factory = factory
    }

    public preload = () => {
        if (!this._resource) {
            this._resource = this._factory()
        }
    }

    public lazy = () => {
        return React.lazy(this._factory)
    }
}

const lazyHome = new LazyComponent(() => import('./lib/Home'))
const lazyRepo = new LazyComponent(() => import('./lib/Repo/Repo'))
const lazyRepoCode = new LazyComponent(() => import('./lib/Repo/RepoCode'))
const lazyRepoSubCode = new LazyComponent(
    () => import('./lib/Repo/RepoSubCode')
)
const lazyIssues = new LazyComponent(
    () => import('./lib/Issues/FilterableIssues')
)
const lazyIssue = new LazyComponent(() => import('./lib/Issues/Issue'))

export {
    lazyHome,
    lazyRepo,
    lazyRepoCode,
    lazyRepoSubCode,
    lazyIssues,
    lazyIssue,
}
