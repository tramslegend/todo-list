import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className=''>
            <div className='px-5 py-3 flex items-center justify-between h-14 '>
                <Link href={'/'} className='flex items-center gap-3 cursor-pointer'>
                    <div className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </div>

                    <div >
                        <h2 className='text-2xl font-bold '>{PROJECT_NAME}</h2>
                    </div>
                </Link>

            </div>
            <div className='grid place-items-center h-[calc(100vh-3.5rem)]'>
                {children}
            </div>
        </div>
    )
}
