import React from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Docs from './Docs'
import { Home, Repo } from './pages'
import { useQuery, queryCache } from 'react-query'
import { getRepo, getRepoREADME } from './api'

function prefetchRepo() {
    queryCache.prefetchQuery(getRepo.key, getRepo)
}

function prefetchRepoREADME() {
    queryCache.prefetchQuery(getRepoREADME.key, getRepoREADME)
}

function Code() {
    const res = useQuery(getRepoREADME.key, getRepoREADME)
    console.log({ res })

    return <div>Code</div>
}

function Issues() {
    return (
        <div>
            Issues
            <div>
                <Link to="1">Issue 123</Link>
            </div>
        </div>
    )
}

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
                    <Route path="repos">
                        <Route
                            path=":repo"
                            element={<Repo />}
                            preload={prefetchRepo}
                        >
                            <Route
                                path="/"
                                element={<Code />}
                                preload={prefetchRepoREADME}
                            />
                            <Route path="issues">
                                <Route path="/" element={<Issues />} />
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
