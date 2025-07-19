import { TypographyP } from "@/components/ui/typography";
import { CrmProjectPriority } from "@/constants/crm.constant";
import Link from "next/link";
import ProjectStatus from "./ProjectStatus";
import ProjectPriority from "./ProjectPriority";
import ProjectAction from "./ProjectAction";
import { CsUtils } from "@/cs-toolkit";
import { IProjectModel } from "@/types/crm/project.type";


export default function ProjectList({ data }: { data: IProjectModel[] }) {
    return (
        <div className="grid grid-cols-1  border rounded bg-accent/10">
            {data.map((project: IProjectModel, i: number) => (
                <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all flex items-center justify-between ${i !== data.length - 1 && "border-b"}`} key={`project_${i + 8437593}`}>
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
    )
}
