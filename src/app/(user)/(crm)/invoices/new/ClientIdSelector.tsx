'use client'
import { Input } from '@/components/ui/input';

import { useCsDispatch, useCsSelector } from '@/cs-redux';
import { ClientThunk } from '@/cs-redux/thunks/app/crm/client.thunk';
import { IClientModel } from '@/types/crm/client.type';
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
import ClientSlice from '@/cs-redux/slices/app/crm/client.slice';



export default function ClientIdSelector({ clientId, setClientId, disabled = false }: { clientId?: string; setClientId: ((id: string) => void), disabled?: boolean }) {
    // Popover
    const [open, setOpen] = useState(false)

    // Client ...
    const dispatch = useCsDispatch();
    const { allClient, client } = useCsSelector(state => state.client);
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>('')


    useEffect(() => {
        if (!disabled) dispatch(ClientThunk.getAll({ page, limit: 100, query }))

    }, [disabled, dispatch, page, query])



    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [searchValue, setSearchValue] = useState('');

    // Fetch the associated client if it not in array
    useEffect(() => {
        if (clientId && disabled && (!client || clientId !== client._id)) {
            dispatch(ClientThunk.getById({ id: clientId }))
        }
    }, [clientId, allClient?.data, disabled, dispatch, client]);




    const handleSearch = (value: string) => {
        // Set the local input value first
        setSearchValue(value)

        // Clear the timeout if any
        if (timeoutId) clearTimeout(timeoutId);

        // 
        const newTimeoutId = setTimeout(() => {
            setQuery(value)
        }, 500);

        // Save the new timeout ID
        setTimeoutId(newTimeoutId);
    };

    return (
        <>
            {disabled ?
                <Button variant={'outline'} className='w-full flex justify-between' disabled>
                    {client?.name}
                </Button>
                :
                <Popover open={open} onOpenChange={() => { setOpen(!open); setSearchValue(''); setQuery('') }} >
                    <PopoverTrigger disabled={disabled} asChild className="w-full">
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between "
                        >
                            {clientId
                                ? allClient?.data.find((client) => client._id === clientId)?.name
                                : "Select Client..."
                            }
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-sm">
                        <Command>
                            <div className='flex items-center relative w-full h-full mb-3' >
                                <Input value={searchValue} onChange={e => handleSearch(e.target.value)} placeholder='Search...' className='w-full h-full' />
                                {searchValue ?
                                    <button onClick={() => handleSearch('')} className='absolute top-1/4 right-2 text-muted-foreground rounded'><X size={17} /></button>
                                    :
                                    <button className='absolute top-1/4 right-2 text-muted-foreground rounded ' ><Search size={17} /></button>
                                }
                            </div>
                            <CommandList>
                                <CommandEmpty>No client found.</CommandEmpty>
                                <CommandGroup>

                                    {allClient?.data.map((client: IClientModel, i: number) => (
                                        <CommandItem key={`client_${client._id}${i + 85673}`} value={client._id} onSelect={(id: string) => { setClientId(id); setOpen(false) }}>
                                            <div>
                                                <TypographyP className='font-bold'>{client.name}</TypographyP>
                                                {client.email && <><TypographySmall className='text-muted-foreground'>{client.email}</TypographySmall><br /></>}
                                                {client.phone && <TypographySmall className='text-muted-foreground'>{client.phone}</TypographySmall>}
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
