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
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import { CsUtils } from "@/cs-toolkit"
import ProjectPriority from "./ProjectPriority"
import ProjectStatus from "./ProjectStatus"
import { CrmProjectPriority } from "@/constants/crm.constant"
import ProjectList from "./ProjectList"


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
                <Button size={'icon'} variant={'outline'} onClick={() => router.push(`/projects/new`)}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allProject ?
                    allProject?.pagination.totalData > 0 ?
                        <>
                            <ProjectList data={allProject.data} />

                            {(allProject?.pagination.currentPage !== allProject?.pagination.totalPages && allProject?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No Project Found" : "No Project"}</TypographyP>
                    :
                    <SpinLoaderCard />
                }

                {/* DEBUG */}
                {/* <pre>{JSON.stringify(allProject?.pagination)}</pre> */}
            </Container>
        </section>
    )
}

