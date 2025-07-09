"use client"

import { CrmInvoiceStatus } from "@/constants/crm.constant";
import { useEffect, useState } from "react";

import { IInvoiceModel } from "@/types/crm/invoice.type";

export default function InvoiceStatus({ invoice }: { invoice: IInvoiceModel }) {

    const [color, setColor] = useState<string>('')

    useEffect(() => {
        switch (invoice.status) {
            case CrmInvoiceStatus.SENT:
                setColor('bg-cyan-500/5 border-cyan-500/20 text-cyan-500')
                break;
            case CrmInvoiceStatus.PARTIAL:
                setColor('bg-blue-500/5 border-blue-500/20 text-blue-500')
                break;
            case CrmInvoiceStatus.PAID:
                setColor('bg-green-500/5 border-green-500/20 text-green-500')
                break;
            case CrmInvoiceStatus.CANCELLED:
                setColor('bg-red-500/5 border-red-500/20 text-red-500')
                break;
            default:
                setColor('bg-accent/10')
                break;
        }
    }, [invoice.status])



    return (

        <span className={`border  text-xs px-3 py-1 rounded-full text-center cursor-pointer font-semibold ${color}`}>
            {invoice.status}
        </span>
    )
}