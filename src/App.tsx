import React from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Docs from './Docs'
import Home from './lib/Home'
import { Repo, RepoCode } from './lib/Repo'
import { FilterableIssues } from './lib/Issues'
import {
    prefetchRepo,
    prefetchRepoREADME,
    prefetchRepoContributors,
    prefetchRepoIssues,
} from './api'

// TODO: Wrap to lazy wrapper fn.
// TODO: We need to put the theme color to a theme module so that we
// can reference the theme color insid the Component not only on the styled.

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

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path=":owner">
                        <Route
                            path=":repo"
                            element={<Repo />}
                            preload={prefetchRepo}
                        >
                            <Route
                                path="/"
                                element={<RepoCode />}
                                preload={(...args) => {
                                    prefetchRepoREADME(...args)
                                    prefetchRepoContributors(...args)
                                }}
                            />
                            <Route path="issues">
                                <Route
                                    path="/"
                                    element={<FilterableIssues />}
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
