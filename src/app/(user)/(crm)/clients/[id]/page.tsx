import React, { Suspense } from 'react'
import ClientDetailsPage from './ClientDetailsPage'

export default function page() {
    return (
        <Suspense><ClientDetailsPage /></Suspense>
    )
}
