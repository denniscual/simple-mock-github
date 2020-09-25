import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Docs from './Docs'
import Home from './lib/Home'
import {
    prefetchRepo,
    prefetchRepoREADME,
    prefetchRepoContributors,
    prefetchRepoIssues,
    prefetchRepoIssue,
} from './api'
import { RouteProgressbar } from './components'

// Search

// TODO: We will add the repository files. We will not include the commit history.
// The simple flow is that if the type is dir, then clicking will navigate to its content. If the type is a file, then clicking will navigate to githug url.
// Bale in our repo code we will show the codes UI at the root. But if the path will narrow because of the codes, then we will hide the existing UIs but retained teh codes UI. then add breadcrumbs at the top.
// TODO: On the api, we need to handle the error. Check the error boundary
// TODO: We need to handle the fetch error in api.

const LazyRepo = React.lazy(() => import('./lib/Repo/Repo'))
const LazyRepoCode = React.lazy(() => import('./lib/Repo/RepoCode'))
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
                            preload={prefetchRepo}
                        >
                            <Route
                                path="/"
                                element={<LazyRepoCode />}
                                preload={(...args) => {
                                    prefetchRepoREADME(...args)
                                    prefetchRepoContributors(...args)
                                }}
                            />
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
                <Route path="docs" element={<Docs />} />
            </Routes>
        </div>
    )
}
