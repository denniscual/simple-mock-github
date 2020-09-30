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
import { RouteProgressbar, Loader, Text } from './components'
import {
    lazyHome,
    lazyRepo,
    lazyRepoCode,
    lazyRepoSubCode,
    lazyIssues,
    lazyIssue,
} from './lazyComponents'
import S from './stitches.config'

const AppLoaderContainer = S.styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translateX(-50%)',
})

const AppLoaderText = S.styled(Text, {
    color: '$dimGray',
    marginTop: '$2',
})

function AppLoader() {
    return (
        <AppLoaderContainer>
            <Loader size="sm" color="primary" />
            <AppLoaderText size="sm" fontWeight="light">
                Loading the app...
            </AppLoaderText>
        </AppLoaderContainer>
    )
}

// Search

// TODO: We gonna rename the Components. Check the preview video of the Remix by Ryan.
// TODO: On our issues search, we can use the search query for doing search. Just use the useSearch hook of the react-router-dom which will trigger re-render. And also we can also use this into our search.
// TODO: On the api, we need to handle the error. Check the error boundary
// TODO: We need to handle the fetch error in api.
// FIXME: Create a generic type for the Params. Add the ownder and repo as required then other which are not(optional)
// TODO: Remove our auth.

// Lazy loaded Components
const LazyHome = lazyHome.lazy()
const LazyRepo = lazyRepo.lazy()
const LazyRepoCode = lazyRepoCode.lazy()
const LazyRepoSubCode = lazyRepoSubCode.lazy()
const LazyIssues = lazyIssues.lazy()
const LazyIssue = lazyIssue.lazy()

// preload the home.
lazyHome.preload()

export default function App() {
    return (
        <div>
            <RouteProgressbar />
            <React.Suspense fallback={<AppLoader />}>
                <Routes>
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
                </Routes>
            </React.Suspense>
        </div>
    )
}
