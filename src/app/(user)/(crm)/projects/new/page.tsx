"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { INewProject } from '@/types/crm/project.type'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ClientIdSelector from '../../ClientIdSelector'
import DatePicker from '@/components/utils/DatePicker'
import InvoiceItemsForm from '@/components/item-selector/InvoiceItemsForm'
import DatePicker2 from '@/components/utils/DatePicker2'


const defaultValue: INewProject = {
    clientId: '',
    name: '',
    startDate: new Date(),
    dueDate: new Date(),
    note: '',
    items: []
}

export default function CrmNewProjectPage() {
    const dispatch = useCsDispatch();



    const [formData, setFormData] = useState<INewProject>(defaultValue)


    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="py-3">
            <h2 className="font-bold text-2xl mb-7">Create New Project</h2>
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
                        {/* <DatePicker date={formData.startDate} setDate={(date) => setFormData({ ...formData, startDate: date })} /> */}
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
                    <Label htmlFor="Items-1">Items</Label>
                    <InvoiceItemsForm items={formData.items} setItems={(items) => setFormData({ ...formData, items })} />
                </div>

            </div>
        </div>
    )
}
