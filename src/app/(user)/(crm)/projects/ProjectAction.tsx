'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch } from "@/cs-redux";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { IProjectModel } from "@/types/crm/project.type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectAction({ project }: { project: IProjectModel, }) {
    const router = useRouter();
    const dispatch = useCsDispatch();

    async function onArchive() {
        const { payload } = await dispatch(ProjectThunk.archive({ id: project._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    async function onRestore() {
        const { payload } = await dispatch(ProjectThunk.restore({ id: project._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    async function onDelete() {
        const { payload } = await dispatch(ProjectThunk.delete({ id: project._id }));

        if (payload.message) {
            toast.success(payload.message);
            router.back();
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" space-y-1 py-2">
                {/* <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/${project?._id}`)}>Details</DropdownMenuItem> */}
                <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/new?id=${project?._id}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={project?.isArchived ? onRestore : onArchive}>{project?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={onDelete}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
