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
import { BellIcon, ChevronDown, Home, LayoutDashboardIcon, LogOut, Settings, User } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { useEffect, useState } from "react"
import { UserAuthThunk } from "@/cs-redux/thunks/app/user-auth.thunk"
import Link from "next/link"
import { ArrowLeftRight, BriefcaseBusiness, LayoutDashboard, ScrollText, Shapes, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Clients",
        url: "/clients",
        icon: Users,
    },
    {
        title: "Projects",
        url: "/projects",
        icon: BriefcaseBusiness,
    },
    {
        title: "Invoices",
        url: "/invoices",
        icon: ScrollText,
    },
    {
        title: "Items",
        url: "/items",
        icon: Shapes,
    },
    {
        title: "Transactions",
        url: "/transactions",
        icon: ArrowLeftRight,
    },

]

export default function UserRootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const dispatch = useCsDispatch();
    const pathname = usePathname();
    const router = useRouter()

    const { authUser } = useCsSelector(state => state.userAuth);


    useEffect(() => {
        dispatch(UserAuthThunk.session())
    }, [dispatch])


    return (
        <main>
            <nav className=' px-5 bg-accent backdrop-blur-2xl flex items-center gap-3 h-14 sticky top-0 z-50'>
                {/* LEFT */}
                <div className='flex items-center gap-3 grow h-full'>
                    <div onClick={() => router.push('/dashboard')} className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </div>

                    <div onClick={() => router.push('/dashboard')}>
                        <h2 className='text-2xl font-bold cursor-pointer'>{PROJECT_NAME}</h2>
                    </div>


                    {!pathname.startsWith('/settings') && <div className='flex items-center grow h-full '>
                        {
                            NavItems.map((item, i) => (
                                <div className={`h-full flex items-center text-sm border-y-2 border-t-transparent ${pathname.startsWith(item.url) ? " border-destructive" : "border-transparent"}`} key={`nav_item_${i + 6867}`}>
                                    <div className={` hover:bg-secondary  hover:text-foreground rounded transition-all duration-300 font-semibold ${pathname.startsWith(item.url) ? " text-foreground" : "text-muted-foreground"}`} >
                                        <Link className='px-2.5 py-1.5 flex items-center gap-1' href={item.url}>
                                            <item.icon size={15} />
                                            {item.title}
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>}
                </div>


                {/* RIGHT */}
                <div className='flex items-center gap-3 h-full'>
                    {/* <ThemeToggle /> */}
                    {!pathname.startsWith('/settings') && <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size={'sm'}>New <ChevronDown /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className=" space-y-1 py-2">
                            <DropdownMenuLabel className="text-muted-foreground">Create New</DropdownMenuLabel>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push('/clients/new')}>Client</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push('/projects/new')}>Project</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push('/invoices/new')}>Invoice</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push('/items?open=true')}>Item</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>}

                    <Menubar className='p-0 bg-transparent rounded-full border-0 '>
                        <MenubarMenu>
                            <MenubarTrigger className={`cursor-pointer bg-background/50 hover:bg-muted  rounded-full border h-full aspect-square px-0 py-0 text-accent-foreground grid place-items-center `}>
                                <User size={16} />
                            </MenubarTrigger>
                            <MenubarContent align='end' className='w-[13rem] px-3 py-3'>
                                <div className='mb-3'>
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{authUser?.name}</span>
                                            <span className="truncate text-xs">{authUser?.primaryEmail}</span>
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
                                <MenubarItem onClick={() => router.push('/home')}>
                                    Home Page
                                    <MenubarShortcut><Home /></MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem variant='destructive' onClick={() => { dispatch(UserAuthThunk.logout()); router.replace('/auth/login') }}>
                                    Logout <MenubarShortcut><LogOut /></MenubarShortcut>
                                </MenubarItem>

                                <MenubarSeparator />
                                <Button onClick={() => toast('Currently Pro Version is not available')} className='mt-3 w-full' size={'sm'}>Upgrade to Pro</Button>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            </nav>



            <div >
                {children}
            </div>
        </main>
    )
}

