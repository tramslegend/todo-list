import EmptyList from '@/components/utils/EmptyList'
import NotAvailable from '@/components/utils/NotAvailable'
import React from 'react'

export default function UserBillingPage() {
    return (
        <div>
            <EmptyList title="No Billing Info" subtitle="Currently You don't have billing information." />
        </div>
    )
}
