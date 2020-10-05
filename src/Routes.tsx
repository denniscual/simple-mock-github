import React from 'react'
import { Routes as RootRoutes, Route } from 'react-router-dom'
import {
    prefetchRepo,
    prefetchRepoContributors,
    prefetchRepoIssues,
    prefetchRepoIssue,
    prefetchRepoContent,
    prefetchRepoREADME,
} from './api'
import lazyHome from './lib/Home'
import { lazyRepo, lazyRepoCode, lazyRepoSubCode } from './lib/Repo'
import lazyIssues from './lib/Issues'
import lazyIssue from './lib/Issue'

// Lazy loaded Components
const LazyHome = lazyHome.lazy()
const LazyRepo = lazyRepo.lazy()
const LazyRepoCode = lazyRepoCode.lazy()
const LazyRepoSubCode = lazyRepoSubCode.lazy()
const LazyIssues = lazyIssues.lazy()
const LazyIssue = lazyIssue.lazy()

// preload the home.
lazyHome.preload()

export default function Routes() {
    return (
        <RootRoutes>
            <Route path="/" element={<LazyHome />}>
                <Route path=":owner">
                    <Route
                        path=":repo"
                        element={<LazyRepo />}
                        preload={(...args) => {
                            // prefetch data
                            prefetchRepo(...args)

                            // prefetch codes
                            lazyRepo.preload()
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
                                    lazyRepoCode.preload()
                                    lazyIssues.preload()
                                }}
                            />
                            {/* Render this page on this path => /code/* */}
                            <Route
                                path="/*"
                                element={<LazyRepoSubCode />}
                                preload={(...args) => {
                                    // for data
                                    prefetchRepoContent(...args)

                                    // for codes
                                    lazyRepoSubCode.preload()
                                }}
                            />
                        </Route>
                        <Route path="issues">
                            <Route
                                path="/"
                                element={<LazyIssues />}
                                preload={(...args) => {
                                    // for data
                                    prefetchRepoIssues(...args)

                                    // for codes
                                    lazyIssues.preload()
                                    lazyIssue.preload()
                                }}
                            />
                            <Route
                                path=":issueNumber"
                                element={<LazyIssue />}
                                preload={(...args) => {
                                    // for data
                                    prefetchRepoIssue(...args)

                                    // for codes
                                    lazyIssue.preload()
                                }}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </RootRoutes>
    )
}
