"use client"

import { CrmProjectStatus } from "@/constants/crm.constant";
import { useEffect, useState } from "react";


export default function ProjectStatus({ id, status }: { id: string; status: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    useEffect(() => {
        switch (status) {
            case CrmProjectStatus.PENDING:
                setColor('bg-accent border-accent')
                break;

            default:
                setColor('bg-accent/10')
                break;
        }
    }, [status])

    return (
        <p className={`border text-xs px-2 py-1 rounded-full text-center ${color}`}>
            {status}
        </p>
    )
}