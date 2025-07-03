'use client'

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk"
import { IProjectModel } from "@/types/crm/project.type"
import { MoveRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProjectStatus from "./ProjectStatus"

export default function CrmProjectsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(40)

    const { allProject } = useCsSelector(state => state.project);
    const { query } = useCsSelector(state => state.global);


    useEffect(() => {
        dispatch(ProjectThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, page, query])
    return (
        <div>
            <Table>
                <TableCaption>{allProject?.data.length ? "A list of your projects" : <>No projects available, <Link className="text-blue-600" href={'/projects/new'}>Create Now</Link></>}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">##</TableHead>
                        <TableHead >Name</TableHead>
                        <TableHead className="max-w-[12rem]">Description</TableHead>
                        <TableHead className="text-center">Start Date</TableHead>
                        <TableHead className="text-center">Due Date</TableHead>
                        <TableHead className="text-center">Priority</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right ">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {allProject && <TableBody>
                    {allProject.data?.map((project: IProjectModel, i: number) => (
                        <TableRow key={`client_${i + 7863456}`}>
                            <TableCell className="font-medium w-[50px]">{(i + 1).toString().padStart(2, '0')}</TableCell>
                            <TableCell className="font-bold">{project.name}</TableCell>
                            <TableCell className="max-w-[12rem] overflow-hidden">
                                {project.description && project.description.length > 35
                                    ? `${project.description.slice(0, 35).trim()} ...`
                                    : project.description}
                            </TableCell>
                            <TableCell className="text-center">{new Date(project.startDate!)?.toLocaleDateString('en-US')}</TableCell>
                            <TableCell className="text-center">{new Date(project.dueDate!)?.toLocaleDateString('en-US')}</TableCell>
                            <TableCell className="text-center">{project.priority}</TableCell>
                            <TableCell><ProjectStatus id={project._id} status={project.status} /></TableCell>
                            <TableCell className="text-right  flex items-center justify-end">
                                <Button variant={'ghost'} onClick={() => { router.push(`/projects/${project._id}`) }}><MoveRight /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>

        </div>
    )
}

