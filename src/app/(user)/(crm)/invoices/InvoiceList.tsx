import { TypographyP } from '@/components/ui/typography'
import { IInvoiceModel } from '@/types/crm/invoice.type'
import Link from 'next/link'
import React from 'react'
import InvoiceStatus from './InvoiceStatus'
import InvoiceAction from './InvoiceAction'
import { CsUtils } from '@/cs-toolkit'
import { Check } from 'lucide-react'

export default function InvoiceList({ data }: { data: IInvoiceModel[] }) {
    return (
        <div className="grid grid-cols-1  border rounded bg-accent/10">
            {data?.map((invoice: IInvoiceModel, i: number) => (
                <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all gap-3 flex items-center justify-between ${i !== data.length - 1 && "border-b"}`} key={`invoice_${i + 8437593}`}>
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
                            <TypographyP className={`border bg-accent/10 text-xs px-3 py-1 rounded-full text-center ${invoice.isSent && "bg-blue-500/5 border-blue-500/20 text-blue-500"}`}>{invoice.isSent ? "Sent" : "Not Sent"}</TypographyP>
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
                        <InvoiceAction invoice={invoice} />
                    </div>
                </div>
            ))}
        </div>
    )
}
