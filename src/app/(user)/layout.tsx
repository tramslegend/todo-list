import UserRootLayout from '@/components/layouts/app/UserRootLayout';
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <UserRootLayout>{children}</UserRootLayout>
    )
}
