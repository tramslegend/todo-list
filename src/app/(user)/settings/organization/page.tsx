import React from 'react'
import OrgDetails from './OrgDetails'
import OrgDefaultCurrency from './OrgDefaultCurrency'
import OrgFooterText from './OrgFooterText'
import OrgTaxId from './OrgTaxId'
import OrgEmail from './OrgEmail'

export default function page() {
    return (
        <div className='space-y-9 pb-20'>
            <OrgDetails />
            <OrgFooterText />
            <OrgDefaultCurrency />
            <OrgTaxId />
            <OrgEmail />
        </div>
    )
}
