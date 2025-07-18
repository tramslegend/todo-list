import { ThemeToggle2 } from '@/components/theme/ThemeToggle2'
import Container from '@/components/utils/Container'
import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <footer className='pt-12 mt-10'>
            <Container className=' '>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <div>
                        <div className='flex items-center gap-2.5'>
                            <div className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                                <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                                <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                            </div>
                            <p className='font-bold text-2xl'>{PROJECT_NAME}</p>
                        </div>

                        <p className='text-muted-foreground text-sm mt-3'>A great platform for Freelancer and Medium Small Organizations</p>
                        <p className='text-muted-foreground text-sm '>to manage their Client, Project, Invoice, Transaction & all...</p>
                    </div>


                    <div>
                        <p className='font-bold text-2xl'>Contact Us</p>
                        <p className='text-muted-foreground text-sm '>Feel free to contact us any time for any kind of query or discussion</p>

                        <div className='mt-5'>
                            <a className='flex items-center gap-2' href="mailto:contact@codingsamrat.com"><Mail /> contact@codingsamrat.com</a>
                        </div>
                    </div>
                    <div className='flex'><ThemeToggle2 /></div>

                </div>
                <div>
                    <p className='text-xs text-muted-foreground text-center mt-5 pb-2'>Copyright &copy; - {new Date().getFullYear()} | codingsamrat.com </p>
                </div>
            </Container>
        </footer>
    )
}
