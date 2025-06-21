"use client"
import AdminSettingsHeader from '@/components/layouts/admin/admin-settings-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import AdminAccountThunk from '@/cs-redux/thunks/admin/admin-account.thunk'
import { AdminAuthThunk } from '@/cs-redux/thunks/admin/admin-auth.thunk'
import { Pen, UserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function page() {
    const { authAdmin } = useCsSelector(state => state.auth);
    const adminAccount = useCsSelector(state => state.adminAccount);
    const dispatch = useCsDispatch();


    // Name ...
    const [name, setName] = useState<string>('')

    async function changeName() {
        if (!name) return toast.error('Enter your full name');

        const res = await dispatch(AdminAccountThunk.UpdateSelfAccountDetails({ name }));
        if (res.payload?.message) {
            toast.success("Name updated");
            dispatch(AdminAuthThunk.GetAuthAdmin());
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    // Email ...
    const [email, setEmail] = useState<string>('')
    const [emailOtpSent, setEmailOtpSent] = useState<boolean>(false)
    const [emailOtp, setEmailOtp] = useState<string>('')

    async function sendEmailOTP() {
        if (!email) return toast.error('Enter email address');

        const res = await dispatch(AdminAccountThunk.VerifySelfEmail({ email }));
        if (res.payload?.message) {
            toast.success(res.payload?.message);
            setEmailOtpSent(true);
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    async function changeEmail() {
        if (!email) return toast.error('Enter email address');
        else if (!emailOtp) return toast.error('Enter OTP');
        else if (!emailOtpSent) {
            setEmailOtpSent(false);
            setEmail(authAdmin?.email!);
            return toast.error('Something went wrong! Try again latter');
        }

        const res = await dispatch(AdminAccountThunk.UpdateSelfEmail({ email, otp: emailOtp }));
        if (res.payload?.message) {
            toast.success(res.payload?.message);
            setEmailOtpSent(false);
            setEmailOtp('');
            dispatch(AdminAuthThunk.GetAuthAdmin());
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    // Phone ...
    const [phone, setPhone] = useState<string>('')
    async function changePhone() {
        if (!phone || phone.length !== 10) return toast.error('Enter 10 digit phone number')

        const res = await dispatch(AdminAccountThunk.UpdateSelfAccountDetails({ phone }));
        if (res.payload?.message) {
            toast.success("Phone number updated");
            dispatch(AdminAuthThunk.GetAuthAdmin());
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    // Password ...
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [cnfPassword, setCnfPassword] = useState<string>('')

    async function changePassword() {
        if (!password) return toast.error('Enter current password')
        else if (!newPassword) return toast.error('Enter new password')
        else if (newPassword.length < 8) return toast.error('Password must be 8 character')
        else if (!cnfPassword) return toast.error('Confirm new password')
        else if (newPassword !== cnfPassword) return toast.error('Confirm password doesn\'t match')

        const res = await dispatch(AdminAccountThunk.UpdateSelfPassword({ password, newPassword }));
        if (res.payload?.message) {
            toast.success("Password Updated");
            dispatch(AdminAuthThunk.GetAuthAdmin());
            setPassword('');
            setNewPassword('');
            setCnfPassword('');
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    useEffect(() => {
        if (authAdmin?.name) setName(authAdmin?.name)
        if (authAdmin?.email) setEmail(authAdmin?.email)
        if (authAdmin?.phone) setPhone(authAdmin?.phone)
    }, [authAdmin])

    return (
        <>
            <AdminSettingsHeader title='Public Profile'>
            </AdminSettingsHeader>

            <div className='px-3 py-2'>
                <div className='rounded-full aspect-square w-36 bg-muted/50 border relative grid place-items-center'>
                    <UserRound size={50} className='text-muted-foreground' />
                    {/* <Button className='absolute bottom-2 right-0 border' variant={'secondary'} size={'sm'}> <Pen />Edit</Button> */}
                </div>


                <div className='mt-5 space-y-1 '>
                    <Label htmlFor='name'>Name</Label>
                    <div className='flex items-center gap-3'>
                        <Input className='max-w-sm' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        {(authAdmin && name !== authAdmin?.name) && <Button onClick={changeName} size={'sm'}>Save</Button>}
                    </div>
                </div>


                <div className='mt-7 space-y-1 '>
                    <Label htmlFor='email'>Email</Label>
                    {!emailOtpSent &&
                        <div className='flex items-center gap-3'>
                            <Input disabled={emailOtpSent || adminAccount.loading} className='max-w-sm' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            {(authAdmin && email !== authAdmin?.email) && <Button disabled={emailOtpSent || adminAccount.loading} onClick={sendEmailOTP} size={'sm'}>{adminAccount.loading ? "Sending OTP..." : "Send OTP"}</Button>}
                        </div>
                    }
                    {
                        emailOtpSent &&
                        <div className='flex items-center gap-3 mt-3'>
                            <Input className='max-w-[19rem]' id='email' type='email' value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} />
                            <Button disabled={emailOtp.length !== 6 || adminAccount.loading} onClick={changeEmail} size={'sm'}>{adminAccount.loading ? "Verifying OTP..." : "Verify"}</Button>
                        </div>
                    }
                </div>

                <div className='mt-7 space-y-1 '>
                    <Label htmlFor='name'>Phone</Label>
                    <div className='flex items-center gap-3'>
                        <Input className='max-w-sm' id='name' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {(authAdmin && phone !== authAdmin?.phone) && <Button disabled={phone.length !== 10 || adminAccount.loading} onClick={changePhone} size={'sm'}>Save</Button>}
                    </div>
                </div>

                <div className='mt-7 space-y-1'>
                    <h4 className='font-bold text-lg'>Change Password</h4>

                    <div className='space-y-3 mt-3'>
                        <div className='space-y-1 max-w-sm'>
                            <Label htmlFor='password'>Current Password</Label>
                            <PasswordInput id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='* * * * * * * * * *' />
                        </div>
                        <div className='space-y-1 max-w-sm'>
                            <Label htmlFor='new-password'>New Password</Label>
                            <PasswordInput id='new-password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='* * * * * * * * * *' />
                        </div>
                        <div className='space-y-1 max-w-sm'>
                            <Label htmlFor='cnf-new-password'>Confirm New Password</Label>
                            <PasswordInput id='cnf-new-password' value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} placeholder='* * * * * * * * * *' />
                        </div>

                        <Button disabled={adminAccount.loading} onClick={changePassword} size={'sm'}>Change Password</Button>
                    </div>

                </div>

            </div>
        </>
    )
}
