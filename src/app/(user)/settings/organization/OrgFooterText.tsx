"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import SpinLoader from "@/components/utils/SpinLoader"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { OrganizationAction } from "@/cs-redux/thunks/app/organization.action"
import { useEffect, useState } from "react"
import { toast } from "sonner"



export default function OrgFooterText() {
    const dispatch = useCsDispatch();
    const { organization, } = useCsSelector(state => state.organization);
    const [footerText, setFooterText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)



    useEffect(() => {
        if (organization) {
            setFooterText(organization.footerText || '')
        }
    }, [organization])


    async function onSave() {
        setLoading(true);

        const res = await dispatch(OrganizationAction.updateFooterText({ footerText }))

        if (res.payload.message) {
            toast.success(res.payload.message)
        }
        else if (res.payload.error) {
            toast.error(res.payload.error)
        }
        setLoading(false);
    }
    return (
        <Card className="px-5">
            <div>
                <TypographyH3 className="mb-1">Invoice Footer Text</TypographyH3>
                <TypographyP className="text-muted-foreground">Enter footer text. It will reflect on invoice footer</TypographyP>
                <Input id="footerText-1" name="footerText" className="w-full mt-4" value={footerText} onChange={e => setFooterText(e.target.value)} type="text" placeholder="Footer text" />
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">These value will be applied on invoice footer. Remove this if you don&prime;t want any footer on invoice.</TypographyP>
                <Button onClick={onSave}>{loading ? <SpinLoader /> : "Save"}</Button>
            </div>
        </Card>
    )
}
