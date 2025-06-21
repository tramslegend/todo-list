"use client"

import {
    BadgeCheck,
    ChevronsUpDown,
    LogOut,
    Settings,
    User,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { AdminAuthThunk } from "@/cs-redux/thunks/admin/admin-auth.thunk"


export default function CsNavUser2() {
    const dispatch = useCsDispatch();
    const router = useRouter()

    const { authAdmin } = useCsSelector(state => state.auth)


    async function logoutUser() {
        const res = await dispatch(AdminAuthThunk.LogoutAdmin());

        if (res.payload?.message) {
            toast.success(res.payload?.message)
            router.push('/auth/login');
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='rounded-full' variant="outline" size="icon">
                    <Avatar className="h-full w-full rounded-full">
                        <AvatarImage src={authAdmin?.avatar} alt={authAdmin?.name} />
                        <AvatarFallback className="rounded-lg"><User size={15} /></AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={authAdmin?.avatar} alt={authAdmin?.name} />
                            <AvatarFallback className="rounded-lg"><User size={15} /></AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{authAdmin?.name}</span>
                            <span className="truncate text-xs">{authAdmin?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                    <Settings />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
