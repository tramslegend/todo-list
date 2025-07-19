"use client"

import NavUserMenu from '@/components/layouts/app/utils/NavUserMenu';
import { Button } from '@/components/ui/button'
import { useCsDispatch, useCsSelector } from '@/cs-redux';
import { UserAuthThunk } from '@/cs-redux/thunks/app/user-auth.thunk';
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function HomeUser() {
    const dispatch = useCsDispatch();
    const { authUser } = useCsSelector(state => state.userAuth);


    useEffect(() => {
        dispatch(UserAuthThunk.session())
    }, [dispatch])
    return (
        <div className='flex items-center gap-3'>
            <Link className='hidden md:block-' href={'/contact'}><Button variant={'outline'} size={'sm'}>Contact</Button></Link>
            {
                authUser ?
                    <>
                        <Link href={'/dashboard'}><Button size={'sm'}>Dashboard</Button></Link>
                        <NavUserMenu />
                    </>
                    :
                    <>
                        <Link href={'/auth/login'}><Button variant={'outline'} size={'sm'}>Log In</Button></Link>
                        <Link href={'/auth/signup'}><Button size={'sm'}>Sign Up</Button></Link>
                    </>
            }


        </div>
    )
}
