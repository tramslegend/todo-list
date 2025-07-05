"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
import ProjectAction from "../ProjectAction";

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





    return (
        <div className="py-3">
            {
                !project ?
                    <div className="border rounded-lg px-3 py-5 flex items-start justify-between gap-3">
                        <div className="grow">
                            <Skeleton className="h-[32px] w-[200px] rounded mb-3" />
                            <hr />
                            <div className="mt-3">
                                <Skeleton className="h-[14px] w-[191px] rounded" />
                                <div className="grid grid-cols-3 gap-3 mt-5">
                                    <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3">
                                        <Skeleton className="h-[91px] w-full rounded" />
                                        <Skeleton className="h-[91px] w-full rounded" />
                                    </div>
                                    <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3">
                                        <Skeleton className="h-[91px] w-full rounded" />
                                        <Skeleton className="h-[91px] w-full rounded" />
                                    </div>
                                    <div className="border rounded px-2 py-2 grid grid-cols-1 gap-3">
                                        <Skeleton className="h-[91px] w-full rounded" />
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
                            <ProjectAction project={project} />
                        </TypographyH2>

                        <div className="mt-1">
                            <TypographyP className="text-muted-foreground">{project?.description}</TypographyP>

                            <div className="grid grid-cols-3 gap-3 mt-5">
                                <div className="border rounded px-2 py-2 grid grid-cols-2 gap-3 h-[110px]">
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full flex flex-col items-center">
                                        <TypographyP className="font-bold  text-center mb-2">Status</TypographyP>
                                        <ProjectStatus project={project} />
                                    </div>
                                    <div className="bg-accent/20 rounded px-3 py-2 h-full flex flex-col items-center">
                                        <TypographyP className="font-bold text-center mb-2">Priority</TypographyP>
                                        <ProjectPriority project={project} />
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
