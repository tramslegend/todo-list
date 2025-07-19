"use client"

import { TypographyP } from "@/components/ui/typography";
import { ITransactionModel } from "@/types/crm/transaction.type";
import TransactionAction from "./TransactionAction";
import { CsUtils } from "@/cs-toolkit";
import TransactionDetails from "./TransactionDetails";
import { useState } from "react";


export default function TransactionList({ data }: { data: ITransactionModel[] }) {
    const [flaggedTransaction, setFlaggedTransaction] = useState<ITransactionModel | null>(null);

    return (
        <div>
            <div className="grid grid-cols-1  border rounded bg-accent/10">
                {data.map((transaction: ITransactionModel, i: number) => (
                    <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all gap-3 flex items-center justify-between ${i !== data.length - 1 && "border-b"}`} key={`transaction_${i + 8437593}`}>
                        <div onClick={() => setFlaggedTransaction(transaction)} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                            <div className=" col-span-3">
                                <TypographyP className="font-bold">{transaction.invoiceNumber}</TypographyP>
                            </div>
                            <div className=" col-span-3">
                                <TypographyP className="">{transaction.method}</TypographyP>
                                <TypographyP className="text-muted-foreground text-[12px]">{transaction.referenceId}</TypographyP>
                            </div>
                            <div className=" col-span-3">
                                <TypographyP className="">{CsUtils.formatDateTime(transaction.paidAt)}</TypographyP>
                            </div>
                            <div className="col-span-3">
                                <TypographyP className="text-right ont-bold">{transaction.currency.symbol} {transaction.amount}</TypographyP>
                            </div>
                        </div>

                        <div>
                            <TransactionAction transaction={transaction} />
                        </div>
                    </div>
                ))}
            </div>
            <TransactionDetails transaction={flaggedTransaction} setTransaction={setFlaggedTransaction} />
        </div>
    )
}
