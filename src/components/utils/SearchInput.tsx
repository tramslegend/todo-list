"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react";

export default function SearchInput({ query, setQuery }: { query?: string; setQuery: Dispatch<SetStateAction<string>> }) {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [searchValue, setSearchValue] = useState('');

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
        <div className='flex items-center relative w-full h-full' >
            <Input value={searchValue} onChange={e => handleSearch(e.target.value)} placeholder='Search...' className='w-full' />
            {searchValue ?
                <button onClick={() => handleSearch('')} className='absolute top-1/4 right-2 text-muted-foreground rounded'><X size={17} /></button>
                :
                <button className='absolute top-1/4 right-2 text-muted-foreground rounded ' ><Search size={17} /></button>
            }
        </div>
    )
}
