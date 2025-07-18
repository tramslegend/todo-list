import { TypographyH3 } from '@/components/ui/typography'
import React from 'react'
import PlusIcon from '../PlusIcon'
import { Check } from 'lucide-react'
import Image from 'next/image'
const _benefits = [
    'Manage all your clients in one place',
    'Create and send invoices in seconds',
    'Group invoices by projects',
    'Track transaction history effortlessly',
    'Get paid faster with smart reminders',
    'Create invoice with customized branding',
];

export default function Benefits() {
    return (
        <div className='border-b border-x px-5 py-12 relative'>
            <PlusIcon size={20} className='absolute -top-[11px] -right-[10px]' />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:px-16'>
                <div className=''>
                    <TypographyH3 >What Benefit Will You Get</TypographyH3>

                    <div className='mt-10 space-y-3'>
                        {_benefits.map((b, i) => (
                            <div className='flex items-center gap-3' key={i + 327}>
                                <div className='rounded-full bg-chart-2 p-1'><Check size={15} /></div>
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='max-h-80 flex justify-end'>
                    <Image className='h-full w-auto' src={'/benefits.png'} width={400} height={400} alt='benefits' />
                </div>
            </div>

        </div>
    )
}
