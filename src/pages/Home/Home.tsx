import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeHeader from './HomeHeader'

export default function Home() {
    return (
        <div>
            <HomeHeader />
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    )
}
