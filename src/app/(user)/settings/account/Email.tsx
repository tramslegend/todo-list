"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyP, TypographySmall, } from "@/components/ui/typography"
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { PROJECT_NAME } from "@/root.config";
import { BadgeCheckIcon, Ellipsis, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { UserAccountThunk } from "@/cs-redux/thunks/app/user-account.thunk";
import { UserAuthThunk } from "@/cs-redux/thunks/app/user-auth.thunk";

export default function Email() {
    const dispatch = useCsDispatch();
    const { authUser } = useCsSelector(state => state.userAuth);
    const { loading } = useCsSelector(state => state.userAccount);

    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false)



    async function onAddEmail() {
        if (!email) return toast.error('Enter email address');

        const res = await dispatch(UserAccountThunk.addEmail({ email }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            setToken(res.payload.token)
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }

    }

    async function onVerify() {
        if (!otp || otp.length !== 6) return toast.error('Enter OTP');

        const res = await dispatch(UserAccountThunk.addEmailVerify({ otp, token }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            setToken('')
            setOpen(false)
            dispatch(UserAuthThunk.session());
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }


    async function onUpdatePrimaryEmail(email: string) {

        const res = await dispatch(UserAccountThunk.updatePrimaryEmail({ email }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            dispatch(UserAuthThunk.session());
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }


    async function onDeleteEmail(email: string) {

        const res = await dispatch(UserAccountThunk.removeEmail({ email }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            dispatch(UserAuthThunk.session());
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
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
                                    {e?.primary &&
                                        <Badge variant="secondary" className="bg-green-500 text-white dark:bg-green-600" >
                                            Primary
                                        </Badge>
                                    }
                                    {e?.verified &&
                                        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600" >
                                            <BadgeCheckIcon />
                                            Verified
                                        </Badge>
                                    }
                                </div>

                                <div className="space-x-3">
                                    {!e?.primary && <Button onClick={() => { onUpdatePrimaryEmail(e.address) }} disabled={e?.primary} size={'sm'} variant={'ghost'}>Set as Primary</Button>}
                                    <Button onClick={() => { onDeleteEmail(e.address) }} disabled={e?.primary} size={'icon'} variant={'ghost'}><Trash className="text-red-800" /></Button>
                                </div>
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
