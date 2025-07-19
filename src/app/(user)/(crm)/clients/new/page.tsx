import React, { Suspense } from 'react'
import NewClientPage from './NewClientPage'

export default function page() {
    return (
        <Suspense>
            <NewClientPage />
        </Suspense>
    )
}
