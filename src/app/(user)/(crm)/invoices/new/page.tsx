"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { INewInvoice } from '@/types/crm/invoice.type'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ClientIdSelector from './ClientIdSelector'
import InvoiceItemsForm from './InvoiceItemsForm'
import DateTimePicker from '@/components/utils/DateTimePicker'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { InvoiceThunk } from '@/cs-redux/thunks/app/crm/invoice.thunk'
import { useRouter, useSearchParams } from 'next/navigation'
import ProjectSelector from './ProjectSelector'
import { CrmInvoiceStatus } from '@/constants/crm.constant'
import { TypographyH4, TypographyP } from '@/components/ui/typography'
import CurrencySelector from '@/components/utils/CurrencySelector'
import Container from '@/components/utils/Container'


const defaultValue: INewInvoice = {
    clientId: '',
    projectId: '',
    title: '',
    items: [],
    currency: null,
    discount: 0,
    issuedDate: new Date(),
    dueDate: new Date(),
    note: '',
}


export default function CrmNewInvoicePage() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const clientId = searchParams.get('client');
    const projectId = searchParams.get('project');

    const { invoice } = useCsSelector(state => state.invoice);
    const { organization, } = useCsSelector(state => state.organization);
    const [formData, setFormData] = useState<INewInvoice>(defaultValue)
    const [total, setTotal] = useState<number>(0)


    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        const totalAmount = formData.items.reduce((acc, item) => acc + item.totalAmount, 0);
        setTotal(totalAmount);
    }, [formData.items]);

    useEffect(() => {
        if (clientId) {
            setFormData(prev => ({ ...prev, clientId }));
        }
        if (projectId) {
            setFormData(prev => ({ ...prev, projectId }));
        }
        if (organization) {
            setFormData(prev => ({ ...prev, currency: organization.currency }));
        }
    }, [clientId, projectId, organization]);


    // Update
    useEffect(() => {
        if (id && (!invoice || invoice._id !== id)) dispatch(InvoiceThunk.getById({ id }))
    }, [dispatch, id, invoice])

    useEffect(() => {
        if (id && invoice) {
            setFormData({
                title: invoice.title,
                clientId: invoice.clientId,
                projectId: invoice.projectId,
                currency: invoice.currency,
                issuedDate: new Date(invoice.issuedDate),
                dueDate: new Date(invoice.dueDate!),
                items: invoice.items,
                discount: invoice.discount,
                note: invoice.note,
            })
        }
    }, [id, invoice])


    async function onSubmit() {
        if (!formData.title.trim()) return toast.error("Invoice title is required");
        if (!formData.clientId.trim()) return toast.error("Select a client");
        if (new Date(formData.issuedDate) > new Date()) return toast.error('Issued Date can not be a future date')

        let res;

        if (id && invoice) {
            res = await dispatch(InvoiceThunk.update({ id, data: formData }));
        } else {
            res = await dispatch(InvoiceThunk.create(formData));
        }

        if (res.payload.message) {
            toast.success(res.payload.message);
            router.push(`/invoices/${res.payload.invoice._id}`);
            setFormData(defaultValue);
        } else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }

    if (id && !invoice) {
        return (
            <div> </div>
        )
    }

    if (id && invoice && invoice.isSent) {
        return (
            <div className='mx-auto max-w-sm px-3 py-5 border rounded-2xl flex items-center flex-col gap-5 mt-10'>
                <TypographyH4>Can not update invoice after sending</TypographyH4>
                <Button variant={'outline'} onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <Container className="py-3 pb-22">
            <div className='mb-7 flex items-center justify-between'>
                <h2 className="font-bold text-2xl ">{id ? "Update Invoice" : "Create New Invoice"}</h2>
                <h2 className="font-bold pe-3">Total: {formData?.currency?.symbol} {total} {formData?.currency?.code}</h2>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="title-1">Title</Label>
                        <Input id="title-1" name="title" type="text" value={formData.title} onChange={handleOnChange} placeholder="Invoice title" />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="project-1">Project</Label>
                        <ProjectSelector disabled={typeof projectId === 'string'} projectId={formData.projectId} setProjectId={(id: string) => setFormData({ ...formData, projectId: id })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="description-1">Client</Label>
                        <ClientIdSelector disabled={typeof id === 'string' || typeof clientId === 'string'} clientId={formData.clientId} setClientId={(id: string) => setFormData({ ...formData, clientId: id })} />
                    </div>

                    <div className='space-y-1.5 '>
                        <Label htmlFor="issuedDate-1">Issue Date</Label>
                        <DateTimePicker maxDate={new Date()} date={formData.issuedDate} setDate={(date) => setFormData({ ...formData, issuedDate: date! })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="dueDate-1">Due Date</Label>
                        <DateTimePicker minDate={new Date(formData.issuedDate)} date={formData.dueDate} setDate={(date) => setFormData({ ...formData, dueDate: date! })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="discount-1">Discount</Label>
                        <Input id="discount-1" name="discount" type="text" value={formData.discount} onChange={handleOnChange} placeholder="Discount (Optional)" />
                    </div>

                    <div className='space-y-1.5 col-span-3'>
                        <Label htmlFor="note-1">Note</Label>
                        <Input id="note-1" name="note" type="text" value={formData.note} onChange={handleOnChange} placeholder="Note (Optional)" />
                    </div>

                    {/* <div className='space-y-1.5'>
                        <Label htmlFor="currency-1">Currency</Label>
                        <CurrencySelector currency={formData.currency} setCurrency={(currency) => setFormData({ ...formData, currency })} />
                    </div> */}
                </div>

                <div className='space-y-1.5'>
                    <InvoiceItemsForm currency={formData.currency} items={formData.items} setItems={(items) => setFormData({ ...formData, items })} />
                </div>

                <div className='flex items-center justify-between'>
                    <div className='mt-5 space-x-3'>
                        <Button size={'sm'} onClick={onSubmit}>{id ? "Update" : "Save"}</Button>
                        <Button variant={'outline'} size={'sm'} onClick={() => router.back()}>Back</Button>
                    </div>

                </div>
            </div>
        </Container>
    )
}
