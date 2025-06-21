import React from 'react'
import { Skeleton } from '../../ui/skeleton';

export default function AdminSettingsHeader({ children, title, loading = false }: Readonly<{ children?: React.ReactNode; title?: string; loading?: boolean }>) {
    return (
        <div className='z-50 sticky top-16 backdrop-blur px-3 py-2 h-12 bg-secondary/80 flex items-center justify-between'>
            <h3 className='text-xl'>{title}</h3>
            <div className='flex items-center gap-3'>
                {
                    loading ?
                        <>
                            <Skeleton className="h-8 border w-8 rounded" />
                            <Skeleton className="h-8 border w-8 rounded" />
                            <Skeleton className="h-8 border w-8 rounded" />
                        </>
                        :
                        <>{children}</>
                }
            </div>
        </div>
    )
}
