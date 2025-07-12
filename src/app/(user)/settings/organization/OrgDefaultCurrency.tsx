"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import CurrencySelector from "@/components/utils/CurrencySelector"
import { currencies } from "@/constants/currencies"
import { CsUtils } from "@/cs-toolkit"
import { ICurrency } from "@/types"
import { useState } from "react"



export default function OrgDefaultCurrency() {
    const [currency, setCurrency] = useState<ICurrency>(CsUtils.findByProperty(currencies, 'code', 'INR')!)



    async function onSave() {

    }
    return (
        <Card className="px-5">
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
                <Button onClick={onSave}>Save</Button>
            </div>
        </Card>
    )
}
