import React from 'react'
import { RouteProgressbar, Loader, Text, Button } from './components'
import S from './stitches.config'
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import {
    ReactQueryConfigProvider,
    ReactQueryErrorResetBoundary,
} from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Frown } from 'react-feather'

// TODO: Wrap the Issues on its own React.Suspense so that on "Receded" it will not hide the header.

// TODO: We gonna rename the Components. Check the preview video of the Remix by Ryan.
// TODO: On the api, we need to handle the error. Check the error boundary
// TODO: We need to handle the fetch error in api.
// FIXME: Create a generic type for the Params. Add the ownder and repo as required then other which are not(optional)
// TODO: Remove our auth.

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

/**
 * ------------ Error boundary -----------
 * */

const ErrorMainContainer = S.styled('main', {
    backgroundColor: '$lightGray',
    minHeight: '100vh',
})

const ErrorInnerContainer = S.styled('div', {
    margin: '0 auto',
    paddingTop: '11%',
    width: 400,
    textAlign: 'center',
})

const ErrorText = S.styled(Text, {
    color: '$dimGray',
    margin: '$2 0 $6',
})

// This is for query to support React CM
const queryConfig = {
    shared: {
        suspense: true,
        refetchOnWindowFocus: false,
    },
}

export default function App() {
    return (
        <>
            <ReactQueryConfigProvider config={queryConfig}>
                <Router>
                    <RouteProgressbar />
                    <ReactQueryErrorResetBoundary>
                        {({ reset }) => (
                            <ErrorBoundary
                                onReset={reset}
                                fallbackRender={({ resetErrorBoundary }) => (
                                    <ErrorMainContainer>
                                        <ErrorInnerContainer>
                                            <Frown color="#959da5" size={50} />
                                            <ErrorText>
                                                There was an error on loading
                                                the app
                                            </ErrorText>
                                            <Button
                                                color="accent"
                                                onClick={() =>
                                                    resetErrorBoundary()
                                                }
                                            >
                                                Try again
                                            </Button>
                                        </ErrorInnerContainer>
                                    </ErrorMainContainer>
                                )}
                            >
                                <React.Suspense fallback={<AppLoader />}>
                                    <div>
                                        <Routes />
                                    </div>
                                </React.Suspense>
                            </ErrorBoundary>
                        )}
                    </ReactQueryErrorResetBoundary>
                </Router>
            </ReactQueryConfigProvider>
        </>
    )
}
