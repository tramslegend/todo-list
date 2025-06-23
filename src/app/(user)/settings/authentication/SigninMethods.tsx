"use client"


import { Button } from '@/components/ui/button';
import { TypographyH3, TypographyP } from '@/components/ui/typography'
import { CsImages } from '@/constants/image';
import { useCsSelector } from '@/cs-redux';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react'

export default function SigninMethods() {
    const { authUser } = useCsSelector(state => state.userAuth);

    return (
        <div className='border rounded-lg px-7 py-6 bg-muted/60'>
            <div>
                <TypographyH3 className="mb-3">Sign-in Methods</TypographyH3>
                <TypographyP>Customize how you wanna access your account. Link your GitHub profile and Google Account for seamless, secure authentication.</TypographyP>
            </div>
            <div className='mt-5 border rounded-lg bg-background/90'>
                <div className='flex items-center justify-between gap-3 min-h-16 px-3'>
                    <div className='w-8 aspect-square grid place-items-center'>
                        <Mail />
                    </div>
                    <div className='grow'>
                        <p className='font-bold'>Email</p>
                        <TypographyP className='text-muted-foreground'>{authUser?.emails.slice(0, 3).map(e => e.address).join(", ")}</TypographyP>
                    </div>
                    <div className=''>
                        <Button variant={'secondary'} size={'sm'}><Link href={'/settings/account#email'}>Manage</Link></Button>
                    </div>
                </div>
                <hr />
                <div className='flex items-center justify-between gap-3 min-h-16 px-3'>
                    <div className='w-8 aspect-square grid place-items-center'>
                        <Image className="w-6 h-auto" src={CsImages.googleLogo} width={100} height={100} alt="Google Sign in" />
                    </div>
                    <div className='grow'>
                        <p className='font-bold leading-4'>Google</p>
                        <TypographyP className='text-muted-foreground'>Connect your Google account</TypographyP>
                    </div>
                    <div className=''>
                        <Button size={'sm'}>Connect</Button>
                    </div>
                </div>
                <hr />
                <div className='flex items-center justify-between gap-3 min-h-16 px-3'>
                    <div className='w-8 aspect-square grid place-items-center'>
                        <Image className="w-6 h-auto" src={CsImages.githubLogo} width={100} height={100} alt="Google Sign in" />
                    </div>
                    <div className='grow'>
                        <p className='font-bold leading-4'>GitHub</p>
                        <TypographyP className='text-muted-foreground'>Connect your GitHub account</TypographyP>
                    </div>
                    <div className=''>
                        <Button size={'sm'}>Connect</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}



function SigninMethodCard({ children, image }: { image?: string; children?: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

