"use client"
import MainPageHeader from '@/components/utils/MainPageHeader'
import { useCsDispatch, useCsSelector } from '@/cs-redux';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITransactionModel } from '@/types/crm/transaction.type';
import { Button } from '@/components/ui/button';
import { Eye, MoveRight, SquareMenu } from 'lucide-react';
import { CsUtils } from '@/cs-toolkit';
import { TransactionThunk } from '@/cs-redux/thunks/app/crm/transaction.thunk';
import TransactionDetails from './TransactionDetails';

export default function CrmTransactionsPage() {
    const dispatch = useCsDispatch();
    const { allTransaction } = useCsSelector(state => state.transaction);
    const [flaggedTransaction, setFlaggedTransaction] = useState<ITransactionModel | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(40);
    const { query } = useCsSelector(state => state.global);

    useEffect(() => {
        dispatch(TransactionThunk.getAll({ limit, page, query }))
    }, [dispatch, limit, page, query])

    return (
        <div>
            <MainPageHeader title="Transactions">
                {/* <Button size={'icon'} variant={'secondary'}><Grid /></Button> */}
            </MainPageHeader>
            <Table>
                <TableCaption>A list of your transactions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">##</TableHead>
                        <TableHead>Invoice No</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Paid At</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className='text-right'>Amount</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {allTransaction && <TableBody className="border-b">
                    {allTransaction.data?.map((transaction: ITransactionModel, i: number) => (
                        <TableRow key={`transaction_${i + 7863456}`}>
                            <TableCell className="font-medium w-[50px]">{(i + 1).toString().padStart(2, '0')}</TableCell>
                            <TableCell>{transaction.invoiceNumber}</TableCell>
                            <TableCell>
                                {transaction.method}
                                {transaction.referenceId && <span className='text-[12px] text-muted-foreground'><br />{transaction.referenceId}</span>}
                            </TableCell>
                            <TableCell>{CsUtils.formatDateTime(transaction.paidAt)}</TableCell>
                            <TableCell>
                                {transaction.note && transaction.note.length > 25
                                    ? `${transaction.note.slice(0, 25)}...`
                                    : transaction.note}
                            </TableCell>
                            <TableCell className='text-right'>{transaction.currency.symbol} {transaction.amount}</TableCell>
                            <TableCell className="text-right w-[100px] flex items-center justify-end">
                                <Button variant={'ghost'} onClick={() => { setFlaggedTransaction(transaction) }}><SquareMenu /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>

            <TransactionDetails transaction={flaggedTransaction} setTransaction={setFlaggedTransaction} />

        </div>
    )
}
