"use client"

import {
  Activity,
  Bell,
  Cloud,
  LayoutDashboard,
  Mails,
  Settings,
  Sun,
  TentTree,
  User,
  Users,
} from "lucide-react"


import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import CsNavHeader from "./sidebar/nav-header"
import CsNavMain from "./sidebar/nav-main"
import CsNavUser from "./sidebar/nav-user"
import CsSearchbar from "./sidebar/nav-searchbar"
import { useEffect } from "react"
import { useCsDispatch } from "@/cs-redux"
import CsNavUser2 from "./sidebar/nav-user2"
import { AdminAuthThunk } from "@/cs-redux/thunks/admin/admin-auth.thunk"
import { ThemeToggle } from "@/components/theme/ThemeToggle"



const data = {


  navMain: [
    {
      // label: "Default",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Users",
          url: "/admin/user",
          icon: User,
        },
        {
          title: "Destination",
          url: "/admin/destination",
          icon: TentTree,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    }
  ]
}
export default function CsAdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const dispatch = useCsDispatch();
  useEffect(() => {
    dispatch(AdminAuthThunk.GetAuthAdmin())
  }, [dispatch])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" >
        <CsNavHeader />

        <SidebarContent>
          <CsNavMain menuItems={data.navMain} />

        </SidebarContent>
        {/* <CsNavSecondary items={data.navSecondary} />
        <SidebarFooter>
          <CsNavUser />
        </SidebarFooter> */}
        <SidebarRail />
      </Sidebar>


      <SidebarInset>
        <header className="flex border-b h-16 sticky top-0 z-50 bg-muted/90 backdrop-blur shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12-">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className="w-sm h-8">
              <CsSearchbar />
            </div>
          </div>

          <div className="grow flex items-center justify-end mx-3 gap-x-3">
            <Button className='rounded-full' variant="outline" size="icon"><Bell /></Button>
            <ThemeToggle />
            <CsNavUser2 />
          </div>
        </header>
        <main className="">
          {children}
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}
