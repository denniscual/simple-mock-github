import React from 'react'
import { RouteProgressbar, Loader, Text, Button, ErrorInfo } from './components'
import S from './stitches.config'
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import {
    ReactQueryConfigProvider,
    ReactQueryErrorResetBoundary,
} from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'

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
                                    <ErrorInfo
                                        description="There was an error when loading
                                                the app"
                                    >
                                        <Button
                                            color="accent"
                                            onClick={() => resetErrorBoundary()}
                                        >
                                            Try again
                                        </Button>
                                    </ErrorInfo>
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
