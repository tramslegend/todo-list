import Container from '@/components/utils/Container'
import React from 'react'
import DashboardCards from './DashboardCards'
import EarningChart from './EarningChart'
import RecentInvoices from './RecentInvoices'

export default function CrmDashboardPage() {
    return (
        <Container className='pt-10 pb-24 space-y-10 min-h-svh'>
            <DashboardCards />
            <EarningChart />
            <RecentInvoices />
        </Container>
    )
}
