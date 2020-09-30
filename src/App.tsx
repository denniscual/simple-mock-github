import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
    prefetchRepo,
    prefetchRepoContributors,
    prefetchRepoIssues,
    prefetchRepoIssue,
    prefetchRepoContent,
    prefetchRepoREADME,
} from './api'
import { RouteProgressbar } from './components'

// Search

// TODO: On the api, we need to handle the error. Check the error boundary
// TODO: We need to handle the fetch error in api.
// FIXME: Create a generic type for the Params. Add the ownder and repo as required then other which are not(optional)
// TODO: Remove our auth.

const LazyRepoSubCode = React.lazy(() => import('./lib/Repo/RepoSubCode'))

// TODO: We will do this first then go to binosight.
// Or maybe we will have a registration of the Components which we want to preload.
// Register something like this => JSResouce.set('Repo2', () => import('blah blah'))
// use it like this => const LazyRepo2 = JSResouce.get('Repo2').lazy()
// then preload it like this  => JSResouce.get('Repo2').preload()

type Factory = () => Promise<{ default: React.ComponentType<any> }>

class Resource {
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

class LazyResources {
    private _resources: Map<string, Resource> = new Map()

    public set = (key: string, factory: Factory) => {
        if (!this._resources.has(key)) {
            this._resources.set(key, new Resource(factory))
        }
    }

    public get = (key: string) => {
        const resource = this._resources.get(key)
        if (!resource) {
            throw new Error(`Resource was not found based on the key "${key}".`)
        }
        return resource
    }
}

const lazyResources = new LazyResources()
lazyResources.set('Home', () => import('./lib/Home/Home'))
lazyResources.set('Repo', () => import('./lib/Repo/Repo'))
lazyResources.set('RepoCode', () => import('./lib/Repo/RepoCode'))
lazyResources.set('Issues', () => import('./lib/Issues/FilterableIssues'))
lazyResources.set('Issue', () => import('./lib/Issues/Issue'))

const LazyHome2 = lazyResources.get('Home').lazy()
const LazyRepo = lazyResources.get('Repo').lazy()
const LazyRepoCode = lazyResources.get('RepoCode').lazy()
const LazyIssues = lazyResources.get('Issues').lazy()
const LazyIssue = lazyResources.get('Issue').lazy()

// preload the home.
lazyResources.get('Home').preload()

export default function App() {
    return (
        <div>
            <RouteProgressbar />
            <React.Suspense fallback="Loading app...">
                <Routes>
                    <Route path="/" element={<LazyHome2 />}>
                        <Route path=":owner">
                            <Route
                                path=":repo"
                                element={<LazyRepo />}
                                preload={(...args) => {
                                    prefetchRepo(...args)
                                    // prefetch the codes for Repo
                                    lazyResources.get('Repo').preload()
                                }}
                            >
                                <Route path="/code">
                                    {/* Render this page on this path => /code or /code/ */}
                                    <Route
                                        path="/"
                                        element={<LazyRepoCode />}
                                        preload={(...args) => {
                                            // for data
                                            prefetchRepoContent(...args)
                                            prefetchRepoContributors(...args)
                                            prefetchRepoREADME(...args)
                                            prefetchRepoIssues(...args)

                                            // for codes
                                            lazyResources
                                                .get('RepoCode')
                                                .preload()
                                            lazyResources
                                                .get('Issues')
                                                .preload()
                                        }}
                                    />
                                    {/* Render this page on this path => /code/* */}
                                    <Route
                                        path="/*"
                                        element={<LazyRepoSubCode />}
                                        preload={prefetchRepoContent}
                                    />
                                </Route>
                                <Route path="issues">
                                    <Route
                                        path="/"
                                        element={<LazyIssues />}
                                        preload={(...args) => {
                                            prefetchRepoIssues(...args)

                                            lazyResources
                                                .get('Issues')
                                                .preload()
                                        }}
                                    />
                                    <Route
                                        path=":issueNumber"
                                        element={<LazyIssue />}
                                        preload={prefetchRepoIssue}
                                    />
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </React.Suspense>
        </div>
    )
}
