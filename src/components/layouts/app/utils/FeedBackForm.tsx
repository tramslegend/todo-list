"use client"

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { MessageSquareDot } from "lucide-react";
import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FeedbackType, IFeedbackType } from "@/constants";
import { toast } from "sonner";

export default function FeedBackForm() {
    const [open, setOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState<IFeedbackType>(FeedbackType.FEEDBACK);
    const [message, setMessage] = useState<string>('');

    async function onSubmit() {
        if (!message) return toast.error('Please enter your feedback then submit!')

        console.log({ message, feedbackType })
    }

    function clearForm() {
        setFeedbackType(FeedbackType.FEEDBACK);
        setMessage('')
    }

    return (
        <div>
            <Button size={'icon'} variant={'outline'} className="rounded-full" onClick={() => { setOpen(true); clearForm() }}><MessageSquareDot /></Button>
            <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
                <DialogTrigger> </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>We&prime;d Love Your Feedback</DialogTitle>
                        <DialogDescription>
                            Help us improve by sharing your thoughts. Your feedback is valuable and helps us build a better experience.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 mt-4">
                        <div className="space-y-2">
                            <RadioGroup value={feedbackType} onValueChange={(v: IFeedbackType) => setFeedbackType(v)} className="flex">
                                {
                                    Object.values(FeedbackType).map((f) => (
                                        <div className="flex items-center space-x-2" key={f}>
                                            <RadioGroupItem value={f} id={f} />
                                            <Label htmlFor={f}>{f}</Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" >Message</Label>
                            <Textarea value={message} onChange={e => setMessage(e.target.value)} id="message" placeholder="Write your feedback here..." rows={4} />
                        </div>
                    </div>
                    <DialogFooter className="mt-3">
                        <DialogClose asChild><Button variant={'outline'} size={'sm'}>Cancel</Button></DialogClose>
                        <Button onClick={onSubmit} size={'sm'}>Submit Feedback</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
