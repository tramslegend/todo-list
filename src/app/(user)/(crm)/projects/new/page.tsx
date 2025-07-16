"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { INewProject } from '@/types/crm/project.type'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ClientIdSelector from '@/app/(user)/(crm)/invoices/new/ClientIdSelector'
import DateTimePicker from '@/components/utils/DateTimePicker'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ProjectThunk } from '@/cs-redux/thunks/app/crm/project.thunk'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CrmProjectPriority, CrmProjectPriorityType } from '@/constants/crm.constant'
import Container from '@/components/utils/Container'

const defaultValue: INewProject = {
    clientId: '',
    description: '',
    name: '',
    startDate: new Date(),
    dueDate: new Date(),
    note: '',
    priority: 'NA',
}


export default function CrmNewProjectPage() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const clientId = searchParams.get('client');

    const { project, loading } = useCsSelector(state => state.project);

    const [formData, setFormData] = useState<INewProject>(defaultValue)
    const [total, setTotal] = useState<number>(0)


    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if (id && (!project || project._id !== id)) dispatch(ProjectThunk.getById({ id }))
    }, [dispatch, id, project])


    useEffect(() => {
        if (clientId) setFormData({ ...defaultValue, clientId })
    }, [clientId])


    useEffect(() => {
        if (id && project) {
            setFormData(
                {
                    name: project.name,
                    clientId: project.clientId,
                    description: project.description,
                    startDate: new Date(project.startDate),
                    dueDate: new Date(project.dueDate),
                    priority: project.priority,
                    note: project.note,
                }
            )
        } else {
            if (clientId) setFormData({ ...defaultValue, clientId })
            else setFormData(defaultValue)
        }
    }, [clientId, id, project])


    async function onSubmit() {
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.clientId.trim()) return toast.error("Select a client");

        let res;
        if (id && project) {
            res = await dispatch(ProjectThunk.update({ id, data: formData }));
        } else {
            res = await dispatch(ProjectThunk.create(formData));
        }

        if (res.payload.message) {
            toast.success(res.payload.message);
            router.replace(`/projects/${res.payload.project._id}`);
            setFormData(defaultValue);
        } else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }




    return (
        <Container className="py-3 pb-22">
            <div className='mb-7 '>
                <h2 className="font-bold text-2xl ">{id ? "Update Project" : "Create New Project"} </h2>

            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="name-1">Name</Label>
                        <Input id="name-1" name="name" type="text" value={formData.name} onChange={handleOnChange} placeholder="Name of the project " />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="description-1">Description</Label>
                        <Input id="description-1" name="description" type="text" value={formData.description} onChange={handleOnChange} placeholder="Project description (Optional)" />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="-1">Client</Label>
                        <ClientIdSelector disabled={typeof id === 'string' || typeof clientId === 'string'} clientId={formData.clientId} setClientId={(id: string) => setFormData({ ...formData, clientId: id })} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="startDate-1">Start Date</Label>
                        <DateTimePicker maxDate={new Date()} date={formData.startDate} setDate={(date) => setFormData({ ...formData, startDate: date! })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="dueDate-1">Due Date</Label>
                        <DateTimePicker minDate={new Date(formData.startDate)} date={formData.dueDate} setDate={(date) => setFormData({ ...formData, dueDate: date! })} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label htmlFor="note-1">Note</Label>
                        <Input id="note-1" name="note" type="text" value={formData.note} onChange={handleOnChange} placeholder="Note (Optional)" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 items-start">
                    <div className='space-y-1.5 '>
                        <Label htmlFor="Priority-1">Priority</Label>
                        <Select value={formData.priority} onValueChange={(v: CrmProjectPriorityType) => setFormData({ ...formData, priority: v })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(CrmProjectPriority).map((value: CrmProjectPriorityType, i: number) => (
                                    <SelectItem value={value} key={value + i}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='mt-5 space-x-3'>
                    <Button size={'sm'} onClick={onSubmit}>{id ? "Update" : "Save"}</Button>
                    <Button variant={'outline'} size={'sm'} onClick={() => router.back()}>Back</Button>
                </div>
            </div>
        </Container>
    )
}
