"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyP, } from "@/components/ui/typography"
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { UserAccountThunk } from "@/cs-redux/thunks/app/user-account.thunk";
import { UserAuthThunk } from "@/cs-redux/thunks/app/user-auth.thunk";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DisplayName() {
    const dispatch = useCsDispatch();
    const { authUser } = useCsSelector(state => state.userAuth);
    const { loading } = useCsSelector(state => state.userAccount);
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (authUser?.name) {
            setName(authUser?.name);
        }
    }, [authUser])


    async function onSave() {
        if (name.length < 3 || name.length > 35) return toast.error('Display name must be 3 to 35 characters');

        const res = await dispatch(UserAccountThunk.updateName({ name }));
        if (res.payload.message) {
            toast.success(res.payload.message);
            dispatch(UserAuthThunk.session());
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }
    }

    return (
        <Card className="px-5">
            <div>
                <TypographyH3 className="mb-3">Display Name</TypographyH3>
                <TypographyP>Enter your legal name or display name you comfortable with</TypographyP>
                <Input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="max-w-xs mt-3" />
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">Display name must be 3 to 35 characters </TypographyP>
                <Button onClick={onSave}>Save</Button>
            </div>
        </Card>
    )
}
