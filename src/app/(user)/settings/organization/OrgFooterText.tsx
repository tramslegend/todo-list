"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { useState } from "react"



export default function OrgFooterText() {
    const [footerText, setFooterText] = useState<string>('')



    async function onSave() {

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
                <Button onClick={onSave}>Save</Button>
            </div>
        </Card>
    )
}
