"use client"
import { CircleUserRound, LucideIcon, Palette, ShieldUser } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface CsSettingsMenuItem {
    label: string;
    url: string;
    icon: LucideIcon;
}

const CsSettingsMenu: CsSettingsMenuItem[] = [

    {
        label: 'Account Settings',
        url: '/admin/settings/account',
        icon: CircleUserRound,
    },
    {
        label: 'Admin User',
        url: '/admin/settings/admin-user',
        icon: ShieldUser,
    },

] as const;

function getPageHeading(path: string): string {
    return CsSettingsMenu.filter((item) => item.url === path)[0].label;
}

export default function AdminSettingsLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();

    return (
        <div className='flex items-start justify-start w-full h-full'>
            <div className=' w-[13rem]  h-[calc(100vh-4rem)] sticky top-16'>
                <div className='px-3 py-2 bg-secondary/80 h-12 flex items-center border-e border-secondary-foreground/10'>
                    <h3 className='font-bold  text-xl '>Settings</h3>
                </div>
                <div className='px-1.5 py-2 space-y-1.5 border-e h-full'>
                    {
                        CsSettingsMenu.map((item: CsSettingsMenuItem, i: number) => (
                            <div className='text-secondary-foreground/90 px-1.5 py-1 rounded flex items-center gap-1.5 text-[12px] cursor-pointer hover:bg-secondary' key={`settings_menu_item_${i + 3628457}`} onClick={() => { router.push(item.url) }}>
                                <item.icon size={15} />
                                <span>{item.label}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='grow min-h-svh '>

                {children}
            </div>
        </div>
    )
}
