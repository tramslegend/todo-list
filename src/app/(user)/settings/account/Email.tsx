"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyP, TypographySmall, } from "@/components/ui/typography"
import { useCsSelector } from "@/cs-redux";
import { PROJECT_NAME } from "@/root.config";
import { BadgeCheckIcon, Ellipsis, Plus } from "lucide-react";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function Email() {
    const { authUser } = useCsSelector(state => state.userAuth);
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false)
    let loading;


    async function onAddEmail() {
        if (!email) return toast.error('Enter email address');
        setToken('k')
        console.log(email)

    }

    async function onVerify() {
        if (!otp || otp.length !== 6) return toast.error('Enter OTP');
        setToken('')
        setOpen(false)
        console.log(email)

    }

    useEffect(() => {

        if (!open) {
            setEmail('')
            setOtp('')
        }
    }, [open]);

    return (
        <Card className="px-5" id="email">
            <div>
                <TypographyH3 className="mb-3">Email</TypographyH3>
                <TypographyP>Enter the email addresses you want to use to log in with {PROJECT_NAME}. Your primary email will be used for account-related notifications.</TypographyP>
                {/* <Input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" className="max-w-xs mt-3" /> */}
                <div className="mt-5">
                    {
                        authUser?.emails.map((e, i) => (
                            <div key={`email_878${i}`} className="border rounded px-5 py-3 flex items-center gap-3">
                                <div className="flex items-center gap-3 grow">
                                    <p className="font-semibold">{e.address}</p>
                                    {e.primary &&
                                        <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600" >
                                            Primary
                                        </Badge>
                                    }
                                    {e.verified &&
                                        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600" >
                                            <BadgeCheckIcon />
                                            Verified
                                        </Badge>
                                    }
                                </div>

                                <Button size={'icon'} variant={'ghost'}><Ellipsis /></Button>
                            </div>
                        ))
                    }
                </div>
                <div className=" mt-5">
                    {open &&
                        <>{token ?
                            <div>
                                <Label className="mb-2">OTP:</Label>
                                <InputOTP value={otp} onChange={otp => setOtp(otp)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                <TypographySmall className="text-muted-foreground">An OTP sent to your email. Verify that to complete email adding.</TypographySmall>
                                <br />
                                <Button size={'sm'} className="mt-3" onClick={onVerify} disabled={loading}>{loading ? "Processing..." : "Verify"} </Button>
                            </div>
                            :
                            <div className="space-y-1.5 text-muted-foreground  mt-2">
                                <div>
                                    <Label className="mb-2">Email:</Label>
                                    <Input className="w-xs" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                                    <TypographySmall>Add a new email address to your account. Once This email is verified, can be used to login to your account.</TypographySmall>
                                </div>
                                <div className="space-x-3 mt-3">
                                    <Button size={'sm'} variant={'outline'} onClick={() => setOpen(false)}> Cancel</Button>
                                    <Button size={'sm'} onClick={onAddEmail} disabled={loading}>{loading ? "Processing..." : "Add Email"}</Button>
                                </div>
                            </div>
                        }</>
                    }
                    {!open && <Button variant={'outline'} onClick={() => setOpen(true)}> <Plus />Add Another</Button>}
                </div>

            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">Emails must be verified to be able to login with them or be used as primary email.</TypographyP>
            </div>
        </Card>
    )
}
