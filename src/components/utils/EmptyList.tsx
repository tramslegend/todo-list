import React from 'react'
import { TypographyH4, TypographyP } from '../ui/typography';
import { TextSearch } from 'lucide-react';

export default function EmptyList({ title, subtitle, notFoundSubtitle, query }: { title?: string; subtitle?: string; notFoundSubtitle?: string; query?: boolean; }) {
    return (
        <div className='grid place-items-center w-full pt-32'>
            <div className='border rounded-lg w-sm flex flex-col items-center justify-center aspect-video '>
                <TextSearch />
                <TypographyH4 className='mt-3'>{title}</TypographyH4>
                <TypographyP className='text-muted-foreground'>{(notFoundSubtitle && query) ? notFoundSubtitle : subtitle}</TypographyP>
            </div>
        </div>
    )
}
