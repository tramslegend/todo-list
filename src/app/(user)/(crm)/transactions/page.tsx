'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { TransactionThunk } from "@/cs-redux/thunks/app/crm/transaction.thunk"
import { LoaderIcon, Plus, SquareMenu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import TransactionAction from "./TransactionAction"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import TransactionSlice from "@/cs-redux/slices/app/crm/transaction.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import TransactionDetails from "./TransactionDetails"
import { ITransactionModel } from "@/types/crm/transaction.type"
import { CsUtils } from "@/cs-toolkit"
import TransactionList from "./TransactionList"


export default function TransactionsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allTransaction, loading } = useCsSelector(state => state.transaction);

    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(TransactionSlice.actions.clearAllTransaction({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(TransactionThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, query, page])


    return (
        <section>
            <MainPageHeader title="Transactions" setQuery={setQuery}>
                {/* <Button size={'icon'} variant={'outline'}><Plus /></Button> */}
            </MainPageHeader>

            <Container className="pb-20">
                {allTransaction ?
                    allTransaction?.pagination.totalData > 0 ?
                        <>
                            <TransactionList data={allTransaction.data} />

                            {(allTransaction?.pagination.currentPage !== allTransaction?.pagination.totalPages && allTransaction?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No transactions found." : "You don't have any transactions yet."}</TypographyP>
                    :
                    <SpinLoaderCard />
                }

                {/* DEBUG */}
                {/* <pre>{JSON.stringify(allTransaction?.pagination)}</pre> */}
            </Container>


        </section>
    )
}



