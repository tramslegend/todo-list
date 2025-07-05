"use client"

import { CrmProjectStatus } from "@/constants/crm.constant";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCsDispatch } from "@/cs-redux";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { IProjectModel } from "@/types/crm/project.type";

export default function ProjectStatus({ project }: { project: IProjectModel }) {
    const dispatch = useCsDispatch();

    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [localStatus, setLocalStatus] = useState<string>('')


    useEffect(() => {
        switch (project.status) {
            case CrmProjectStatus.PENDING:
                setColor('bg-purple-500/5 border-purple-500/20 text-purple-500 font-semibold')
                break;
            case CrmProjectStatus.IN_PROGRESS:
                setColor('bg-blue-500/5 border-blue-500/20 text-blue-500 font-semibold')
                break;
            case CrmProjectStatus.COMPLETED:
                setColor('bg-green-500/5 border-green-500/20 text-green-500 font-semibold')
                break;
            case CrmProjectStatus.CANCELLED:
                setColor('bg-red-500/5 border-red-500/20 text-red-500 font-semibold')
                break;

            default:
                setColor('bg-accent/10')
                break;
        }
    }, [project.status])

    async function onSave() {
        if (!project || !localStatus) return toast.error('Something went wrong')

        const res = await dispatch(ProjectThunk.updateStatus({ id: project._id, data: { status: localStatus } }))
        if (res.payload.message) {
            toast.success(res.payload.message);
            setOpen(false)
            setLocalStatus('')
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }

    return (

        <>
            <button onClick={() => setOpen(true)} className={`border  text-xs px-3 py-1 rounded-full text-center cursor-pointer ${color}`}>
                {project.status}
            </button>
            {project.status === CrmProjectStatus.COMPLETED && <span className="text-[11px] mt-1 text-muted-foreground block">{(new Date(project.completedAt!)).toLocaleDateString('en-GB')}</span>}
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogTrigger asChild>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Project Status</DialogTitle>
                        <DialogDescription>
                            Select the status from dropdown bellow, then save to update project status.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Select onValueChange={v => setLocalStatus(v)} defaultValue={project.status}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    {
                                        Object.values(CrmProjectStatus).map((s: string, i: number) => (
                                            <SelectItem key={`status-${i + 4387653}`} value={s}>{s}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button size={'sm'} variant={'outline'} onClick={() => { setOpen(false); setLocalStatus('') }}>Cancel</Button>
                        <Button size={'sm'} onClick={onSave}>save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}