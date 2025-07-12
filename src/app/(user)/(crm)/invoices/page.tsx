'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk"
import { IInvoiceModel } from "@/types/crm/invoice.type"
import { LoaderIcon, Plus, SquareMenu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import InvoiceAction from "./InvoiceAction"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import InvoiceSlice from "@/cs-redux/slices/app/crm/invoice.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoader from "@/components/utils/SpinLoader"
import Link from "next/link"
import { CsUtils } from "@/cs-toolkit"
import InvoiceStatus from "./ProjectStatus"
import { CrmInvoiceStatus } from "@/constants/crm.constant"


export default function InvoicesPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allInvoice, loading } = useCsSelector(state => state.invoice);


    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(InvoiceSlice.actions.clearAllInvoice({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(InvoiceThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, query, page])


    return (
        <section>
            <MainPageHeader title="Invoices" setQuery={setQuery}>
                <Button size={'icon'} variant={'outline'}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allInvoice ?
                    allInvoice?.pagination.totalData > 0 ?
                        <>
                            <div className="grid grid-cols-1  border rounded bg-accent/10">
                                {allInvoice.data.map((invoice: IInvoiceModel, i: number) => (
                                    <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all gap-3 flex items-center justify-between ${i !== allInvoice.data.length - 1 && "border-b"}`} key={`invoice_${i + 8437593}`}>
                                        <Link href={`/invoices/${invoice._id}`} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                            <div className=" col-span-3 overflow-hidden">
                                                <TypographyP className="font-bold">{invoice.title}</TypographyP>
                                            </div>
                                            <div className=" col-span-3">
                                                <TypographyP className="">Issued: <span className="text-muted-foreground ms-5">{CsUtils.formatDateToShortMonth(invoice.issuedDate)}</span></TypographyP>
                                                <TypographyP className="">Due Date: <span className="text-muted-foreground ">{CsUtils.formatDateToShortMonth(invoice.dueDate)}</span></TypographyP>
                                                {(new Date(invoice.dueDate) < new Date() && (invoice.status === CrmInvoiceStatus.SENT)) &&
                                                    <span className="font-bold text-[11px] text-destructive bg-accent rounded-full px-1.5">(OVERDUE)</span>
                                                }
                                            </div>
                                            <div className=" col-span-3 flex items-center">
                                                <InvoiceStatus invoice={invoice} />
                                            </div>
                                            <div className=" col-span-3">
                                                <TypographyP className="font-bold text-right">{invoice.currency.symbol} {invoice.totalAmount}</TypographyP>
                                                {
                                                    invoice.totalAmount - invoice.amountPaid > 0 &&
                                                    <TypographyP className="text-right text-muted-foreground text-[12px]">Due: {invoice.currency.symbol} {invoice.totalAmount - invoice.amountPaid}</TypographyP>

                                                }
                                            </div>
                                        </Link>

                                        <div>
                                            {/* <Button variant={'ghost'} onClick={() => { router.push(`/invoices/${invoice._id}`) }}><SquareMenu /></Button> */}
                                            <InvoiceAction invoice={invoice} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(allInvoice?.pagination.currentPage !== allInvoice?.pagination.totalPages && allInvoice?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No invoices found." : "You haven’t added any invoices yet."}</TypographyP>
                    :
                    <SpinLoader />
                }

                {/* DEBUG */}
                {/* <pre>{JSON.stringify(allInvoice?.pagination)}</pre> */}
            </Container>
        </section>
    )
}

