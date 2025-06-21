"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export default function CsNavMain({
    menuItems
}: {
    menuItems: {
        label?: string;
        items: {
            title: string;
            url: string;
            icon: LucideIcon;
            items?: {
                title: string;
                url: string;
            }[];
        }[];
    }[];
}) {
    return (
        <>
            {
                menuItems.map((menuGroup, i) => (
                    <SidebarGroup key={`menu-item-${i + 657}`}>
                        {menuGroup.label && <SidebarGroupLabel>{menuGroup?.label}</SidebarGroupLabel>}
                        <SidebarMenu>
                            {
                                menuGroup.items.map((groupItem) => (
                                    groupItem.items ?
                                        <Collapsible key={groupItem.title} asChild className="group/collapsible" >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton tooltip={groupItem.title}>
                                                        {groupItem.icon && <groupItem.icon />}
                                                        <span>{groupItem.title}</span>
                                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {groupItem.items?.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                        :
                                        <SidebarMenuItem key={groupItem.title}>
                                            <SidebarMenuButton asChild size="sm">
                                                <Link href={groupItem.url}>
                                                    <groupItem.icon />
                                                    <span>{groupItem.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                ))

                            }
                        </SidebarMenu>
                    </SidebarGroup>
                ))

            }
        </>
    )
}
