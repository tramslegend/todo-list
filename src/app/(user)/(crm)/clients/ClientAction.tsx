'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch } from "@/cs-redux";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { IClientModel } from "@/types/crm/client.type";
import { EllipsisVertical } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ClientAction({ client }: { client: IClientModel, }) {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useCsDispatch();

    async function onArchive() {
        const { payload } = await dispatch(ClientThunk.archive({ id: client._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    async function onRestore() {
        const { payload } = await dispatch(ClientThunk.restore({ id: client._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    async function onDelete() {
        const { payload } = await dispatch(ClientThunk.delete({ id: client._id }));

        if (payload.message) {
            toast.success(payload.message);
            router.replace('/clients')
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" space-y-1 py-2">
                {/* <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/clients/${client?._id}`)}>Details</DropdownMenuItem> */}
                <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/clients/new?id=${client?._id}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={client?.isArchived ? onRestore : onArchive}>{client?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={onDelete}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
