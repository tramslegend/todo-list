"use client"

import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ArrowRight, Crown, User, } from 'lucide-react'
import { useCsDispatch, useCsSelector } from '@/cs-redux'
import { TsIAdmin } from '@/types/admin.t'
import AdminSettingsHeader from '@/components/layouts/admin/admin-settings-header'
import Link from 'next/link'
import { CsRoleItem } from '@/components/utils/role'
import { AddAdminUserForm } from './AddAdminUserForm'
import AdminAccountThunk from '@/cs-redux/thunks/admin/admin-account.thunk'

export default function CsAdminUserListView() {
    const { allAdmin } = useCsSelector(state => state.adminAccount);
    const dispatch = useCsDispatch();

    useEffect(() => {
        dispatch(AdminAccountThunk.GetAll());
    }, [dispatch])
    return (
        <div className=''>
            <AdminSettingsHeader title='Admin Users'>
                <AddAdminUserForm />
            </AdminSettingsHeader>

            <Table>
                <TableCaption>A list of all Admin User</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Avatar</TableHead>
                        <TableHead >Name</TableHead>
                        <TableHead >Email</TableHead>
                        <TableHead >Phone</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead className='w-24'>Status</TableHead>
                        <TableHead className=" w-24">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAdmin.map((admin: TsIAdmin, i: number) => (
                            <TableRow key={`admin_id_${8762346 + i}`}>
                                <TableCell className="font-medium">
                                    <div className='w-10 aspect-square bg-muted rounded-full grid place-items-center'>
                                        <User className='text-muted-foreground' />
                                    </div>
                                </TableCell>
                                <TableCell ><div className='flex items-center gap-1'>{admin.isSuperAdmin && <Crown size={10} color='orange' />}{admin.name}</div></TableCell>
                                <TableCell >{admin.email}</TableCell>
                                <TableCell >{admin.phone ? admin.phone : "- - -"}</TableCell>
                                <TableCell className=''>
                                    {admin.roles!.length === 0 ?
                                        <span>- - -</span>
                                        :
                                        admin.roles!.map((role: string) => (<CsRoleItem key={role}>{role}</CsRoleItem>))
                                    }
                                </TableCell>
                                <TableCell className={`w-24`}><span className={`border text-xs px-1 py-0.5 rounded ${!admin.isArchived ? "border-green-400 text-green-100 bg-green-900" : "border-red-400 text-red-100 bg-red-900"}`}>{!admin.isArchived ? "Active" : "Archived"}</span></TableCell>
                                <TableCell className='w-24'>
                                    <div className=''>
                                        <Link href={`/admin/settings/admin-user/${admin._id}`}>
                                            <button className='cursor-pointer px-1 py-0.5'  ><ArrowRight className='text-blue-500' /></button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}




