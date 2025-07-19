"use client"

import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { useEffect } from "react";
import InvoiceList from "../invoices/InvoiceList";
import { TypographyH3 } from "@/components/ui/typography";

export default function RecentInvoices() {
    const dispatch = useCsDispatch();
    const { allInvoice, loading } = useCsSelector(state => state.invoice);


    // Fetch Data
    useEffect(() => {
        if (!allInvoice?.data.length) {
            dispatch(InvoiceThunk.getAll({ page: 1, limit: 10, query: '' }))
        }
    }, [allInvoice?.data.length, dispatch])
    return (
        <>
            {(allInvoice && allInvoice?.data.length !== 0) &&
                <div className="">
                    <TypographyH3 className="mb-3">Recent Invoices</TypographyH3>

                    <InvoiceList data={allInvoice?.data.slice(0, 10)!} />
                </div>}
        </>
    )
}
