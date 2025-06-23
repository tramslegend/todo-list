import React from 'react'
import UserAvatar from './UserAvatar'
import DisplayName from './DisplayName'
import DeleteAccount from './DeleteAccount'
import Email from './Email'

export default function AccountSettingsPage() {
    return (
        <div className='space-y-9 pb-10'>
            <UserAvatar />
            <DisplayName />
            <Email />
            <DeleteAccount />
        </div>
    )
}
