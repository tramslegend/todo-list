import React, { Dispatch, SetStateAction } from 'react'
import { TypographyH3 } from '../ui/typography';
import SearchInput from './SearchInput';
import Container from './Container';
import { Input } from '../ui/input';

export default function MainPageHeader({ children, title, setQuery }: { children?: React.ReactNode; title?: string; setQuery: Dispatch<SetStateAction<string>> }) {
    return (
        <div className='flex items-center justify-between py-2 mb-2 bg-background/60 backdrop-blur-lg px-3 h-16 sticky top-14 z-50 border-b'>
            <Container className='flex items-center justify-between gap-5'>
                <div className='flex items-center gap-5'>
                    <TypographyH3 className='text-3xl'>{title}</TypographyH3>

                </div>
                <div className='flex items-center gap-3'>

                    <div className='w-xs'><SearchInput setQuery={setQuery} /></div>
                    {children}
                </div>
            </Container>
        </div>
    )
}
