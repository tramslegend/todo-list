import React, { Suspense } from 'react'
import ArchivePage from './ArchivePage'

export default function page() {
    return (
        <Suspense><ArchivePage /></Suspense>
    )
}
