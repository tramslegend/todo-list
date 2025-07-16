"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquareDot } from "lucide-react";
import { useEffect, useState } from "react"

export default function FeedBackForm() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button size={'icon'} variant={'outline'} className="rounded-full" onClick={() => { setOpen(true) }}><MessageSquareDot /></Button>
            <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
                <DialogTrigger> </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
