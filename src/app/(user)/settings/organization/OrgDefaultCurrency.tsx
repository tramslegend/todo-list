"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import CurrencySelector from "@/components/utils/CurrencySelector"
import SpinLoader from "@/components/utils/SpinLoader"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { OrganizationAction } from "@/cs-redux/thunks/app/organization.action"
import { DEFAULT_CURRENCY } from "@/root.config"
import { ICurrency } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"



export default function OrgDefaultCurrency() {
    const dispatch = useCsDispatch();
    // const { organization, } = useCsSelector(state => state.organization);
    const [currency, setCurrency] = useState<ICurrency>(DEFAULT_CURRENCY)
    const [loading, setLoading] = useState<boolean>(false)

    // useEffect(() => {
    //     if (organization) {
    //         setCurrency(organization.currency)
    //     }
    // }, [organization])


    async function onSave() {
        // setLoading(true);
        // if (!currency) return toast.error("Organization name is requeued!")

        // const res = await dispatch(OrganizationAction.updateCurrency({ currency }))

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
                <TypographyH3 className="mb-1">Default Currency</TypographyH3>
                <TypographyP className="text-muted-foreground">Set up default currency that will be automatically applied across invoices, items and transactions.</TypographyP>
                <div className="mt-4 w-xs">
                    <CurrencySelector currency={currency} setCurrency={setCurrency} />
                </div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">Selected currency will be applied to all new invoices by default.</TypographyP>
                <Button disabled onClick={onSave}>{loading ? <SpinLoader /> : "Save"}</Button>
            </div>
        </Card>
    )
}
