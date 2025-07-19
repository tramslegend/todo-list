import React, { Suspense } from 'react'
import NewProjectPage from './NewProjectPage'

export default function page() {
    return (
        <Suspense><NewProjectPage /></Suspense>
    )
}
