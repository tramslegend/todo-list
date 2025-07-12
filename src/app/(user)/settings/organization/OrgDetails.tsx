"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { ChangeEvent, useState } from "react"

const defaultValue = {
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
}

export default function OrgDetails() {
    const [formData, setFormData] = useState(defaultValue)

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function onSave() {

    }
    return (
        <Card className="px-5">
            <div>
                <div className="mb-5">
                    <TypographyH3 className="mb-1">Organization Details</TypographyH3>
                    <TypographyP className="text-muted-foreground">Add your organization&prime;s branding information to be displayed on invoices and reports.</TypographyP>
                </div>

                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Label htmlFor="name-1">Organization Name:</Label>
                            <Input id="name-1" name="name" value={formData.name} onChange={handleOnChange} type="text" className="w-full mt-1.5" placeholder="Organization name" />
                            <TypographyP className="text-muted-foreground text-[11px] mt-0.5">Organization name must be 3 to 35 characters </TypographyP>
                        </div>
                        <div>
                            <Label htmlFor="email-1">Email:</Label>
                            <Input id="email-1" name="email" value={formData.email} onChange={handleOnChange} type="email" className="w-full mt-1.5" placeholder="Email Address" />
                            <TypographyP className="text-muted-foreground text-[11px] mt-0.5">Enter a valid email address your clients can use to contact you.</TypographyP>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Label htmlFor="phone-1">Phone:</Label>
                            <Input id="phone-1" name="phone" value={formData.phone} onChange={handleOnChange} type="number" className="w-full mt-1.5" placeholder="Phone Number" />
                            <TypographyP className="text-muted-foreground text-[11px] mt-0.5">Provide a 10-digit phone number where clients can reach your organization.</TypographyP>
                        </div>
                        <div>
                            <Label htmlFor="website-1">Website:</Label>
                            <Input id="website-1" name="website" value={formData.website} onChange={handleOnChange} type="text" className="w-full mt-1.5" placeholder="https://www.example.com" />
                            <TypographyP className="text-muted-foreground text-[11px] mt-0.5">Add your organization’s website (optional).</TypographyP>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="address-1">Address:</Label>
                        <Input id="address-1" name="address" value={formData.address} onChange={handleOnChange} type="text" className="w-full mt-1.5" placeholder="Full Address..." />
                        <TypographyP className="text-muted-foreground text-[11px] mt-0.5">Enter your office or business address.</TypographyP>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
                <TypographyP className="text-muted-foreground">This information will be used for invoice branding & communication.</TypographyP>
                <Button onClick={onSave}>Save</Button>
            </div>
        </Card>
    )
}
