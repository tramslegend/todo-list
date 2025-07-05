"use client"

import { CrmProjectPriority, CrmProjectStatus } from "@/constants/crm.constant";
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


export default function ProjectPriority({ project, disabled = false }: { project: IProjectModel; disabled?: boolean }) {
    const dispatch = useCsDispatch();

    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    const [localPriority, setLocalPriority] = useState<string>('')


    useEffect(() => {
        switch (project.priority) {
            case CrmProjectPriority.HIGH:
                setColor('bg-amber-500/5 border-amber-500/20 text-amber-500 font-semibold')
                break;

            case CrmProjectPriority.MEDIUM:
                setColor('bg-cyan-500/5 border-cyan-500/20 text-cyan-500 font-semibold')
                break;

            case CrmProjectPriority.LOW:
                setColor('bg-accent-500/5 border-accent-500/20 text-accent-500 font-semibold')
                break;

            default:
                setColor('bg-accent/10')
                break;
        }
    }, [project.priority])


    async function onSave() {
        if (!project || !localPriority) return toast.error('Something went wrong')

        const res = await dispatch(ProjectThunk.updatePriority({ id: project._id, data: { priority: localPriority } }))
        if (res.payload.message) {
            toast.success(res.payload.message);
            setOpen(false)
            setLocalPriority('')
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className={`border  text-xs px-3 py-1 rounded-full text-center cursor-pointer ${color}`} disabled={disabled}>
                {project.priority}
            </button>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogTrigger asChild>

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Project Priority</DialogTitle>
                        <DialogDescription>
                            Select the priority from dropdown bellow, then save to update project priority.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Select onValueChange={v => setLocalPriority(v)} defaultValue={project.priority}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Priority</SelectLabel>
                                    {
                                        Object.values(CrmProjectPriority).map((s: string, i: number) => (
                                            <SelectItem key={`priority-${i + 4387653}`} value={s}>{s}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button size={'sm'} variant={'outline'} onClick={() => { setOpen(false); setLocalPriority('') }}>Cancel</Button>
                        <Button size={'sm'} onClick={onSave}>save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}