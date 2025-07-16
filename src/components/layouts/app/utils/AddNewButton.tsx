'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function AddNewButton() {
    const pathname = usePathname();
    const router = useRouter()

    return (
        <div>
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
                    <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push('/items?new=true')}>Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
        </div>
    )
}
