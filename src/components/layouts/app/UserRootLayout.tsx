"use client"

import { Button } from "@/components/ui/button"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { BellIcon, LayoutDashboardIcon, LogOut, Settings, User } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCsDispatch } from "@/cs-redux"
import { useState } from "react"

export default function UserRootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const dispatch = useCsDispatch();
    const router = useRouter();

    const [user, setUser] = useState<{ name: string; avatar?: string; email: string }>({ name: 'Sam', email: 'sam@codingsamrat.com', })




    return (
        <main>
            <div className=' px-5 bg-accent backdrop-blur-2xl py-3 flex items-center gap-3 '>
                <div className='flex items-center gap-3 grow'>
                    <div onClick={() => router.push('/dashboard')} className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </div>

                    <div onClick={() => router.push('/dashboard')}>
                        <h2 className='text-2xl font-bold cursor-pointer'>{PROJECT_NAME}</h2>
                    </div>
                </div>


                <div className='flex items-center gap-3 h-full'>
                    <Button className={`rounded-full border h-full aspect-square px-0 py-0 text-accent-foreground grid place-items-center `} size="icon" variant="outline"  >
                        <BellIcon className="h-[1.2rem] w-[1.2rem] " />
                    </Button>

                    <ThemeToggle />

                    <Menubar className='p-0 bg-transparent rounded-full border-0 '>
                        <MenubarMenu>
                            <MenubarTrigger className={`cursor-pointer bg-background/50 hover:bg-muted  rounded-full border h-full aspect-square px-0 py-0 text-accent-foreground grid place-items-center `}>
                                <User size={16} />
                            </MenubarTrigger>
                            <MenubarContent align='end' className='w-[13rem] px-3 py-3'>
                                <div className='mb-3'>
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user?.name}</span>
                                            <span className="truncate text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <MenubarSeparator />
                                <MenubarItem onClick={() => router.push('/dashboard')}>
                                    Dashboard
                                    <MenubarShortcut><LayoutDashboardIcon /></MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={() => router.push('/settings/account')}>
                                    Account Setting

                                    <MenubarShortcut><Settings /></MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                {/* <MenubarItem onClick={() => navigate('/')}>
                                        Home Page
                                        <MenubarShortcut><Home /></MenubarShortcut>
                                    </MenubarItem> */}
                                <MenubarItem variant='destructive' onClick={() => toast.error('Method not implemented')}>
                                    Logout <MenubarShortcut><LogOut /></MenubarShortcut>
                                </MenubarItem>

                                <MenubarSeparator />
                                <Button onClick={() => toast('Currently Pro Version is not available')} className='mt-3 w-full' size={'sm'}>Upgrade to Pro</Button>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </div>



            <div >
                {children}
            </div>
        </main>
    )
}

