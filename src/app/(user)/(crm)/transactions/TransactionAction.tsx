'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCsDispatch } from "@/cs-redux";
import { InvoiceThunk } from "@/cs-redux/thunks/app/crm/invoice.thunk";
import { TransactionThunk } from "@/cs-redux/thunks/app/crm/transaction.thunk";
import { ITransactionModel } from "@/types/crm/transaction.type";
import { EllipsisVertical } from "lucide-react";
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
import { useRouter } from "next/navigation";

export default function TransactionAction({ transaction }: { transaction: ITransactionModel, }) {
    const dispatch = useCsDispatch();
    const router = useRouter();

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openNoEmailDialog, setOpenNoEmailDialog] = useState<boolean>(false);

    // async function send() {
    //     toast.info("Sending Email");

    //     const { payload } = await dispatch(TransactionThunk.sendPaymentReceipt({ id: transaction._id, clientId: transaction.clientId }));

    //     if (payload.message) {
    //         toast.success(payload.message);
    //     }
    //     else if (payload.error) {
    //         toast.error(payload.error);
    //         if (payload.error === "No Email") {
    //             setOpenNoEmailDialog(true);
    //         }
    //     }
    // }


    async function onDelete() {
        // return toast.info(transaction.amount)

        const res = await dispatch(TransactionThunk.delete({ id: transaction._id }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            dispatch(InvoiceThunk.getById({ id: res.payload.transaction.invoiceId }));
            setOpenDeleteDialog(false)
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }
    }


    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" space-y-1 py-2">
                    {/* <DropdownMenuItem className={dropdownItemClassName} onClick={send}>{transaction.isSent ? "Resend" : "Send"}</DropdownMenuItem> */}
                    <DropdownMenuItem className={dropdownItemClassName} onClick={() => setOpenDeleteDialog(true)}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={openDeleteDialog} onOpenChange={() => { setOpenDeleteDialog(false) }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Transaction?</DialogTitle>
                        <DialogDescription>
                            This action is irreversible. It will permanently remove the transaction associated with <strong>Invoice No - {transaction.invoiceNumber}</strong> from the system.
                            <br />
                            Please note: This will also update the related invoice&prime;s payment status and amount.
                        </DialogDescription>
                    </DialogHeader>


                    <DialogFooter>
                        <Button variant={'outline'} onClick={() => { setOpenDeleteDialog(false) }}>Cancel</Button>
                        <Button variant={'destructive'} onClick={onDelete}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openNoEmailDialog} onOpenChange={() => { setOpenNoEmailDialog(false) }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>⚠️ No Email!</DialogTitle>
                        <DialogDescription>
                            The associate client dose not have any email. An email is needed for sending the payment receipt. Do you want to add email?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-3">
                        <DialogClose asChild><Button variant={'outline'} size={'sm'}>Cancel</Button></DialogClose>
                        <Button variant={'default'} size={'sm'} onClick={() => router.push(`/clients/new?id=${transaction.clientId}`)}>Add Email</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
