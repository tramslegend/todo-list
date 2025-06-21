"use client"
import { Button } from "@/components/ui/button";
import { Filter, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CsSearchbar from "../admin/sidebar/nav-searchbar";
import Container from "@/components/utils/Container";

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
        icon: LayoutDashboard,
    },
    {
        title: "Services",
        url: "/services",
        icon: LayoutDashboard,
    },
    {
        title: "Invoices",
        url: "/invoices",
        icon: LayoutDashboard,
    },
    {
        title: "Transactions",
        url: "/transactions",
        icon: LayoutDashboard,
    },

]
export default function CrmLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();


    return (
        <div>
            <div className='flex items-center sticky top-0 left-0 border-b z-50 bg-accent backdrop-blur-2xl h-12 px-3'>
                <div className='flex items-center grow h-full'>
                    {
                        NavItems.map((item, i) => (
                            <div className={`h-full flex items-center text-sm border-b-2 ${pathname.startsWith(item.url) ? " border-destructive" : "border-transparent"}`} key={`nav_item_${i + 6867}`}>
                                <div className={` hover:bg-secondary  hover:text-foreground rounded transition-all duration-300 font-semibold ${pathname.startsWith(item.url) ? " text-foreground" : "text-muted-foreground"}`} >
                                    <Link className='px-2.5 py-1.5 flex items-center gap-1' href={item.url}>
                                        <item.icon size={15} />
                                        {item.title}
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='h-full flex items-center gap-3'>
                    <div className='grow h-8 max-w-xs w-xs'><CsSearchbar /></div>
                    <div className='flex items-center gap-3'>
                        <Button size={'icon'} variant={'outline'}> <Filter /></Button>
                        <Button size={'icon'} variant={'outline'}> <LayoutDashboard /></Button>
                        <Button className="rounded" size={'sm'} > Create New</Button>
                    </div>
                </div>
            </div>

            <Container>
                {children}
            </Container>
        </div>
    )
}
