'use client'

import { TypographyH3, TypographyP } from '@/components/ui/typography'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { DashboardAction } from '@/cs-redux/thunks/app/crm/dashboard.action'
import { DEFAULT_CURRENCY } from '@/root.config'
import { BriefcaseBusiness, ScrollText, TrendingUp, Users } from 'lucide-react'
import React from 'react'

export default function DashboardCards() {
    const dispatch = useCsDispatch();
    const { cardData } = useCsSelector(state => state.dashboard);


    React.useEffect(() => {
        dispatch(DashboardAction.getCardsData())
    }, [dispatch])
    const cardClass = 'w-full h-full rounded border bg-gradient-to-tr from-accent/50 to-accent px-7 py-5'
    return (
        <div className='grid grid-cols-4 gap-3 h-28 '>
            <div className={cardClass}>
                <TypographyP className='text-muted-foreground flex items-center gap-1'><TrendingUp size={15} />Revenue</TypographyP>
                <TypographyH3 className='mt-2'>{DEFAULT_CURRENCY.symbol} {cardData?.revenue ? cardData?.revenue : 0}</TypographyH3>
            </div>
            <div className={cardClass}>
                <TypographyP className='text-muted-foreground flex items-center gap-1'><Users size={15} />Clients</TypographyP>
                <TypographyH3 className='mt-2'>{cardData?.clients ? cardData?.clients : 0}</TypographyH3>
            </div>
            <div className={cardClass}>
                <TypographyP className='text-muted-foreground flex items-center gap-1'><ScrollText size={15} />Invoices</TypographyP>
                <TypographyH3 className='mt-2'>{cardData?.invoices ? cardData?.invoices : 0}</TypographyH3>
            </div>
            <div className={cardClass}>
                <TypographyP className='text-muted-foreground flex items-center gap-1'><BriefcaseBusiness size={15} />Projects</TypographyP>
                <TypographyH3 className='mt-2'>{cardData?.projects ? cardData?.projects : 0}</TypographyH3>
            </div>


        </div>
    )
}
