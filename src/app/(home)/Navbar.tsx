'use client'; // for Next.js App Router (if you're using that)

import { useEffect, useState } from 'react';
import clsx from 'clsx'; // Optional: for cleaner className handling
import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config';
import Image from 'next/image';
import Link from 'next/link';
import HomeUser from './HomeUser';


export default function Navbar() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 1); // Change to `> 0` if you want even 1px
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={clsx('bg-background backdrop-blur-lg sticky top-0 z-50', hasScrolled && "border-b")}>
            <div className='px-5 py-3 flex items-center justify-between h-14 max-w-[99rem] mx-auto'>
                <Link href={'/'} className='flex items-center gap-3 cursor-pointer'>
                    <div className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </div>

                    <div >
                        <h2 className='text-2xl font-bold '>{PROJECT_NAME}</h2>
                    </div>
                </Link>
                <HomeUser />
            </div>
        </nav>
    );
}
