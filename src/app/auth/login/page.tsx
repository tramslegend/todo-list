"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PROJECT_NAME } from "@/root.config";
import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link";
import OAuthButtons from "@/components/utils/OAuthButtons";

export default function LoginView() {


    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [noAccount, setNoAccount] = useState<boolean>(false);

    async function loginWithEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email) return toast.error("Enter Email Address");

        // Dispatch Login

        // Check response
        setToken('secret-token');
    }

    async function verifyEmailLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!otp || otp.length !== 6) return toast.error("Enter OTP");
        else if (!token) return toast.error("Something went wrong. Please try again!");


        // Dispatch Verify Login 

        // Check response

        console.log(otp)

    }


    return (
        <div className=" rounded px-3 md:px-0 w-sm max-w-xs">
            {!token ? <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-center mb-3">Log in to {PROJECT_NAME}</h1>

                <form onSubmit={loginWithEmail}>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email Address" />
                    <Button type="submit" className="mt-3 w-full" >Log in with Email</Button>
                </form>

                <Separator />

                <OAuthButtons />
            </div>
                :
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-2">Verify Email</h1>
                        <p className="text-sm text-muted-foreground text-center mb-3">we have sent a code to <strong>{email}</strong>. Enter it below to verify email ownership.</p>
                    </div>
                    <form onSubmit={verifyEmailLogin} className="flex items-center flex-col">
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
                        <Button type="submit" className="mt-5 w-full" >Log in with Email</Button>
                    </form>
                    <div className="flex items-center justify-center ">
                        <button onClick={() => setToken('')} className="cursor-pointer text-blue-500 flex items-center gap-2 border-b border-b-transparent hover:border-b-blue-500" ><MoveLeft className="mt-1" size={15} /><span>Back</span></button>
                    </div>
                </div>
            }


            <div className="mt-7 text-center">
                <p>Don&prime;t have an account? <Link className="text-blue-500 font-bold hover:underline ms-1" href={'/auth/signup'}>Sign Up</Link></p>
            </div>
        </div>
    )
}
