"use client"

import { CrmInvoiceStatus } from "@/constants/crm.constant";


export default function InvoiceStatus({ status }: { status: string }) {

    // const unpaidClass = 'bg-accent/10';      // Default, Not using
    const paidClass = 'bg-green-500/5 border-green-500/20 text-green-500';
    const partialClass = 'bg-cyan-500/5 border-cyan-500/20 text-cyan-500';

    return (

        <span className={`border bg-accent/10 text-xs px-3 py-1 rounded-full text-center font-semibold ${status === CrmInvoiceStatus.PAID && paidClass} ${status === CrmInvoiceStatus.PARTIAL && partialClass}`}>
            {status}
        </span>
    )
}