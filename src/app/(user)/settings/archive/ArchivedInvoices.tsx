'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk"
import { ArchiveRestore, Check, LoaderIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import InvoiceSlice from "@/cs-redux/slices/app/crm/invoice.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import InvoiceStatus from "../../(crm)/invoices/InvoiceStatus"
import { CsUtils } from "@/cs-toolkit"
import { toast } from "sonner"


export default function ArchivedInvoices({ query }: { query: string }) {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allArchivedInvoice, loading } = useCsSelector(state => state.invoice);


    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(InvoiceSlice.actions.clearAllArchivedInvoice({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(InvoiceThunk.getAllArchived({ page, limit, query }))
    }, [dispatch, limit, query, page])

    async function onRestore(id: string) {
        const { payload } = await dispatch(InvoiceThunk.restore({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    return (
        <div>
            {allArchivedInvoice ?
                allArchivedInvoice?.pagination.totalData > 0 ?
                    <>
                        <div className="grid grid-cols-1  border rounded bg-accent/10">
                            {allArchivedInvoice.data.map((invoice, i) => (
                                <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all gap-5 flex items-center justify-between ${i !== allArchivedInvoice.data.length - 1 && "border-b"}`} key={`invoice_${i + 8437593}`}>
                                    <Link href={`/invoices/${invoice._id}`} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                        <div className=" col-span-3 overflow-hidden">
                                            <TypographyP className="font-bold">{invoice.invoiceNumber}</TypographyP>
                                            <TypographyP className="text-muted-foreground">{invoice.title}</TypographyP>
                                        </div>
                                        <div className=" col-span-4">
                                            <TypographyP className="">Issued: <span className="text-muted-foreground ms-5">{CsUtils.formatDateToShortMonth(invoice.issuedDate)}</span></TypographyP>
                                            <TypographyP className="">Due Date: <span className="text-muted-foreground ">{CsUtils.formatDateToShortMonth(invoice.dueDate)}</span></TypographyP>
                                            {/* {(new Date(invoice.dueDate) < new Date() && (invoice.status === CrmInvoiceStatus.SENT)) &&
                                                                                            <span className="font-bold text-[11px] text-destructive bg-accent rounded-full px-1.5">(OVERDUE)</span>
                                                                                        } */}
                                        </div>
                                        <div className=" col-span-1 flex items-center  justify-center">
                                            <InvoiceStatus status={invoice.status} />
                                        </div>
                                        <div className=" col-span-1 flex items-center justify-center">
                                            <TypographyP className={`border bg-accent/10 text-xs px-3 py-1 rounded-full text-center ${invoice.isSent && "bg-blue-500/5 border-blue-500/20 text-blue-500"}`}>{invoice.isSent ? "Sent" : "Draft"}</TypographyP>
                                        </div>
                                        <div className=" col-span-3">
                                            <TypographyP className="font-bold text-right">{invoice.currency.symbol} {invoice.totalAmount}</TypographyP>
                                            {
                                                invoice.totalAmount - invoice.amountPaid > 0 ?
                                                    <TypographyP className="text-right text-muted-foreground text-[12px]">Due: {invoice.currency.symbol} {invoice.totalAmount - invoice.amountPaid}</TypographyP>
                                                    :
                                                    <TypographyP className="text-right text-muted-foreground text-[12px] flex items-center justify-end gap-1"><Check color='green' strokeWidth={3} size={15} /> Paid </TypographyP>
                                            }
                                        </div>
                                    </Link>
                                    <div>
                                        <Button onClick={() => onRestore(invoice._id)} variant={'destructive'} size={'icon'}><ArchiveRestore /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(allArchivedInvoice?.pagination.currentPage !== allArchivedInvoice?.pagination.totalPages && allArchivedInvoice?.pagination.totalPages > 0) &&
                            <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                            </Button>
                        }
                    </>
                    :
                    <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No invoices found." : "No Archived invoices"}</TypographyP>
                :
                <SpinLoaderCard />
            }
        </div>
    )
}
