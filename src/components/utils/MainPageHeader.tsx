import React from 'react'
import { TypographyH3 } from '../ui/typography';

export default function MainPageHeader({ children, title }: { children?: React.ReactNode; title?: string }) {
    return (
        <div className='flex items-center justify-between py-2 mb-2 bg-accent/60 backdrop-blur-lg px-3 h-14 sticky top-12 z-50'>
            <TypographyH3>{title}</TypographyH3>
            <div>{children}</div>
        </div>
    )
}
