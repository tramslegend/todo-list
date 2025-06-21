"use client"
import AdminSettingsHeader from '@/components/layouts/admin/admin-settings-header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import BaseLoader from '@/components/utils/loader'
import { CsRoleItem } from '@/components/utils/role'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import AdminAccountSlice from '@/cs-redux/slices/admin/admin-account.slice'
import AdminAccountThunk from '@/cs-redux/thunks/admin/admin-account.thunk'
import { Archive, ArchiveRestore, Pen, RectangleEllipsis, Trash, UserRound } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AdminUserProfileView() {
    const params = useParams();
    const id = params.id!.toString();
    const dispatch = useCsDispatch();
    const router = useRouter();
    const { adminUser, notFound, loading } = useCsSelector(state => state.adminAccount);
    const { authAdmin } = useCsSelector(state => state.auth);

    useEffect(() => {
        if (id) dispatch(AdminAccountThunk.GetById({ id }));
        return (() => {
            dispatch(AdminAccountSlice.actions.resetAdminUser({}));
        })

    }, [dispatch, id])

    // Name ...
    const [name, setName] = useState<string>('')
    async function updateName() {
        if (!name) return toast.error('Enter your full name');

        const res = await dispatch(AdminAccountThunk.UpdateDetailsById({ id, body: { name } }));
        if (res.payload?.message) {
            toast.success("Name updated");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    // Phone Number ...
    const [phone, setPhone] = useState<string>('')
    async function updatePhone() {
        if (!phone) return toast.error('Enter phone number');
        if (phone.length !== 10) return toast.error('Phone number must be 10 digit');

        const res = await dispatch(AdminAccountThunk.UpdateDetailsById({ id, body: { phone } }));
        if (res.payload?.message) {
            toast.success("Phone number updated");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    // Email Address ...
    const [email, setEmail] = useState<string>('')
    async function updateEmail() {
        if (!email) return toast.error('Enter email address');

        const res = await dispatch(AdminAccountThunk.UpdateEmailById({ id, email }));
        if (res.payload?.message) {
            toast.success("Email address updated");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    // Password ...
    const [password, setPassword] = useState<string>('')
    async function updatePassword() {
        if (!password) return toast.error('Enter password');
        if (password.length < 8) return toast.error('Password must be at least 8 character');

        const res = await dispatch(AdminAccountThunk.UpdatePasswordById({ id, password }));
        if (res.payload?.message) {
            toast.success("Password updated");
            setPassword('')
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    // Roles ...
    const [roles, setRoles] = useState<string[]>([])
    async function updateRoles() {

        const res = await dispatch(AdminAccountThunk.UpdateRolesById({ id, roles }));
        if (res.payload?.message) {
            toast.success("Roles updated");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    async function archive() {

        const res = await dispatch(AdminAccountThunk.Archive({ id }));
        if (res.payload?.message) {
            toast.success("Admin user added to archive");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }


    async function unarchive() {
        const res = await dispatch(AdminAccountThunk.Unarchive({ id }));
        if (res.payload?.message) {
            toast.success("Admin user restored from archive");
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    async function deleteAdmin() {
        if (!authAdmin?.isSuperAdmin) return toast.error('Not Allowed');

        const res = await dispatch(AdminAccountThunk.Delete({ id }));
        if (res.payload?.message) {
            toast.success("[Dev Only] Admin user deleted");
            router.back();
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }



    useEffect(() => {
        if (adminUser?.name) setName(adminUser?.name)
        if (adminUser?.phone) setPhone(adminUser?.phone)
        if (adminUser?.email) setEmail(adminUser?.email)
        if (adminUser?.roles) setRoles(adminUser?.roles)
    }, [adminUser])

    return (
        <>
            <AdminSettingsHeader title='Admin User Profile' loading={loading}>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="secondary" title='Update Password'><RectangleEllipsis /></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Update Password</DialogTitle>
                                <DialogDescription>
                                    Update the admin user login password. Remember this action can&prime;t be undone!
                                </DialogDescription>
                            </DialogHeader>
                            <div className="">
                                <Label htmlFor="Password">Password</Label>
                                <div className='max-w-sm mt-2'>
                                    <PasswordInput id='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose onClick={() => setPassword('')} asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button disabled={password.length < 8} onClick={updatePassword} >Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
                {adminUser?.isArchived ?
                    <Button onClick={unarchive} className='' variant={'secondary'} title='Restore User' size={'sm'}><ArchiveRestore /></Button>
                    :
                    <Button onClick={archive} className='' variant={'destructive'} title='Archive User' size={'sm'}><Archive /></Button>
                }
                {authAdmin?.isSuperAdmin && <Button onClick={deleteAdmin} className='' variant={'destructive'} size={'sm'}><Trash /></Button>}
            </AdminSettingsHeader>

            {
                notFound ?
                    <p>404 | Not Found</p>
                    :
                    <div className='px-3 py-2'>
                        <div className='rounded-full aspect-square w-36 bg-muted/50 border relative grid place-items-center'>
                            <UserRound size={50} className='text-muted-foreground' />
                        </div>


                        <div className='mt-5 space-y-1 '>
                            <Label htmlFor='name'>Name</Label>
                            <div className='flex items-center gap-3'>
                                <Input className='max-w-sm' id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name' />
                                {(adminUser && name !== adminUser?.name) && <Button onClick={updateName} size={'sm'}>Save</Button>}
                            </div>
                        </div>


                        <div className='mt-5 space-y-1 '>
                            <Label htmlFor='Phone'>Phone</Label>
                            <div className='flex items-center gap-3'>
                                <Input className='max-w-sm' id='Phone' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='10 digit phone number' />
                                {(adminUser && phone !== adminUser?.phone) && <Button disabled={phone.length !== 10} onClick={updatePhone} size={'sm'}>Save</Button>}
                            </div>
                        </div>


                        <div className='mt-5 space-y-1 '>
                            <Label htmlFor='Email'>Email</Label>
                            <div className='flex items-center gap-3'>
                                <Input className='max-w-sm' id='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' />
                                {(adminUser && email !== adminUser?.email) && <Button disabled={!email} onClick={updateEmail} size={'sm'}>Save</Button>}
                            </div>
                        </div>


                        <div className='mt-5 space-y-1 '>

                            <Label htmlFor='Roles'>Roles <Button size={'sm'} variant={'ghost'}><Pen /></Button></Label>
                            <div className='flex items-center gap-3'>
                                {adminUser?.roles!.length === 0 ?
                                    <div>
                                        <span className='text-xs text-muted-foreground'>No Role...</span>
                                    </div>
                                    :
                                    adminUser?.roles!.map((role: string) => (<CsRoleItem key={role}>{role}</CsRoleItem>))
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
