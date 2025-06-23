"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CsImages } from "@/constants/image";
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
import Image from "next/image";
import Link from "next/link";
import OAuthButtons from "@/components/utils/OAuthButtons";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { UserAuthThunk } from "@/cs-redux/thunks/app/user-auth.thunk";
import { useRouter } from "next/navigation";

export default function SignupPage() {

    const dispatch = useCsDispatch();
    const router = useRouter();
    const { loading } = useCsSelector(state => state.userAuth);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    async function onSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!name) return toast.error("Enter Full Name");
        else if (!email) return toast.error("Enter Email Address");

        // Dispatch Signup
        const res = await dispatch(UserAuthThunk.signup({ name, email }));
        if (res.payload.message) {
            setToken(res.payload.token)
            setHasAccount(res.payload.hasAccount)
            router.push(`/auth/signup?token=${res.payload.token}`);
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }

    }

    async function verifyEmailSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!otp || otp.length !== 6) return toast.error("Enter OTP");
        else if (!token) return toast.error("Something went wrong. Please try again!");

        // Dispatch Verify Signup
        const res = await dispatch(UserAuthThunk.verifySignup({ otp, token }));
        if (res.payload.message) {
            router.replace('/dashboard');
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }

    }



    return (
        <div className="px-3">
            <div className="flex flex-col items-center border rounded py-7 bg-muted/20">
                <div className=" rounded px-3 md:px-0 w-sm max-w-xs">
                    {!token ? <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-center mb-3">Sign Up to {PROJECT_NAME} <br /></h1>

                        <form onSubmit={onSignUp} className="space-y-3">
                            <Input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Full Name" />
                            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email Address" />
                            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Processing..." : "Sign Up with Email"}</Button>
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
                            <form onSubmit={verifyEmailSignup} className="flex items-center flex-col">
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
                                <Button type="submit" className="mt-5 w-full" disabled={loading}>{loading ? "Processing..." : "Verify"}</Button>
                            </form>
                            <div className="flex items-center justify-center ">
                                <button onClick={() => setToken('')} className="cursor-pointer text-blue-500 flex items-center gap-2 border-b border-b-transparent hover:border-b-blue-500" ><MoveLeft className="mt-1" size={15} /><span>Back</span></button>
                            </div>
                        </div>
                    }
                </div>
                <div className="mt-9 text-center space-y-5 px-3">
                    <p className="text-xs text-muted-foreground/70">By joining, you agree to our
                        <Link className="font-semibold mx-1 text-muted-foreground hover:border-b border-b-foreground/50 border-dotted" href={'#'}>Terms of Service</Link>
                        and
                        <Link className="font-semibold mx-1 text-muted-foreground hover:border-b border-b-foreground/50 border-dotted" href={'#'}>Privacy Policy</Link>
                    </p>
                    <p>Already have an account? <Link className="text-blue-500 font-bold hover:underline ms-1 mt-" href={'/auth/login'}>Log In</Link></p>
                </div>
            </div>
        </div>
    )
}
