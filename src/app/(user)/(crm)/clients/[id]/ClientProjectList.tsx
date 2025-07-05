"use client"

import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProjectStatus from "../../projects/ProjectStatus";
import ProjectPriority from "../../projects/ProjectPriority";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";



export default function ClientProjectList() {
    const dispatch = useCsDispatch();
    const params = useParams();
    const { clientProjects } = useCsSelector(state => state.project);

    useEffect(() => {
        dispatch(ProjectThunk.getByClientId({ clientId: params.id?.toString()! }))
    }, [dispatch, params.id])
    return (
        <div className="mt-5">
            <div className="grid grid-cols-6 gap-3 px-3">
                <TypographyP className="font-bold mb-2 col-span-2">Project</TypographyP>
                <TypographyP className="font-bold mb-2">Status</TypographyP>
                <TypographyP className="font-bold mb-2">Priority</TypographyP>
                <TypographyP className="font-bold mb-2">Start Date</TypographyP>
                <TypographyP className="font-bold mb-2">Due Date</TypographyP>
            </div>

            {clientProjects?.map((project, i) => (
                <Link className="" href={`/projects/${project._id}`} key={`c_proj_${14875 + i}`}>
                    <div className="bg-accent/10 hover:bg-accent/20 relative rounded-lg px-3 py-5 mb-5 " >

                        <div className="grid grid-cols-6 gap-3 ">
                            <div className="col-span-2">
                                <TypographyP className="font-bold text-lg">{project.name}</TypographyP>
                                <TypographyP className="text-muted-foreground">{project?.description}</TypographyP>
                            </div>
                            <div className="">
                                <ProjectStatus project={project} disabled />
                            </div>
                            <div className="">
                                <ProjectPriority project={project} disabled />
                            </div>

                            <div className="">
                                <TypographyP className="">{new Date(project?.startDate!)?.toLocaleDateString('en-GB')}</TypographyP>
                            </div>
                            <div className="">
                                <TypographyP className="">{new Date(project?.dueDate!)?.toLocaleDateString('en-GB')}</TypographyP>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
