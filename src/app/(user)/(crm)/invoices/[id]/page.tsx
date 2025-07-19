"use client"

import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { useParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import InvoiceAction from "../InvoiceAction";
import { TypographyH2, TypographyH3, TypographyH4, TypographyP, TypographySmall } from "@/components/ui/typography";
import InvoiceSlice from "@/cs-redux/slices/app/crm/invoice.slice";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import InvoiceStatus from "../InvoiceStatus";
import { CrmInvoiceStatus, getUnitLabel } from "@/constants/crm.constant";
import { formatDateToShortMonth } from "@/cs-toolkit/utils";
import { Check, Clock, ClockAlert } from "lucide-react";
import PaymentForm from "./PaymentForm";
import InvoiceTransactions from "./InvoiceTransactions";
import Container from "@/components/utils/Container";

export default function page() {
    const dispatch = useCsDispatch();
    const params = useParams();
    const id = params.id?.toString()!;

    const { invoice } = useCsSelector(state => state.invoice);
    const { client } = useCsSelector(state => state.client);
    const { project } = useCsSelector(state => state.project);

    useEffect(() => {
        dispatch(InvoiceThunk.getById({ id }))

        return () => {
            dispatch(InvoiceSlice.actions.clearInvoice({}))
        }
    }, [dispatch, id])

    // Fetch the Client of project
    useEffect(() => {
        if (invoice && (!client || client._id !== invoice?.clientId)) {
            dispatch(ClientThunk.getById({ id: invoice?.clientId }))
        }
        if (invoice && invoice.projectId && (!project || project._id !== invoice?.projectId)) {
            dispatch(ProjectThunk.getById({ id: invoice?.projectId }))
        }
    }, [client, dispatch, invoice, project])

    if (!invoice) {
        return (<></>)
    }

    return (
        <Container className="py-3">

            <div className="border rounded-lg px-3 py-5">
                <Suspense> <PaymentForm invoice={invoice} /></Suspense>
                <TypographyH2 className="flex items-center justify-between">
                    <span>
                        <span>{invoice?.title} <InvoiceStatus status={invoice.status} /></span>
                        <span className={`ms-2 border bg-accent/10 text-xs px-3 py-1 rounded-full text-center ${invoice.isSent && "bg-blue-500/5 border-blue-500/20 text-blue-500"}`}>{invoice.isSent ? "Sent" : "Not Sent"}</span>

                        {invoice?.isArchived && <span className="text-sm text-destructive ms-2"> (archived)</span>}
                    </span>
                    <InvoiceAction invoice={invoice} />
                </TypographyH2>

                <div className="mt-3 grid grid-cols-2">
                    <div>
                        <div className="mb-9 flex flex-col items-start">
                            <div className="flex flex-col items-center">
                                <TypographyP className=""><span className="font-bold me-1">Issued:</span> {formatDateToShortMonth(invoice.issuedDate)}</TypographyP>
                                <TypographyP className="flex items-center gap-1  rounded-full px-3 py-0.5 mt-1 bg-[#0861df] text-primary-foreground dark:text-primary">
                                    <span className="font-bold flex items-center gap-0.5"><Clock size={14} />Due:</span>
                                    <span>{formatDateToShortMonth(invoice.dueDate)}</span>
                                    {/* {(new Date(invoice.dueDate) < new Date() && invoice.status === CrmInvoiceStatus.SENT) &&
                                        <span className="font-bold text-[11px] text-destructive bg-accent rounded-full px-1.5">(OVERDUE)</span>
                                    } */}
                                </TypographyP>
                            </div>
                        </div>
                        <TypographyH4>Invoice for:</TypographyH4>
                        <TypographyP className="font-bold">{client?.name}</TypographyP>
                        <TypographyP className="text-muted-foreground">{client?.email}</TypographyP>
                        <TypographyP className="text-muted-foreground">{client?.phone}</TypographyP>
                    </div>
                    <div className="text-right">
                        <TypographyP className="mb-2.5"><span className="font-bold me-1">Invoice No:</span> <span>{invoice.invoiceNumber}</span></TypographyP>
                        <TypographyP className="font-bold text-[15px]">Total Amount</TypographyP>
                        <TypographyH3>{invoice.currency.symbol} {invoice.totalAmount} {invoice.currency.code}</TypographyH3>
                    </div>
                </div>


                <div className="mt-9">
                    <div className="grid grid-cols-7 px-3 py-3">
                        <TypographyP className="font-bold col-span-4" >Item & Description</TypographyP>
                        <TypographyP className="font-bold text-right" >Quantity</TypographyP>
                        <TypographyP className="font-bold text-right" >Price/unit</TypographyP>
                        <TypographyP className="font-bold text-right" >Amount ({invoice.currency.symbol})</TypographyP>
                    </div>
                    <div className="">
                        {invoice.items.map((item, i) => (
                            <div className="grid grid-cols-7 bg-accent/30 mb-3 rounded px-3 py-3" key={`invoice_item${i + 734856}`}>
                                <TypographyP className="col-span-4" >
                                    <span className="font-bold">{item.name}</span><br />
                                    <span className="text-muted-foreground text-[11px]">{item.description}</span>
                                </TypographyP>
                                <TypographyP className="text-right" >{item.quantity}</TypographyP>
                                <TypographyP className="text-right" >{invoice.currency.symbol} {item.basePrice} <span className="text-[11px] text-muted-foreground">{getUnitLabel(item.unit)}</span></TypographyP>
                                <TypographyP className="text-right" >{invoice.currency.symbol} {item.totalAmount}</TypographyP>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-xs ms-auto grid grid-cols-2 px-3">
                    <div className="text-right">
                        <TypographyP className="mb-1" >Subtotal:</TypographyP>
                        {invoice.discount > 0 && <TypographyP className="" >Discount:</TypographyP>}
                        <hr />
                        <TypographyP className="font-bold my-1.5" >TOTAL:</TypographyP>
                        <hr />
                        {invoice.amountPaid !== invoice.totalAmount && <div className="text-muted-foreground">
                            <TypographyP className="" >Paid:</TypographyP>
                            <TypographyP className="" >Due:</TypographyP>
                        </div>}
                    </div>
                    <div className="text-right">
                        <TypographyP className="mb-1" >{invoice.currency.symbol} {invoice.subtotal}</TypographyP>
                        {invoice.discount > 0 && <TypographyP className="" >- {invoice.currency.symbol} {invoice.discount}</TypographyP>}
                        <hr />
                        <TypographyP className="font-bold my-1.5" >{invoice.currency.symbol} {invoice.totalAmount}</TypographyP>
                        <hr />
                        {invoice.amountPaid !== invoice.totalAmount ? <div className="text-muted-foreground">
                            <TypographyP className="" >{invoice.currency.symbol} {invoice.amountPaid}</TypographyP>
                            <TypographyP className="font-bold" >{invoice.currency.symbol} {invoice.totalAmount - invoice.amountPaid}</TypographyP>
                        </div>
                            :
                            <TypographyP className="flex items-center justify-end gap-1 mt-1" ><Check size={17} />Paid</TypographyP>
                        }
                    </div>
                </div>


                {invoice.note && <div className="mt-7 px-3">
                    <TypographyP className="font-bold text-[16px] uppercase">Notes to Customer</TypographyP>
                    <TypographyP>{invoice.note}</TypographyP>
                </div>}
            </div>
            <InvoiceTransactions />
        </Container>
    )
}
