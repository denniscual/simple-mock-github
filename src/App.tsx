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

// NOTE: We don't need to define the key param on the api functions. If we need, define it though lol!

// Issue

// Leftover for the issues page.
// TODO: We need to change the styles of the IssueItem/ListItem. Don't use grid instead just use flexbox.
// but its good to be aware on the similary styles and ui.
// TODO: We need to handle the isFetching inside the issues and pulls.
// TODO: We need to move the auth token into env variables.
// TODO: On the api, we need to handle the error. Check the error boundary
// of react-query for React Suspense CM.
// TODO: Change the icon use on the Repo header. Use react-feather.
// TODO: We need to handle the fetch error in api.
// TODO: Add footer
// FIXME: We need to use a Link of react-router for Suspense avatar. Then redirect it into this `localhost:3000/login`.

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
