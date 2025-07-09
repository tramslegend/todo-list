'use client'
import { Input } from '@/components/ui/input';

import { useCsDispatch, useCsSelector } from '@/cs-redux';
import { ClientThunk } from '@/cs-redux/thunks/app/crm/client.thunk';
import { IClientModel } from '@/types/crm/client.type';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
import SearchInput from '@/components/utils/SearchInput';
import { currencies } from '@/constants/currencies';
import { ICurrency } from '@/types';
import { findByProperty } from '@/cs-toolkit/utils';



export default function CurrencySelector({ currency, setCurrency }: { currency?: ICurrency; setCurrency: ((code: ICurrency) => void) }) {
    // Popover
    const [open, setOpen] = useState(false)

    const [query, setQuery] = useState<string>('')

    const filteredCurrencies = useMemo(() => {
        const lowerQuery = query.toLowerCase().trim();
        return currencies.filter(
            currency =>
                currency.name.toLowerCase().includes(lowerQuery) ||
                currency.code.toLowerCase().includes(lowerQuery)
        );
    }, [query]);


    return (
        <Popover open={open} onOpenChange={() => { setOpen(!open); setQuery('') }} >
            <PopoverTrigger asChild className="w-full">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between "
                >
                    {currency && <span className='flex items-center gap-2'><span className='capitalize'>{currency.name}</span> ({currency.code} - {currency.symbol})</span>}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-sm">
                <Command>
                    <SearchInput query={query} setQuery={(q) => setQuery(q)} />
                    <CommandList>
                        <CommandEmpty>Not found.</CommandEmpty>
                        <CommandGroup>

                            {filteredCurrencies.map((currency, i) => (
                                <CommandItem key={`currency--${currency.code}${i + 454345}`} value={currency.code} onSelect={(code: string) => { setCurrency(findByProperty(currencies, 'code', code)!); setOpen(false) }}>
                                    <TypographyP>{currency.name} ({currency.code} - {currency.symbol})</TypographyP>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
