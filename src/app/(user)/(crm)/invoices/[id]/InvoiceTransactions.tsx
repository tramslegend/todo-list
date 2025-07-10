'use client'

import { Button } from '@/components/ui/button';
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import { useCsDispatch, useCsSelector } from '@/cs-redux';
import { InvoiceThunk } from '@/cs-redux/thunks/app/crm/invoice.thunk';
import { TransactionThunk } from '@/cs-redux/thunks/app/crm/transaction.thunk';
import { CsUtils } from '@/cs-toolkit';
import { ITransactionModel } from '@/types/crm/transaction.type';
import { Eye, SquareMenu, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import TransactionDetails from '../../transactions/TransactionDetails';
import TransactionAction from '../../transactions/TransactionAction';

export default function InvoiceTransactions() {

    const router = useRouter();
    const params = useParams();
    const invoiceId = params.id?.toString()!;
    const dispatch = useCsDispatch();
    const { invoiceTransactions } = useCsSelector(state => state.transaction);
    const { invoice } = useCsSelector(state => state.invoice);
    const [flaggedTransaction, setFlaggedTransaction] = useState<ITransactionModel | null>(null);

    useEffect(() => {
        dispatch(TransactionThunk.getByInvoiceId({ invoiceId }))
    }, [dispatch, invoiceId])


    if (!invoiceTransactions.length) return (<></>)

    return (
        <div className='mt-9 pb-16'>
            <TypographyH4>Transactions</TypographyH4>
            <div className='mt-3 space-y-2 '>
                {invoiceTransactions.map((t, i) => (
                    <div className='border rounded-lg  px-4 py-2 flex justify-between gap-5' key={`transaction_inv_${i + 83745}`}>
                        <div className='grow grid grid-cols-6 items-center'>
                            <TypographyP className='font-bold'>{t.invoiceNumber}</TypographyP>
                            <TypographyP>{CsUtils.formatDateTime(t.paidAt)}</TypographyP>
                            <div className='col-span-2 '>
                                <TypographyP>{t.method}</TypographyP>
                                <TypographyP className='text-muted-foreground text-[12px]'>{t.referenceId}</TypographyP>
                            </div>

                            <TypographyP>
                                {t.note && t.note.length > 25
                                    ? `${t.note.slice(0, 25)}...`
                                    : t.note}
                            </TypographyP>

                            <TypographyH4 className='text-right'>{invoice?.currency.symbol} {t.amount}</TypographyH4>

                        </div>
                        <div>
                            <Button variant={'ghost'} size={'icon'} onClick={() => { setFlaggedTransaction(t) }}><SquareMenu /></Button>
                            <TransactionAction transaction={t} />
                        </div>
                    </div>
                ))}
            </div>
            <TransactionDetails transaction={flaggedTransaction} setTransaction={setFlaggedTransaction} />

        </div>
    )
}
