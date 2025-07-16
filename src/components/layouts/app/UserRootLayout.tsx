"use client"




import { LOGO, LOGO_DARK, PROJECT_NAME } from '@/root.config'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import AddNewButton from "@/components/layouts/app/utils/AddNewButton"
import NavUserMenu from '@/components/layouts/app/utils/NavUserMenu'
import FeedBackForm from '@/components/layouts/app/utils/FeedBackForm'
import Link from 'next/link'
import { ArrowLeftRight, BriefcaseBusiness, LayoutDashboard, ScrollText, Shapes, Users } from "lucide-react";

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
    const pathname = usePathname();

    return (
        <main>
            <nav className=' px-5 bg-accent backdrop-blur-2xl flex items-center gap-3 h-14 sticky top-0 z-50'>
                {/* LEFT */}
                <div className='flex items-center gap-3 grow h-full'>
                    <Link href={'/dashboard'} className="cursor-pointer flex aspect-square size-8 items-center justify-center rounded-full">
                        <Image className='dark:hidden' src={LOGO} width={156} height={156} alt={PROJECT_NAME} />
                        <Image className='dark:inline hidden' src={LOGO_DARK} width={156} height={156} alt={PROJECT_NAME} />
                    </Link>

                    <Link href={'/dashboard'}>
                        <h2 className='text-2xl font-bold cursor-pointer'>{PROJECT_NAME}</h2>
                    </Link>


                    {/* CRM NAV MENU */}
                    {!pathname.startsWith('/settings') && <div className='flex items-center grow h-full '>
                        {NavItems.map((item, i) => (
                            <div className={`h-full flex items-center text-sm border-y-2 border-t-transparent ${pathname.startsWith(item.url) ? " border-destructive" : "border-transparent"}`} key={`nav_item_${i + 6867}`}>
                                <div className={` hover:bg-secondary  hover:text-foreground rounded transition-all duration-300 font-semibold ${pathname.startsWith(item.url) ? " text-foreground" : "text-muted-foreground"}`} >
                                    <Link className='px-2.5 py-1.5 flex items-center gap-1' href={item.url}>
                                        <item.icon size={15} />
                                        {item.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    }
                </div>


                {/* RIGHT */}
                <div className='flex items-center gap-3 h-full'>

                    {/* ADD NEW BUTTONS */}
                    <AddNewButton />

                    <FeedBackForm />

                    {/* NAV USER- also handle session & organization */}
                    <NavUserMenu />
                </div>
            </nav>


            <div >
                {children}
            </div>
        </main>
    )
}

