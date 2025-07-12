"use client"

import { TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import Link from "next/link";
import InvoiceStatus from "../../invoices/InvoiceStatus";
import { CsUtils } from "@/cs-toolkit";
import InvoiceList from "../../invoices/InvoiceList";



export default function ProjectInvoiceList() {
    const dispatch = useCsDispatch();
    const params = useParams();
    const { projectInvoices } = useCsSelector(state => state.invoice);

    useEffect(() => {
        dispatch(InvoiceThunk.getByProjectId({ projectId: params.id?.toString()! }))
    }, [dispatch, params.id])

    if (!projectInvoices || projectInvoices.length == 0) {
        return (<TypographyP className="text-muted-foreground text-center mt-3">No Invoice</TypographyP>)
    }

    return (
        <div className="mt-5">
            <InvoiceList data={projectInvoices} />
        </div>
    )
}
