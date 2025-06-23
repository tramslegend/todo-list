"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CsImages } from '@/constants/image'

export default function OAuthButtons() {

    async function continueWithGoogle() {



        // Check response
        console.log('Google OAuth');
    }
    async function continueWithGitHub() {



        // Check response
        console.log('GitHub OAuth');
    }
    return (
        <div className="flex flex-col gap-3 w-full">
            <Button onClick={continueWithGoogle} variant={'outline'}>
                <Image className="w-6 h-auto" src={CsImages.googleLogo} width={100} height={100} alt="Signup with Google" />
                <span>Continue with Google</span>
            </Button>
            <Button onClick={continueWithGitHub} variant={'outline'}>
                <Image className="w-6 h-auto" src={CsImages.githubLogo} width={100} height={100} alt="Signup with Github" />
                <span>Continue with GitHub</span>
            </Button>
        </div>
    )
}
