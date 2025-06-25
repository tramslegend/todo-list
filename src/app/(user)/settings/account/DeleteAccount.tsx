"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyP, } from "@/components/ui/typography"
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { PROJECT_NAME } from "@/root.config";
import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserAccountThunk } from "@/cs-redux/thunks/app/user-account.thunk";
import { useRouter } from "next/navigation";


export default function DeleteAccount() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const { authUser } = useCsSelector(state => state.userAuth);

    const [open, setOpen] = useState<boolean>(false)
    const [cnfMessage, setCnfMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')




    async function onDelete() {

        const res = await dispatch(UserAccountThunk.delete());
        if (res.payload.message) {
            toast.success(res.payload.message);
            router.replace('/');
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }


    function clearForm() {
        setEmail('')
        setCnfMessage('')
    }

    return (
        <Card className="px-5 border-destructive">
            <div>
                <TypographyH3 className="mb-3">Delete Account</TypographyH3>
                <TypographyP>Permanently delete your Personal Account and all of its contents from the {PROJECT_NAME} platform. This action con not be undone, so please continue with caution.</TypographyP>

            </div>
            <hr className="border-destructive/50" />
            <div className="flex items-center justify-end">
                <Button variant={'destructive'} onClick={() => setOpen(true)}>Delete Account</Button>

                <Dialog open={open} onOpenChange={() => { setOpen(false); clearForm() }}>
                    <DialogTrigger></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle >Permanently Delete Account</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-5 mt-5">
                            <div className="space-y-2 text-muted-foreground">
                                <Label>Enter your primary email <strong>{authUser?.primaryEmail}</strong> to continue:</Label>
                                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                            </div>
                            <div className="space-y-2 text-muted-foreground">
                                <Label>To Verify, type <strong>DELETE MY ACCOUNT</strong> bellow:</Label>
                                <Input value={cnfMessage} onChange={e => setCnfMessage(e.target.value)} />
                            </div>
                        </div>
                        <hr />
                        <DialogFooter >
                            <div className="flex items-center justify-between w-full ">
                                <DialogClose className="cursor-pointer">
                                    Cancel
                                </DialogClose>
                                <Button
                                    disabled={email !== authUser?.primaryEmail || cnfMessage !== "DELETE MY ACCOUNT"}
                                    variant={'destructive'} onClick={onDelete}>Delete</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    )
}
