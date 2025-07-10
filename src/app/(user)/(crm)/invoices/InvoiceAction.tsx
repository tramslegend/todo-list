'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CrmInvoiceStatus } from "@/constants/crm.constant";
import { useCsDispatch } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { IInvoiceModel } from "@/types/crm/invoice.type";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InvoiceAction({ invoice }: { invoice: IInvoiceModel, }) {
    const router = useRouter();
    const dispatch = useCsDispatch();

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
        const { payload } = await dispatch(InvoiceThunk.delete({ id: invoice._id }));

        if (payload.message) {
            toast.success(payload.message);
            router.replace('/invoices')
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
                <DropdownMenuItem disabled={invoice && (invoice.status !== CrmInvoiceStatus.DRAFT)} className={dropdownItemClassName} onClick={() => router.push(`/invoices/new?id=${invoice?._id}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={() => toast('Not implemented')}>Send Invoice</DropdownMenuItem>
                <DropdownMenuItem disabled={invoice && (invoice.totalAmount === invoice.amountPaid)} className={dropdownItemClassName} onClick={() => router.push(`/invoices/${invoice?._id}?payment=true`)}>Make Payment</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={invoice?.isArchived ? onRestore : onArchive}>{invoice?.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={onDelete}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
