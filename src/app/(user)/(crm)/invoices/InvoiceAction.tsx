'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CrmInvoiceStatus } from "@/constants/crm.constant";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { IInvoiceModel } from "@/types/crm/invoice.type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
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
import SpinLoader from "@/components/utils/SpinLoader";
import { TypographyP } from "@/components/ui/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function InvoiceAction({ invoice }: { invoice: IInvoiceModel, }) {
    const router = useRouter();
    const dispatch = useCsDispatch();
    const { cascadeData, loading } = useCsSelector(state => state.invoice);

    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [forceDelete, setForceDelete] = useState<boolean>(false);

    async function onArchive() {
        const { payload } = await dispatch(InvoiceThunk.archive({ id: invoice._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    async function onRestore() {
        const { payload } = await dispatch(InvoiceThunk.restore({ id: invoice._id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    async function onDelete() {
        if (!cascadeData.canDelete && !forceDelete) return;

        const { payload } = await dispatch(InvoiceThunk.delete({ id: invoice._id }));

        if (payload.message) {
            toast.success(payload.message);
            router.replace('/invoices')
            setOpenDelete(false)
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    function getCascade() {
        setOpenDelete(true)
        dispatch(InvoiceThunk.getCascadeData({ id: invoice._id }));
    }

    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                    <DropdownMenuItem disabled={invoice && invoice.isSent} className={dropdownItemClassName} onClick={() => router.push(`/invoices/new?id=${invoice?._id}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => toast('Not implemented')}>{invoice.isSent ? "Resend Invoice" : "Send Invoice"}</DropdownMenuItem>
                    <DropdownMenuItem disabled={invoice && (invoice.totalAmount === invoice.amountPaid)} className={dropdownItemClassName} onClick={() => router.push(`/invoices/${invoice?._id}?payment=true`)}>Make Payment</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={invoice?.isArchived ? onRestore : onArchive}>{invoice?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                    <DropdownMenuItem className={dropdownItemClassName} onClick={getCascade}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openDelete} onOpenChange={() => { setOpenDelete(false) }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Invoice?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the invoice with <strong>Invoice No - {invoice.invoiceNumber}</strong> from the system.
                        </DialogDescription>
                    </DialogHeader>
                    {!loading ?
                        <div>
                            {cascadeData.transactions.length !== 0 && (
                                <div className="border border-destructive/20 bg-destructive/5 p-4 rounded-md mt-4">
                                    <TypographyP className="text-destructive mb-3">This invoice has related transactions and cannot be deleted directly. If you proceed, the following references will also be deleted. Are you sure you want to continue?</TypographyP>
                                    <TypographyP className="text-muted-foreground font-semibold">References:</TypographyP>
                                    <TypographyP className="text-muted-foreground ps-5">• Transactions: {cascadeData.transactions.length}</TypographyP>


                                    <div className="flex items-center space-x-2 mt-9">
                                        <Checkbox checked={forceDelete} onCheckedChange={(c) => setForceDelete(c as boolean)} id="force-delete" />
                                        <Label htmlFor="force-delete">I understand and want to force delete this invoice.</Label>
                                    </div>
                                </div>
                            )}
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
