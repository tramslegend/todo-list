'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { IProjectModel } from "@/types/crm/project.type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SpinLoader from "@/components/utils/SpinLoader";
import { TypographyP } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ProjectAction({ project }: { project: IProjectModel, }) {
    const router = useRouter();
    const dispatch = useCsDispatch();

    const { cascadeData, loading } = useCsSelector(state => state.project);

    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [forceDelete, setForceDelete] = useState<boolean>(false);


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
            router.replace('/projects')
            setOpenDelete(false)
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    function getCascade() {
        setOpenDelete(true)
        dispatch(ProjectThunk.getCascadeData({ id: project._id }));
    }
    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                    {/* <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/${project?._id}`)}>Details</DropdownMenuItem> */}
                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/new?id=${project?._id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={project?.isArchived ? onRestore : onArchive}>{project?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={getCascade}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDelete} onOpenChange={() => { setOpenDelete(false) }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Invoice?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the project <strong>{project.name}</strong> from the system.
                        </DialogDescription>
                    </DialogHeader>
                    {!loading ?
                        <div>
                            {cascadeData.invoices.length !== 0 &&
                                <div className="border border-destructive/20 bg-destructive/5 p-4 rounded-md mt-4">
                                    <TypographyP className="text-destructive mb-3">
                                        This project has {cascadeData.invoices.length} invoices.
                                        If you proceed to delete, the following invoices will be unlinked.
                                        Are you sure you want to continue?
                                    </TypographyP>
                                </div>
                            }
                        </div>
                        :
                        <div className="w-full  grid place-items-center">
                            {/* <SpinLoader /> */}
                        </div>
                    }
                    <DialogFooter className="mt-3">
                        <DialogClose asChild><Button variant={'outline'} size={'sm'}>Go Back</Button></DialogClose>
                        <Button disabled={loading} variant={'destructive'} size={'sm'} onClick={onDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
