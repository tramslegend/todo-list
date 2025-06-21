"use client"
import Container from "@/components/utils/Container";
import { LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = [
    {
        title: "Account Settings",
        url: "/settings/account",
        icon: LayoutDashboard,
    },
    {
        title: "Authentication",
        url: "/settings/authentication",
        icon: LayoutDashboard,
    },
    {
        title: "Billing",
        url: "/settings/billing",
        icon: LayoutDashboard,
    },
    {
        title: "Invoices",
        url: "/settings/invoices",
        icon: LayoutDashboard,
    },

]
export default function UserSettingsLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();


    return (
        <div className="">
            <div className='flex items-center sticky top-0 left-0 border-b z-50 bg-background/70 backdrop-blur-2xl h-16'>
                <Container>
                    {
                        NavItems.map((item, i) => (
                            <h2 className={`font-bold text-2xl ${!pathname.startsWith(item.url) && "hidden"}`} key={`nav_item_h_${i + 85678}`}>
                                {item.title}
                            </h2>
                        ))
                    }
                </Container>
            </div>

            <Container className="flex gap-3 overflow-visible relative w-full mt-3">
                <div className='w-60 sticky top-16 '>
                    {
                        NavItems.map((item, i) => (
                            <div className={` hover:bg-secondary  hover:text-foreground rounded transition-all duration-300 ${pathname.startsWith(item.url) ? " text-foreground" : "text-muted-foreground"} `} key={`nav_item_${i + 324534}`}>
                                <Link className='px-2.5 py-1.5 flex items-center gap-1' href={item.url}>
                                    {item.title}
                                </Link>
                            </div>
                        ))
                    }
                </div>
                <div className="grow">
                    {children}
                </div>
            </Container>
        </div>
    )
}
