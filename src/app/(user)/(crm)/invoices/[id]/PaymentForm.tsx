"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IInvoiceModel } from "@/types/crm/invoice.type";
import { INewTransaction } from "@/types/crm/transaction.type";
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DateTimePicker from "@/components/utils/DateTimePicker";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CrmPaymentMethod, CrmPaymentMethodType, CrmProjectPriorityType } from "@/constants/crm.constant";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useCsDispatch } from "@/cs-redux";
import { TransactionThunk } from "@/cs-redux/thunks/app/crm/transaction.thunk";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";



const defaultValue: INewTransaction = {
    invoiceId: "",
    referenceId: "",
    method: "",
    amount: 0,
    paidAt: new Date(),
    note: '',
}

export default function PaymentForm({ invoice }: { invoice: IInvoiceModel }) {
    const router = useRouter();
    const dispatch = useCsDispatch();
    const searchParams = useSearchParams();
    const open = searchParams.get('payment');
    const transactionId = searchParams.get('id');

    const [formData, setFormData] = useState<INewTransaction>(defaultValue)


    useEffect(() => {
        setFormData({
            ...formData,
            invoiceId: invoice._id,
            amount: invoice.totalAmount - invoice.amountPaid,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice, open])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit() {
        if (!formData.amount || Number(formData.amount) <= 0) return toast.error('Amount can not be 0')
        if (Number(formData.amount) > invoice.totalAmount - invoice.amountPaid) return toast.error('Amount exceeds due balance')
        if (!formData.method) return toast.error('Select Payment method')
        if (new Date(formData.paidAt) > new Date()) return toast.error('Paid At can not be a future date')


        const res = await dispatch(TransactionThunk.create(formData));
        if (res.payload.transaction) {
            onClose();
            toast.success("Payment Done!");
            dispatch(InvoiceThunk.getById({ id: res.payload.transaction.invoiceId }));
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }


    }

    function onClose() {
        router.replace(`/invoices/${invoice._id}`)
        setFormData(defaultValue)
    }
    // console.log(formData)
    return (
        <Dialog open={open === 'true'} onOpenChange={onClose}>
            <DialogTrigger></DialogTrigger>
            <DialogContent
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>{transactionId ? "Update Transaction Data" : "Make A Payment"}</DialogTitle>
                    <DialogDescription>
                        Fill the data bellow and submit to reflect the changes.<br />
                        Payment due <strong>{invoice.currency.symbol} {invoice.totalAmount - invoice.amountPaid}</strong> for <strong>{invoice.invoiceNumber}</strong>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 items-start">

                    <div className='space-y-1.5'>
                        <Label htmlFor="amount-1">Amount ({invoice.currency.symbol})</Label>
                        <Input id="amount-1" name="amount" type="text" value={formData.amount} onChange={handleOnChange} placeholder="Amount" />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="method-1">Payment Method</Label>
                        <Select value={formData.method} onValueChange={(v: CrmPaymentMethodType) => setFormData({ ...formData, method: v })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Payment Method" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(CrmPaymentMethod).map((value: CrmPaymentMethodType, i: number) => (
                                    <SelectItem value={value} key={value + i}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="referenceId-1">Reference Id</Label>
                        <Input id="referenceId-1" name="referenceId" type="text" value={formData.referenceId} onChange={handleOnChange} placeholder="Transaction reference id if any" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className='space-y-1.5 grow'>
                            <Label htmlFor="paidAt-1">Paid At</Label>
                            <DateTimePicker datetime maxDate={new Date()} minDate={new Date(invoice.issuedDate)} date={formData.paidAt} setDate={(date) => setFormData({ ...formData, paidAt: date! })} />
                        </div>
                        <Checkbox className="hidden" />
                    </div>
                    <div className='space-y-1.5 col-span-2'>
                        <Label htmlFor="note-1">Note</Label>
                        <Input id="note-1" name="note" type="text" value={formData.note} onChange={handleOnChange} placeholder="Note (Optional)" />
                    </div>
                </div>
                <DialogFooter>
                    <Button size={'sm'} onClick={onSubmit}>Submit</Button>
                    <Button size={'sm'} onClick={onClose} variant={'outline'}>cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
