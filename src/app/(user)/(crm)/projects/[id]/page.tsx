"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { TypographyH3 } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import ProjectSlice from "@/cs-redux/slices/app/crm/project.slice";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { EllipsisVertical } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";

export default function CrmProjectDetailsPage() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const params = useParams();
    const id = params.id!.toString();

    const { project, loading } = useCsSelector(state => state.project);

    useEffect(() => {
        dispatch(ProjectThunk.getById({ id }))

        return () => {
            dispatch(ProjectSlice.actions.clearProject({}))
        }
    }, [dispatch, id])


    async function onArchive(id: string) {
        const { payload } = await dispatch(ProjectThunk.archive({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    async function onRestore(id: string) {
        const { payload } = await dispatch(ProjectThunk.restore({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    async function onDelete(id: string) {
        const { payload } = await dispatch(ProjectThunk.delete({ id }));

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
        <div className="py-3">
            {
                !project ?
                    <div className="border rounded-lg px-3 py-5 flex items-start justify-between gap-3">
                        <div className="grow">
                            <Skeleton className="h-[33px] w-[200px] rounded mb-3" />
                            <hr />
                            <div className="mt-3">
                                <Skeleton className="h-[14px] w-[180px] rounded" />
                                <Skeleton className="h-[14px] w-[280px] rounded mt-2" />
                                <Skeleton className="h-[14px] w-[170px] rounded mt-2" />
                                <Skeleton className="h-[14px] w-[70px] rounded mt-5" />
                                <Skeleton className="h-[14px] w-[370px] rounded mt-2" />
                            </div>
                        </div>
                        <div>
                            <Avatar className="w-22 h-22">
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    :
                    <div className="border rounded-lg px-3 py-5">
                        <TypographyH2 className="flex items-center justify-between">
                            <span>
                                <span>{project?.name}</span>
                                {project.isArchived && <span className="text-sm text-destructive ms-2"> (archived)</span>}
                            </span>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/new?id=${project._id}`)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => project.isArchived ? onRestore(project._id) : onArchive(project._id)}>{project.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => onDelete(project._id)}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TypographyH2>

                        <div className="">


                        </div>
                    </div>
            }
        </div>
    )
}
