import React from 'react'
import { Routes as RootRoutes, Route } from 'react-router-dom'
import {
    RoutePreloadFunction,
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
import lazyNotFound from './lib/NotFound'

export default function Routes() {
    return (
        <RootRoutes>
            <Route path="/" element={<LazyHome />} preload={homePreload}>
                <Route path=":owner">
                    <Route
                        path=":repo"
                        element={<LazyRepo />}
                        preload={repoPreload}
                    >
                        <Route path="/code">
                            {/* Render this page on this path => /code or /code/ */}
                            <Route
                                path="/"
                                element={<LazyRepoCode />}
                                preload={repoCodeIndexPreload}
                            />
                            {/* Render this page on this path => /code/* */}
                            <Route
                                path="/*"
                                element={<LazyRepoSubCode />}
                                preload={repoSubcodePreload}
                            />
                        </Route>
                        <Route path="issues">
                            <Route
                                path="/"
                                element={<LazyIssues />}
                                preload={issuesPreload}
                            />
                            <Route
                                path=":issueNumber"
                                element={<LazyIssue />}
                                preload={issuePreload}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route
                path="*"
                element={<LazyNotFound />}
                preload={notFoundPreload}
            />
        </RootRoutes>
    )
}

/**
 * ------------ Lazy loaded Components -----------
 * */
const LazyHome = lazyHome.lazy()
const LazyRepo = lazyRepo.lazy()
const LazyRepoCode = lazyRepoCode.lazy()
const LazyRepoSubCode = lazyRepoSubCode.lazy()
const LazyIssues = lazyIssues.lazy()
const LazyIssue = lazyIssue.lazy()
const LazyNotFound = lazyNotFound.lazy()

/**
 * ------------ Preload functions for routes -----------
 * */
const homePreload = () => {
    lazyHome.preload()
}
const repoPreload: RoutePreloadFunction = (...args) => {
    prefetchRepo(...args)

    lazyRepo.preload()
}
const repoCodeIndexPreload: RoutePreloadFunction = (...args) => {
    prefetchRepoContent(...args)
    prefetchRepoContributors(...args)
    prefetchRepoREADME(...args)
    prefetchRepoIssues(...args)

    lazyRepoCode.preload()
    lazyIssues.preload()
}
const repoSubcodePreload: RoutePreloadFunction = (...args) => {
    prefetchRepoContent(...args)

    lazyRepoSubCode.preload()
}
const issuesPreload: RoutePreloadFunction = (...args) => {
    prefetchRepoIssues(...args)

    lazyIssues.preload()
    lazyIssue.preload()
}
const issuePreload: RoutePreloadFunction = (...args) => {
    prefetchRepoIssue(...args)

    lazyIssue.preload()
}
const notFoundPreload = () => {
    lazyNotFound.preload()
}
