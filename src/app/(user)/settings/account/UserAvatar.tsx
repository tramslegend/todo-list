"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyP, } from "@/components/ui/typography"
import { useCsSelector } from "@/cs-redux";
import { User } from "lucide-react";

export default function UserAvatar() {
    const { authUser } = useCsSelector(state => state.userAuth);
    return (
        <Card className="px-5">
            <div className="flex items-center justify-between w-full">
                <div>
                    <TypographyH3 className="mb-3">Avatar</TypographyH3>
                    <TypographyP>This is your avatar.</TypographyP>
                    <TypographyP>Click on the avatar to upload a custom one from your files.</TypographyP>
                </div>
                <div>
                    <Avatar className="w-22 h-22">
                        <AvatarImage src={authUser?.avatar} alt={authUser?.name} />
                        <AvatarFallback><User size={30} className="text-muted-foreground" /></AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <hr />
            <div>
                {/* <TypographyP className="text-muted-foreground">Avatar is optional but recommended</TypographyP> */}
                <TypographyP className="text-muted-foreground">This feature is not available for current version</TypographyP>
            </div>
        </Card>
    )
}
