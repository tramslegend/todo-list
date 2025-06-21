import UserSettingsLayout from '@/components/layouts/app/UserSettingsLayout';
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <UserSettingsLayout>{children}</UserSettingsLayout>
    )
}
