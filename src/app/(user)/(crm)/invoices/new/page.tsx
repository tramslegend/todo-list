import React, { Suspense } from 'react'
import NewInvoicePage from './NewInvoicePage'

export default function page() {
    return (
        <Suspense><NewInvoicePage /></Suspense>
    )
}
