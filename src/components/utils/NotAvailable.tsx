import React from 'react'
import { TypographyH4, TypographyP } from '../ui/typography'

export default function NotAvailable() {
    return (
        <div>
            <TypographyH4 className='text-muted-foreground mb-1'>⚠️ Coming Soon...!</TypographyH4>
            <hr />
            <TypographyP className='text-muted-foreground mt-3'>This feature is not available for current version. We are working hard to make this feature available to you as soon as possible.</TypographyP>
        </div>
    )
}
