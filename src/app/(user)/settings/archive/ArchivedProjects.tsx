'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk"
import { IProjectModel } from "@/types/crm/project.type"
import { ArchiveRestore, LoaderIcon, Plus, SquareMenu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import ProjectSlice from "@/cs-redux/slices/app/crm/project.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import { CsUtils } from "@/cs-toolkit"
import { CrmProjectPriority } from "@/constants/crm.constant"
import ProjectPriority from "../../(crm)/projects/ProjectPriority"
import ProjectStatus from "../../(crm)/projects/ProjectStatus"
import { toast } from "sonner"

export default function ArchivedProjects({ query }: { query: string }) {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allArchivedProject, loading } = useCsSelector(state => state.project);


    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(ProjectSlice.actions.clearAllArchivedProject({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(ProjectThunk.getAllArchived({ page, limit, query }))
    }, [dispatch, limit, query, page])


    async function onRestore(id: string) {
        const { payload } = await dispatch(ProjectThunk.restore({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    return (
        <div>
            {allArchivedProject ?
                allArchivedProject?.pagination.totalData > 0 ?
                    <>
                        <div className="grid grid-cols-1  border rounded bg-accent/10">
                            {allArchivedProject.data.map((project: IProjectModel, i: number) => (
                                <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all flex items-center justify-between gap-5 ${i !== allArchivedProject.data.length - 1 && "border-b"}`} key={`project_${i + 8437593}`}>
                                    <Link href={`/projects/${project._id}`} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                        <div className=" col-span-3 overflow-hidden">
                                            <TypographyP className="font-bold">{project.name}</TypographyP>
                                            <TypographyP className="text-muted-foreground text-[12px] leading-3 mt-1">{project.description}</TypographyP>
                                        </div>
                                        <div className="col-span-3">
                                            <TypographyP className="">Started: <span className="text-muted-foreground ms-4">{CsUtils.formatDateToShortMonth(project.startDate)}</span></TypographyP>
                                            <TypographyP className="">Due Date: <span className="text-muted-foreground ">{CsUtils.formatDateToShortMonth(project.dueDate)}</span></TypographyP>
                                        </div>
                                        <div className="flex items-center col-span-3 overflow-hidden">
                                            {/* <TypographyP className="">{project.name}</TypographyP> */}
                                        </div>
                                        <div className="flex items-center col-span-1">
                                            {project.priority !== CrmProjectPriority.NA && <ProjectPriority project={project} disabled />}
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <ProjectStatus project={project} disabled />
                                        </div>
                                    </Link>

                                    <div>
                                        <Button onClick={() => onRestore(project._id)} variant={'destructive'} size={'icon'}><ArchiveRestore /></Button>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {(allArchivedProject?.pagination.currentPage !== allArchivedProject?.pagination.totalPages && allArchivedProject?.pagination.totalPages > 0) &&
                            <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                            </Button>
                        }
                    </>
                    :
                    <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No projects found." : "No Archived Project."}</TypographyP>
                :
                <SpinLoaderCard />
            }
        </div>
    )
}
