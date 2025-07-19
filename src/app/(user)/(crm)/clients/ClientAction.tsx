'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { IClientModel } from "@/types/crm/client.type";
import { EllipsisVertical } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TypographyP } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ClientAction({ client }: { client: IClientModel, }) {
    const router = useRouter();
    const pathName = usePathname();
    const dispatch = useCsDispatch();
    const { cascadeData, loading } = useCsSelector(state => state.client);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [forceDelete, setForceDelete] = useState<boolean>(false);

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
        if (!cascadeData.canDelete && !forceDelete) return;
        const { payload } = await dispatch(ClientThunk.delete({ id: client._id }));

        if (payload.message) {
            toast.success(payload.message);
            router.replace('/clients');
            setOpenDelete(false);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    function getCascade() {
        setOpenDelete(true)
        dispatch(ClientThunk.getCascadeData({ id: client._id }));
    }

    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                    {/* <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/clients/${client?._id}`)}>Details</DropdownMenuItem> */}
                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/clients/new?id=${client?._id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={client?.isArchived ? onRestore : onArchive}>{client?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={getCascade}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDelete} onOpenChange={() => { setOpenDelete(false) }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Invoice?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete <strong>Client - {client.name}</strong> from the system.
                        </DialogDescription>
                    </DialogHeader>
                    {!loading ?
                        <div>
                            {(cascadeData.projects.length !== 0 || cascadeData.invoices.length !== 0 || cascadeData.transactions.length !== 0) &&
                                <div className="border border-destructive/20 bg-destructive/5 p-4 rounded-md mt-4">
                                    <TypographyP className="text-destructive mb-3">
                                        This client has many reference and cannot be deleted directly.
                                        If you proceed, the following references will also be deleted.
                                        Are you sure you want to continue?
                                    </TypographyP>
                                    <TypographyP className="text-muted-foreground font-semibold">References:</TypographyP>
                                    <TypographyP className="text-muted-foreground ps-5">• Projects: {cascadeData.projects.length}</TypographyP>
                                    <TypographyP className="text-muted-foreground ps-5">• Invoices: {cascadeData.invoices.length}</TypographyP>
                                    <TypographyP className="text-muted-foreground ps-5">• Transactions: {cascadeData.transactions.length}</TypographyP>


                                    <div className="flex items-center space-x-2 mt-9">
                                        <Checkbox checked={forceDelete} onCheckedChange={(c) => setForceDelete(c as boolean)} id="force-delete" />
                                        <Label htmlFor="force-delete">I understand and want to force delete this client.</Label>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div className="w-full  grid place-items-center">
                            {/* <SpinLoader /> */}
                        </div>
                    }
                    <DialogFooter className="mt-3">
                        <DialogClose asChild><Button variant={'outline'} size={'sm'}>Go Back</Button></DialogClose>
                        <Button disabled={loading || (!cascadeData.canDelete && !forceDelete)} variant={'destructive'} size={'sm'} onClick={onDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
