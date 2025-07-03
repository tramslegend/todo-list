"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { INewProject } from '@/types/crm/project.type'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ClientIdSelector from './ClientIdSelector'
import InvoiceItemsForm from './InvoiceItemsForm'
import DatePicker2 from '@/components/utils/DatePicker2'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ProjectThunk } from '@/cs-redux/thunks/app/crm/project.thunk'
import { useRouter } from 'next/navigation'
import { CURRENCY } from '@/root.config'


const defaultValue: INewProject = {
    clientId: '',
    description: '',
    name: '',
    startDate: new Date(),
    dueDate: new Date(),
    note: '',
    items: []
}


export default function CrmNewProjectPage() {
    const dispatch = useCsDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState<INewProject>(defaultValue)
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

    async function onSubmit() {
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.clientId.trim()) return toast.error("Select a client");

        const res = await dispatch(ProjectThunk.create(formData));

        if (res.payload.message) {
            toast.success(res.payload.message);
            router.push('/projects');
            setFormData(defaultValue);
        } else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }


    return (
        <div className="py-3 pb-22">
            <div className='mb-7 '>
                <h2 className="font-bold text-2xl ">Create New Project </h2>

            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" type="text" value={formData.name} onChange={handleOnChange} placeholder="Project Name" />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="description-1">Description</Label>
                        <Input id="description-1" name="description" type="text" value={formData.description} onChange={handleOnChange} placeholder="Description" />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="description-1">Client</Label>
                        <ClientIdSelector clientId={formData.clientId} setClientId={(id: string) => setFormData({ ...formData, clientId: id })} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="startDate-1">Start Date</Label>
                        <DatePicker2 date={formData.startDate} setDate={(date) => setFormData({ ...formData, startDate: date })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="dueDate-1">Due Date</Label>
                        <DatePicker2 date={formData.dueDate} setDate={(date) => setFormData({ ...formData, dueDate: date })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="note-1">Note</Label>
                        <Input id="note-1" name="note" type="text" value={formData.note} onChange={handleOnChange} placeholder="Note (Optional)" />
                    </div>
                </div>

                <div className='space-y-1.5'>
                    <InvoiceItemsForm items={formData.items} setItems={(items) => setFormData({ ...formData, items })} />
                </div>

                <div className='flex items-center justify-between'>
                    <div className='mt-5 space-x-3'>
                        <Button size={'sm'} onClick={onSubmit}>Save</Button>
                        <Button variant={'outline'} size={'sm'} >Back</Button>
                    </div>
                    <h2 className="font-bold text- ">Total: {CURRENCY}{total}</h2>
                </div>
            </div>
        </div>
    )
}
