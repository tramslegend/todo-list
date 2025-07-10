'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { TransactionThunk } from "@/cs-redux/thunks/app/crm/transaction.thunk";
import { ITransactionModel } from "@/types/crm/transaction.type";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

export default function TransactionAction({ transaction }: { transaction: ITransactionModel, }) {
    const dispatch = useCsDispatch();


    async function onDelete() {
        // return toast.info(transaction.amount)

        const res = await dispatch(TransactionThunk.delete({ id: transaction._id }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            dispatch(InvoiceThunk.getById({ id: res.payload.transaction.invoiceId }));
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }
    }


    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" space-y-1 py-2">
                <DropdownMenuItem className={dropdownItemClassName} onClick={() => { toast.info('Not implemented') }}>{transaction.isSent ? "Resend" : "Send"}</DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClassName} onClick={onDelete}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
