"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import NotAvailable from "@/components/utils/NotAvailable"
import SpinLoader from "@/components/utils/SpinLoader"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { OrganizationAction } from "@/cs-redux/thunks/app/organization.action"
import { useEffect, useState } from "react"
import { toast } from "sonner"



export default function OrgEmail() {
    const dispatch = useCsDispatch();
    const { organization, } = useCsSelector(state => state.organization);
    const [taxId, setTaxId] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (organization) {
            setTaxId(organization.taxId)
        }
    }, [organization])


    async function onSave() {
        // setLoading(true);
        // if (!taxId) return toast.error("Tax ID is requeued!")

        // const res = await dispatch(OrganizationAction...)

        // if (res.payload.message) {
        //     toast.success(res.payload.message)
        // }
        // else if (res.payload.error) {
        //     toast.error(res.payload.error)
        // }
        // setLoading(false);
    }
    return (
        <Card className="px-5 text-muted-foreground">
            <div>
                <TypographyH3 className="mb-1">Personalize Sender Email</TypographyH3>
                <TypographyP className="text-muted-foreground">Configure your own email address to send invoices and receipts directly to clients.</TypographyP>
                <div className="mt-4 ">
                    <NotAvailable />
                </div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">This ensures your communication comes from your brand and builds trust with your clients.</TypographyP>
                <Button disabled onClick={onSave}>{loading ? <SpinLoader /> : "Save"}</Button>
            </div>
        </Card>
    )
}
