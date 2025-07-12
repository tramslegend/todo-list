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
import SpinLoader from "@/components/utils/SpinLoader"
import Link from "next/link"
import TransactionDetails from "./TransactionDetails"
import { ITransactionModel } from "@/types/crm/transaction.type"


export default function TransactionsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allTransaction, loading } = useCsSelector(state => state.transaction);
    const [flaggedTransaction, setFlaggedTransaction] = useState<ITransactionModel | null>(null);

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
                <Button size={'icon'} variant={'outline'}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allTransaction ?
                    allTransaction?.pagination.totalData > 0 ?
                        <>
                            <div className="grid grid-cols-1  border rounded bg-accent/10">
                                {allTransaction.data.map((transaction: ITransactionModel, i: number) => (
                                    <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all flex items-center justify-between ${i !== allTransaction.data.length - 1 && "border-b"}`} key={`transaction_${i + 8437593}`}>
                                        <div onClick={() => setFlaggedTransaction(transaction)} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                            <div className=" col-span-3">
                                                <TypographyP className="font-bold">{transaction.invoiceNumber}</TypographyP>
                                            </div>
                                            <div className="flex items-center col-span-3">
                                                <TypographyP className="">{transaction.amount}</TypographyP>
                                            </div>
                                            {/*<div className="flex items-center col-span-2">
                                                <TypographyP className="">{transaction.name}</TypographyP>
                                            </div>
                                            <div className="flex items-center col-span-4 overflow-hidden">
                                                <TypographyP className="">{transaction.name}</TypographyP>
                                            </div> */}
                                        </div>

                                        <div>
                                            {/* <Button variant={'ghost'} onClick={() => { router.push(`/transactions/${transaction._id}`) }}><SquareMenu /></Button> */}
                                            <TransactionAction transaction={transaction} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(allTransaction?.pagination.currentPage !== allTransaction?.pagination.totalPages && allTransaction?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No transactions found." : "You haven’t added any transactions yet."}</TypographyP>
                    :
                    <SpinLoader />
                }

                {/* DEBUG */}
                <pre>{JSON.stringify(allTransaction?.pagination)}</pre>
            </Container>
            <TransactionDetails transaction={flaggedTransaction} setTransaction={setFlaggedTransaction} />

        </section>
    )
}



