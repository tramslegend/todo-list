"use client"

import { TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProjectStatus from "../../projects/ProjectStatus";
import ProjectPriority from "../../projects/ProjectPriority";
import Link from "next/link";
import { CsUtils } from "@/cs-toolkit";
import ProjectList from "../../projects/ProjectList";



export default function ClientProjectList() {
    const dispatch = useCsDispatch();
    const params = useParams();
    const { clientProjects } = useCsSelector(state => state.project);

    useEffect(() => {
        dispatch(ProjectThunk.getByClientId({ clientId: params.id?.toString()! }))
    }, [dispatch, params.id])


    if (!clientProjects || clientProjects.length == 0) {
        return (<TypographyP className="text-muted-foreground text-center mt-3">No Project</TypographyP>)
    }

    return (
        <div className="mt-5">
            <ProjectList data={clientProjects} />
        </div>
    )
}
