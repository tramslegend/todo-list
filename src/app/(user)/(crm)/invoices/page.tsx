'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk"
import { IInvoiceModel } from "@/types/crm/invoice.type"
import { LoaderIcon, Plus } from "lucide-react"
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
import InvoiceStatus from "./InvoiceStatus"
import InvoiceList from "./InvoiceList"


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
                <Button size={'icon'} variant={'outline'} onClick={() => router.push(`/invoices/new`)}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allInvoice ?
                    allInvoice?.pagination.totalData > 0 ?
                        <>
                            <InvoiceList data={allInvoice.data} />

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

