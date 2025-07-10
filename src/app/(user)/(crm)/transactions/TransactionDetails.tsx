'use client'

import { ITransactionModel } from '@/types/crm/transaction.type';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TypographyP } from '@/components/ui/typography';
import { formatDateTime } from '@/cs-toolkit/utils';

export default function TransactionDetails({ transaction, setTransaction }: { transaction: ITransactionModel | null, setTransaction: React.Dispatch<React.SetStateAction<ITransactionModel | null>> }) {


    return (
        <Dialog open={transaction !== null} onOpenChange={() => setTransaction(null)}>
            <DialogTrigger ></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transaction for - {transaction?.invoiceNumber}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                {transaction && <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2">
                        <TypographyP className='text-muted-foreground'>Method:</TypographyP>
                        <TypographyP className="font-medium capitalize">{transaction.method}</TypographyP>
                    </div>

                    {transaction.referenceId && (
                        <div className="grid grid-cols-2">
                            <TypographyP className='text-muted-foreground'>Reference ID:</TypographyP>
                            <TypographyP className="">{transaction.referenceId}</TypographyP>
                        </div>
                    )}

                    <div className="grid grid-cols-2">
                        <TypographyP className='text-muted-foreground'>Amount:</TypographyP>
                        <TypographyP className="font-semibold">{transaction.currency.symbol} {transaction.amount}</TypographyP>
                    </div>

                    <div className="grid grid-cols-2">
                        <TypographyP className='text-muted-foreground'>Paid At:</TypographyP>
                        <TypographyP>{formatDateTime(transaction.paidAt)}</TypographyP>
                    </div>

                    {transaction.note && (
                        <div className="grid grid-cols-2">
                            <TypographyP className='text-muted-foreground'>Note:</TypographyP>
                            <TypographyP className="">{transaction.note}</TypographyP>
                        </div>
                    )}
                </div>}
            </DialogContent>
        </Dialog>
    )
}
