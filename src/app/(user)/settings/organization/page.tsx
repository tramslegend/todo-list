import React from 'react'
import OrgDetails from './OrgDetails'
import OrgDefaultCurrency from './OrgDefaultCurrency'
import OrgFooterText from './OrgFooterText'

export default function page() {
    return (
        <div className='space-y-9 pb-20'>
            <OrgDetails />
            <OrgDefaultCurrency />
            <OrgFooterText />
        </div>
    )
}
