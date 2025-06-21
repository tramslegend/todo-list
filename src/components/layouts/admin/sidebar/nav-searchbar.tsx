import { Input } from '@/components/ui/input'
import { useCsDispatch, useCsSelector } from '@/cs-redux';
import GlobalSlice from '@/cs-redux/slices/global.slice';
import { Search, X } from 'lucide-react'
import React, { useState } from 'react'



export default function CsSearchbar({ ...props }: React.ComponentProps<"div">) {
    const dispatch = useCsDispatch();
    const { searchQuery } = useCsSelector(state => state.global);

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [value, setValue] = useState('');

    const handleSearch = (value: string) => {
        // Set the local input value first
        setValue(value)

        // Clear the timeout if any
        if (timeoutId) clearTimeout(timeoutId);

        // 
        const newTimeoutId = setTimeout(() => {
            dispatch(GlobalSlice.actions.setSearchQuery(value))
        }, 500);

        // Save the new timeout ID
        setTimeoutId(newTimeoutId);
    };

    return (
        <div className='flex items-center relative' {...props} >
            <Input value={value} onChange={e => handleSearch(e.target.value)} placeholder='Search...' className='w-sm ' />
            {value ?
                <button onClick={() => handleSearch('')} className='absolute top-1/4 right-2 text-muted-foreground rounded'><X size={17} /></button>
                :
                <button className='absolute top-1/4 right-2 text-muted-foreground rounded ' ><Search size={17} /></button>
            }

        </div>
    )
}