'use client'

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk"
import { IInvoiceModel } from "@/types/crm/invoice.type"
import { MoveRight, SquareMenu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import InvoiceAction from "./InvoiceAction"
import InvoiceStatus from "./ProjectStatus"
import { TypographyP } from "@/components/ui/typography"
import { CURRENCY } from "@/root.config"
import { CsUtils } from "@/cs-toolkit"
import MainPageHeader from "@/components/utils/MainPageHeader"

export default function InvoicesPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(40)

    const { allInvoice } = useCsSelector(state => state.invoice);
    const { query } = useCsSelector(state => state.global);


    useEffect(() => {
        dispatch(InvoiceThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, page, query])
    return (
        <div>
            <MainPageHeader title="Invoices">
                {/* <Button size={'icon'} variant={'secondary'}><Grid /></Button> */}
            </MainPageHeader>
            <Table>
                <TableCaption >{allInvoice?.data.length ? "A list of your invoices" : <>No invoices available, <Link className="text-blue-600" href={'/invoices/new'}>Create First Invoice</Link></>}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">##</TableHead>
                        <TableHead >Invoice Number</TableHead>
                        <TableHead >Title</TableHead>
                        <TableHead className="text-center">Issue Date</TableHead>
                        <TableHead className="text-center">Due Date</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Paid</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {allInvoice &&
                    <TableBody className="border-b">
                        {allInvoice.data?.map((invoice: IInvoiceModel, i: number) => (
                            <TableRow key={`client_${i + 7863456}`} className="group">
                                <TableCell className="font-medium w-[50px]">{(i + 1).toString().padStart(2, '0')}</TableCell>
                                <TableCell className="font-bold ">{invoice.invoiceNumber}</TableCell>
                                <TableCell className="">{invoice.title}</TableCell>
                                <TableCell className="text-center ">{CsUtils.formatDateToShortMonth(invoice.issuedDate!)}</TableCell>
                                <TableCell className="text-center ">{CsUtils.formatDateToShortMonth(invoice.dueDate!)}</TableCell>
                                <TableCell className="text-center "><InvoiceStatus invoice={invoice} /></TableCell>
                                <TableCell className="text-right ">{invoice.currency.symbol}{invoice.amountPaid}</TableCell>
                                <TableCell className="text-right">{invoice.currency.symbol}{invoice.totalAmount}</TableCell>
                                <TableCell className="text-right  flex items-center justify-end">
                                    <Button onClick={() => { router.push(`/invoices/${invoice._id}`) }} variant={'ghost'} ><SquareMenu /></Button>
                                    <InvoiceAction invoice={invoice} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
            </Table>

        </div>
    )
}

