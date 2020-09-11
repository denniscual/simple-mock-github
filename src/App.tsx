import React from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import Docs from './Docs'
import { Home, Repo } from './pages'

// TODO:
// - create first a Chip component. Check mui. First we only support just label, no events!
//   Then use this one as alternative to button like collaborator because this is more appropiate.
//   Chip styles is kinda the same on Button. Some variants. We can copy or re-use. So it depends on us
//   what we gonna take. Its ok that there is duplication. At the end of the day this is normal, this is
//   is basically a progress for us something like more embracing duplication than not good abstraction.
//   We are great and this is great and this is under control and fuck them sorry and we thank you!!!!! Amen :)
// - Finalise the code tab page.
// - create an issues and issue page. Maybe connect now to server???

function Code() {
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
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="repos">
                    <Route path=":repo" element={<Repo />}>
                        <Route path="/" element={<Code />} />
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
    )
}
