import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Docs from './Docs'
import { Home } from './pages'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="docs" element={<Docs />} />
            </Route>
        </Routes>
    )
}
