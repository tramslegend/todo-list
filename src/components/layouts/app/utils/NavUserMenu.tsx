"use client"

import { Home, LayoutDashboardIcon, LogOut, Settings, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { useRouter } from "next/navigation";
import { ThemeToggle2 } from '@/components/theme/ThemeToggle2';
import { toast } from 'sonner';
import { UserAuthThunk } from '@/cs-redux/thunks/app/user-auth.thunk';
import { useEffect, useState } from 'react';
import { OrganizationAction } from '@/cs-redux/thunks/app/organization.action';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';

export default function NavUserMenu() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { authUser } = useCsSelector(state => state.userAuth);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(UserAuthThunk.session())
    }, [dispatch])

    useEffect(() => {
        dispatch(OrganizationAction.getDefaultOrg())
    }, [dispatch])
    return (
        <div>
            <Button size={'icon'} variant={'outline'} className="rounded-full" onClick={() => { setOpen(true) }}><User /></Button>

            <Popover open={open} onOpenChange={() => { setOpen(false) }}>
                <PopoverTrigger>

                </PopoverTrigger>
                <PopoverContent className="w-60">
                    <Command>
                        {/* <CommandInput placeholder="Type a command or search..." /> */}
                        <div className='mb-3'>
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{authUser?.name}</span>
                                    <span className="truncate text-xs">{authUser?.primaryEmail}</span>
                                </div>
                            </div>
                        </div>
                        <CommandList>
                            <Link href={`/dashboard`} onClick={() => setOpen(false)}>
                                <CommandItem className='cursor-pointer'>
                                    Dashboard
                                    <CommandShortcut><LayoutDashboardIcon /></CommandShortcut>
                                </CommandItem>
                            </Link>
                            <Link href={`/settings`} onClick={() => setOpen(false)}>
                                <CommandItem className='cursor-pointer'>
                                    Setting
                                    <CommandShortcut><Settings /></CommandShortcut>
                                </CommandItem>
                            </Link>
                            <Link href={`/home`} onClick={() => setOpen(false)}>
                                <CommandItem className='cursor-pointer'>
                                    Home Page
                                    <CommandShortcut><Home /></CommandShortcut>
                                </CommandItem>
                            </Link>

                            <CommandSeparator className='my-2' />

                            <div className="text-sm px-2 py-1.5 flex items-center justify-between">
                                <span className="grow">Theme</span>
                                <ThemeToggle2 />
                            </div>


                            <div onClick={() => { dispatch(UserAuthThunk.logout()); router.replace('/auth/login'); setOpen(false) }} >
                                <CommandItem className='!text-destructive hover:!text-destructive cursor-pointer'>
                                    Logout <CommandShortcut><LogOut className='!text-destructive hover:!text-destructive' /></CommandShortcut>
                                </CommandItem>
                            </div>

                            <CommandSeparator className='my-2' />
                            <Button onClick={() => { toast.info('Pro features are coming soon...'); setOpen(false) }} className='mt-3 w-full' size={'sm'}>Upgrade to Pro</Button>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* <Menubar className='p-0 bg-transparent rounded-full border-0 '>
                <MenubarMenu >
                    <MenubarTrigger className={`cursor-pointer bg-background/50 hover:bg-muted  rounded-full border h-full aspect-square px-0 py-0 text-accent-foreground grid place-items-center `}>

                    </MenubarTrigger>
                    <MenubarContent align='end' className='w-[13rem] px-3 py-3'>
                        
                        <MenubarSeparator />
                        <MenubarItem onClick={() => router.push('/dashboard')}>
                            Dashboard
                            <MenubarShortcut><LayoutDashboardIcon /></MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => router.push('/settings/account')}>
                            Setting
                            <MenubarShortcut><Settings /></MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem onClick={() => router.push('/home')}>
                            Home Page
                            <MenubarShortcut><Home /></MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <div className="px-3 py-1 text-sm flex items-center justify-between">
                            <span className="grow">Theme</span>
                            <ThemeToggle2 />
                        </div>
                        <MenubarSeparator />
                        <MenubarItem variant='destructive' onClick={() => { dispatch(UserAuthThunk.logout()); router.replace('/auth/login') }}>
                            Logout <MenubarShortcut><LogOut /></MenubarShortcut>
                        </MenubarItem>

                        <MenubarSeparator />
                        <Button onClick={() => toast.info('Pro features are coming soon...')} className='mt-3 w-full' size={'sm'}>Upgrade to Pro</Button>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar> */}
        </div>
    )
}
