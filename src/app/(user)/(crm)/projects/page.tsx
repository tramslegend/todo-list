'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ProjectThunk } from "@/cs-redux/thunks/app/crm/project.thunk"
import { IProjectModel } from "@/types/crm/project.type"
import { LoaderIcon, Plus, SquareMenu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProjectAction from "./ProjectAction"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import ProjectSlice from "@/cs-redux/slices/app/crm/project.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoader from "@/components/utils/SpinLoader"
import Link from "next/link"
import { CsUtils } from "@/cs-toolkit"
import ProjectPriority from "./ProjectPriority"
import ProjectStatus from "./ProjectStatus"
import { CrmProjectPriority } from "@/constants/crm.constant"


export default function ProjectsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allProject, loading } = useCsSelector(state => state.project);


    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(ProjectSlice.actions.clearAllProject({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(ProjectThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, query, page])


    return (
        <section>
            <MainPageHeader title="Projects" setQuery={setQuery}>
                <Button size={'icon'} variant={'outline'}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allProject ?
                    allProject?.pagination.totalData > 0 ?
                        <>
                            <div className="grid grid-cols-1  border rounded bg-accent/10">
                                {allProject.data.map((project: IProjectModel, i: number) => (
                                    <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all flex items-center justify-between ${i !== allProject.data.length - 1 && "border-b"}`} key={`project_${i + 8437593}`}>
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
                                            {/* <Button variant={'ghost'} onClick={() => { router.push(`/projects/${project._id}`) }}><SquareMenu /></Button> */}
                                            <ProjectAction project={project} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(allProject?.pagination.currentPage !== allProject?.pagination.totalPages && allProject?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No projects found." : "You haven’t added any projects yet."}</TypographyP>
                    :
                    <SpinLoader />
                }

                {/* DEBUG */}
                {/* <pre>{JSON.stringify(allProject?.pagination)}</pre> */}
            </Container>
        </section>
    )
}

