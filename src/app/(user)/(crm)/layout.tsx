import CrmLayout from '@/components/layouts/app/CrmLayout';
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <CrmLayout>{children}</CrmLayout>
    )
}
