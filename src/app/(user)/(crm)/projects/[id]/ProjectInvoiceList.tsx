"use client"

import { TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import Link from "next/link";
import InvoiceStatus from "../../invoices/ProjectStatus";
import { CsUtils } from "@/cs-toolkit";



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
            <div className="grid grid-cols-6 gap-3 px-3">
                <TypographyP className="font-bold mb-2 col-span-2">Invoice</TypographyP>
                <TypographyP className="font-bold mb-2">Status</TypographyP>
                <TypographyP className="font-bold mb-2">Issue Date</TypographyP>
                <TypographyP className="font-bold mb-2">Due Date</TypographyP>
                <TypographyP className="font-bold mb-2 text-right">Total Amount</TypographyP>
            </div>

            {projectInvoices?.map((invoice, i) => (
                <Link className="" href={`/invoices/${invoice._id}`} key={`c_proj_${14875 + i}`}>
                    <div className="bg-accent/10 hover:bg-accent/20 relative rounded-lg px-3 py-5 mb-5 " >

                        <div className="grid grid-cols-6 gap-3 ">
                            <div className="col-span-2">
                                <TypographyP className="font-bold">{invoice.title}</TypographyP>
                            </div>
                            <div className="">
                                <InvoiceStatus invoice={invoice} />
                            </div>


                            <div className="">
                                <TypographyP className="">{CsUtils.formatDateToShortMonth(invoice?.issuedDate!)}</TypographyP>
                            </div>
                            <div className="">
                                <TypographyP className="">{CsUtils.formatDateToShortMonth(invoice?.dueDate!)}</TypographyP>
                            </div>
                            <div className="text-right">
                                <TypographyP className="font-bold text-lg">{invoice.currency.symbol} {invoice.totalAmount}</TypographyP>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
