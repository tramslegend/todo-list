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
import TransactionList from '../../transactions/TransactionList';

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
                <TransactionList data={invoiceTransactions} />
            </div>
        </div>
    )
}
