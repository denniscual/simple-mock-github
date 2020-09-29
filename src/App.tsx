import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './lib/Home'
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

// TODO: Add the breadcrumbs.
// TODO: On the api, we need to handle the error. Check the error boundary
// TODO: We need to handle the fetch error in api.
// FIXME: Create a generic type for the Params. Add the ownder and repo as required then other which are not(optional)
// TODO: Remove our auth.

const LazyRepo = React.lazy(() => import('./lib/Repo/Repo'))
const LazyRepoCode = React.lazy(() => import('./lib/Repo/RepoCode'))
const LazyRepoSubCode = React.lazy(() => import('./lib/Repo/RepoSubCode'))
const LazyFilterableIssues = React.lazy(
    () => import('./lib/Issues/FilterableIssues')
)
const LazyIssue = React.lazy(() => import('./lib/Issues/Issue'))

export default function App() {
    return (
        <div>
            <RouteProgressbar />
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path=":owner">
                        <Route
                            path=":repo"
                            element={<LazyRepo />}
                            preload={(...args) => {
                                prefetchRepo(...args)
                                // prefetching issues whenever the user will navigate to repo page.
                                prefetchRepoIssues(...args)
                            }}
                        >
                            <Route path="/code">
                                <Route
                                    path="/"
                                    element={<LazyRepoCode />}
                                    preload={(...args) => {
                                        prefetchRepoContent(...args)
                                        prefetchRepoContributors(...args)
                                        prefetchRepoREADME(...args)
                                    }}
                                />
                                <Route
                                    path="content/*"
                                    element={<LazyRepoSubCode />}
                                    preload={prefetchRepoContent}
                                />
                            </Route>
                            <Route path="issues">
                                <Route
                                    path="/"
                                    element={<LazyFilterableIssues />}
                                    preload={prefetchRepoIssues}
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
        </div>
    )
}
