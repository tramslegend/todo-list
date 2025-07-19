"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CsImages } from '@/constants/image'
import { auth, githubProvider, googleProvider, signInWithPopup } from '@/configs/firebase.config'
import { toast } from 'sonner'
import ApiManager from '@/configs/api.config'
import { useRouter } from 'next/navigation'
import { useCsDispatch } from '@/cs-redux'
import { UserAuthThunk } from '@/cs-redux/thunks/app/user-auth.thunk'

export default function OAuthButtons() {
    const router = useRouter()
    const dispatch = useCsDispatch();

    async function onClickButton(provider: 'google' | 'github') {

        let _provider = null;
        switch (provider) {
            case 'github':
                _provider = githubProvider;
                break;
            case 'google':
                _provider = googleProvider;
                break;
            default:
                _provider = null
                break;
        }

        if (!_provider) return toast.error('Something went wrong! Please try again later.')


        try {
            const result = await signInWithPopup(auth, _provider);
            const token = await result.user.getIdToken();


            // Call api to actual login
            const { payload } = await dispatch(UserAuthThunk.continueWithOAuth({ token }));

            if (payload.message) {
                toast.success(payload.message);
                router.replace('/dashboard');
            }
            else if (payload.error) {
                toast.error(payload.error);
            }


        } catch (err) {
            console.error(err);
        }

        // Check response
        console.log('Google OAuth');
    }



    return (
        <div className="flex flex-col gap-3 w-full">
            <Button onClick={() => onClickButton('google')} variant={'outline'}>
                <Image className="w-6 h-auto" src={CsImages.googleLogo} width={100} height={100} alt="Signup with Google" />
                <span>Continue with Google</span>
            </Button>
            <Button onClick={() => onClickButton('github')} variant={'outline'}>
                <Image className="w-6 h-auto" src={CsImages.githubLogo} width={100} height={100} alt="Signup with Github" />
                <span>Continue with GitHub</span>
            </Button>
        </div>
    )
}
