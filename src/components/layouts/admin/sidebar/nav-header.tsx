
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { PROJECT_NAME } from '@/root.config'
import Image from 'next/image'



export default function CsNavHeader() {
    return (
        <SidebarHeader className='h-16'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                        <a href="#">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-full">
                                <Image src={'/logo.png'} width={156} height={156} alt={PROJECT_NAME} />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-bold text-lg leading-4">{PROJECT_NAME}</span>
                                <span className="text-[11px] text-muted-foreground">Admin</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

    )
}