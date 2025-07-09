'use project'
import { Input } from '@/components/ui/input';

import { useCsDispatch, useCsSelector } from '@/cs-redux';
import { ProjectThunk } from '@/cs-redux/thunks/app/crm/project.thunk';
import { IProjectModel } from '@/types/crm/project.type';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { TypographyP, TypographySmall } from '@/components/ui/typography';
import ProjectSlice from '@/cs-redux/slices/app/crm/project.slice';
import SearchInput from '@/components/utils/SearchInput';



export default function ProjectSelector({ projectId, setProjectId, disabled = false }: { projectId?: string; setProjectId: ((id: string) => void), disabled?: boolean }) {
    // Popover
    const [open, setOpen] = useState(false)

    // Project ...
    const dispatch = useCsDispatch();
    const { allProject, project } = useCsSelector(state => state.project);
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>('')


    useEffect(() => {
        if (!disabled) dispatch(ProjectThunk.getAll({ page, limit: 100, query }))

    }, [disabled, dispatch, page, query])


    // Fetch the associated project if it not in array
    useEffect(() => {
        if (projectId && disabled && (!project || projectId !== project._id)) {
            dispatch(ProjectThunk.getById({ id: projectId }))
        }
    }, [projectId, allProject?.data, disabled, dispatch, project]);


    return (
        <>
            {disabled ?
                <Button variant={'outline'} className='w-full flex justify-between' disabled>
                    {project?.name}
                </Button>
                :
                <Popover open={open} onOpenChange={() => { setOpen(!open); setQuery('') }} >
                    <PopoverTrigger disabled={disabled} asChild className="w-full">
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between "
                        >
                            {projectId
                                ? allProject?.data.find((project) => project._id === projectId)?.name
                                : "Select Project..."
                            }
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-sm">
                        <Command>
                            <SearchInput query={query} setQuery={(q) => setQuery(q)} />
                            <CommandList>
                                <CommandEmpty>No project found.</CommandEmpty>
                                <CommandGroup>

                                    {allProject?.data.map((project: IProjectModel, i: number) => (
                                        <CommandItem key={`project_${project._id}${i + 85673}`} value={project._id} onSelect={(id: string) => { setProjectId(id); setOpen(false) }}>
                                            <div>
                                                <TypographyP className='font-bold'>{project.name}</TypographyP>
                                                {project.description && <TypographySmall className='text-muted-foreground'>{project.description}</TypographySmall>}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            }
        </>
    )
}
