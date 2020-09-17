import React from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Docs from './Docs'
import Home from './lib/Home'
import {
    prefetchRepo,
    prefetchRepoREADME,
    prefetchRepoContributors,
    prefetchRepoIssues,
} from './api'
import { RouteProgressbar } from './components'

// TODO: What we want to use inside the issues and pulls are search api
// because its has filter. - https://developer.github.com/v3/search/#constructing-a-search-query

// TODO: We need to change the styles of the IssueItem/ListItem. Don't use grid instead just use flexbox.
// but its good to be aware on the similary styles and ui.
// TODO: Create the issue component.
// TODO: Create the sidebar and filter area of the Issues
// TODO: We need to handle the isFetching inside the issues and pulls.
// TODO: We need to put the theme color to a theme module so that we
// can reference the theme color insid the Component not only on the styled.
// TODO: We need to move the auth token into env variables.
// TODO: On the api, we need to handle the error. Check the error boundary
// of react-query for React Suspense CM.

function Issue() {
    const params = useParams() as { issue: string }
    return (
        <div>
            Issue {params.issue}
            <div>
                <Link to="..">Back to issues</Link>
            </div>
        </div>
    )
}

function PullRequests() {
    return (
        <div>
            Pull requests
            <div>
                <Link to="2">Pull request 2</Link>
            </div>
        </div>
    )
}

function PullRequest() {
    const params = useParams() as { pullRequest: string }
    return (
        <div>
            Pull request {params.pullRequest}
            <div>
                <Link to="..">Back to pull requests</Link>
            </div>
        </div>
    )
}

const LazyRepo = React.lazy(() => import('./lib/Repo/Repo'))
const LazyRepoCode = React.lazy(() => import('./lib/Repo/RepoCode'))
const LazyFilterableIssues = React.lazy(
    () => import('./lib/Issues/FilterableIssues')
)

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
                                <Route path=":issue" element={<Issue />} />
                            </Route>
                            <Route path="pull-requests">
                                <Route path="/" element={<PullRequests />} />
                                <Route
                                    path=":pullRequest"
                                    element={<PullRequest />}
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
