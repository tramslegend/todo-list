import EmptyList from '@/components/utils/EmptyList'
import NotAvailable from '@/components/utils/NotAvailable'
import React from 'react'

export default function UserInvoicesPage() {
    return (
        <div>
            <EmptyList title="No Invoices" subtitle="You currently don't have any invoices." />
        </div>
    )
}
