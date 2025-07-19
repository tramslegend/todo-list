"use client"

import { TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import InvoiceList from "../../invoices/InvoiceList";



export default function ClientInvoiceList() {
    const dispatch = useCsDispatch();
    const params = useParams();
    const { clientInvoices } = useCsSelector(state => state.invoice);

    useEffect(() => {
        dispatch(InvoiceThunk.getByClientId({ clientId: params.id?.toString()! }))
    }, [dispatch, params.id])

    if (!clientInvoices || clientInvoices.length == 0) {
        return (<TypographyP className="text-muted-foreground text-center mt-3">No Invoice</TypographyP>)
    }

    return (
        <div className="mt-5">
            <InvoiceList data={clientInvoices} />
        </div>
    )
}
