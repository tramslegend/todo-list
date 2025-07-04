"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyH4, TypographyP } from "@/components/ui/typography";
import { TypographyH3 } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import ProjectSlice from "@/cs-redux/slices/app/crm/project.slice";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { EllipsisVertical } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";
import ProjectStatus from "../ProjectStatus";
import ProjectPriority from "../ProjectPriority";
import Link from "next/link";

export default function CrmProjectDetailsPage() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const params = useParams();
    const id = params.id!.toString();

    const { project, loading } = useCsSelector(state => state.project);
    const { client } = useCsSelector(state => state.client);

    useEffect(() => {
        dispatch(ProjectThunk.getById({ id }))

        return () => {
            dispatch(ProjectSlice.actions.clearProject({}))
        }
    }, [dispatch, id])

    // Fetch the Client of project
    useEffect(() => {
        if (project && (!client || client._id !== project?.clientId)) {
            dispatch(ClientThunk.getById({ id: project?.clientId }))
        }

    }, [client, dispatch, project])


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
                            <Skeleton className="h-[32px] w-[200px] rounded mb-3" />
                            <hr />
                            <div className="mt-3">
                                <Skeleton className="h-[14px] w-[181px] rounded" />
                                <div className="grid grid-cols-3 gap-3 mt-5">
                                    <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3">
                                        <Skeleton className="h-[81px] w-full rounded" />
                                        <Skeleton className="h-[81px] w-full rounded" />
                                    </div>
                                    <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3">
                                        <Skeleton className="h-[81px] w-full rounded" />
                                        <Skeleton className="h-[81px] w-full rounded" />
                                    </div>
                                    <div className="border rounded px-2 py-2 grid grid-cols-1 gap-3">
                                        <Skeleton className="h-[81px] w-full rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="border rounded-lg px-3 py-5">
                        <TypographyH2 className="flex items-center justify-between">
                            <span>
                                <span>{project?.name}</span>
                                {project?.isArchived && <span className="text-sm text-destructive ms-2"> (archived)</span>}
                            </span>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/projects/new?id=${project?._id}`)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => project?.isArchived ? onRestore(project?._id) : onArchive(project?._id)}>{project?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => onDelete(project?._id!)}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TypographyH2>

                        <div className="mt-1">
                            <TypographyP className="text-muted-foreground">{project?.description}</TypographyP>

                            <div className="grid grid-cols-3 gap-3 mt-5">
                                <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3 h-[100px]">
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full">
                                        <TypographyP className="font-bold  text-center mb-2">Status</TypographyP>
                                        <ProjectStatus id={project._id} status={project.status} />
                                    </div>
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full">
                                        <TypographyP className="font-bold text-center mb-2">Priority</TypographyP>
                                        <ProjectPriority id={project._id} priority={project.priority} />
                                    </div>
                                </div>

                                <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3 ">
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full">
                                        <TypographyP className="font-bold  text-center mb-2">Start Date</TypographyP>
                                        <TypographyP className="text-center">{new Date(project?.startDate!)?.toLocaleDateString('en-GB')}</TypographyP>
                                    </div>
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full">
                                        <TypographyP className="font-bold text-center mb-2">Due Date</TypographyP>
                                        <TypographyP className="text-center">{new Date(project?.dueDate!)?.toLocaleDateString('en-GB')}</TypographyP>
                                    </div>
                                </div>
                                <div className="border rounded px-2 py-2">
                                    {client?._id === project?.clientId ?
                                        <div className="bg-accent/20 hover:bg-accent/30 cursor-pointer px-3 py-2 rounded h-full">
                                            <TypographyP className="font-bold">Client</TypographyP>
                                            <TypographyP>{client?.name}</TypographyP>
                                            <Link className="text-xs text-blue-400" href={`/clients/${client?._id}`}>view details</Link>
                                        </div>
                                        :
                                        <div role="status" className="animate-pulse bg-accent/20 hover:bg-accent/30 cursor-pointer px-3 py-2 rounded h-full w-full">

                                        </div>
                                    }
                                </div>

                            </div>



                        </div>
                    </div>
            }
        </div>
    )
}
