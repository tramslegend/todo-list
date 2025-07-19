import { Button } from '@/components/ui/button'
import { TypographyH1, TypographyH4 } from '@/components/ui/typography'
import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config'
import Image from 'next/image'
import React from 'react'
import PlusIcon from '../PlusIcon'
import { Atom, Video } from 'lucide-react'
import FloatingCircles from './FloatingCircles'
import BottomColorFade from './BottomColorFade'
import TorchGlow from './TorchGlow'
import Link from 'next/link'

export default function Hero() {
    return (
        <section>
            <div className='border-y border-x h-[35rem] text-center grid place-items-center px-3 relative'>
                <FloatingCircles />
                <TorchGlow />
                <div>
                    {/* <PlusIcon size={20} className='absolute -top-[11px] -left-[10px]' /> */}
                    <PlusIcon size={20} className='absolute -top-[11px] -right-[10px]' />
                    <PlusIcon size={20} className='absolute -bottom-[10px] -left-[11px]' />
                </div>

                <div className='relative'>
                    <TypographyH1 >We&prime;re here to Increase your Productivity</TypographyH1>
                    <p className='text-muted-foreground text-lg mt-3'>A great platform for Freelancer and Medium Small Organizations</p>
                    <p className='text-muted-foreground text-lg '>to manage their Client, Project, Invoice, Transaction & all...</p>

                    <div className='space-x-3 mt-12 flex items-center justify-center'>
                        <Link href={'/auth/signup'}><Button size={'sm'}>Start Free Now</Button></Link>
                        <Button size={'sm'} variant={'outline'}><Video />Live Demo</Button>
                    </div>

                    <div className="mt-16 grid place-items-center">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </div>
                </div>
            </div>
            <div className='border-b border-x h-[15rem] text-center grid place-items-center px-3 relative'>
                <div className='grid place-items-center gap-8'>
                    <p className='text-2xl font-semibold '>Create Client Profile, Manage Project, Send Invoice</p>
                    <Atom size={30} className='text-muted-foreground' />
                </div>
            </div>
        </section>

    )
}
