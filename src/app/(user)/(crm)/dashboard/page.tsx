import Container from '@/components/utils/Container'
import React from 'react'
import DashboardCards from './DashboardCards'
import EarningChart from './EarningChart'

export default function CrmDashboardPage() {
    return (
        <Container className='py-5 space-y-5'>
            <DashboardCards />
            <EarningChart />
        </Container>
    )
}
