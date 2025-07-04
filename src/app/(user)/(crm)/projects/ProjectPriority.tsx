"use client"

import { CrmProjectPriority, CrmProjectStatus } from "@/constants/crm.constant";
import { useEffect, useState } from "react";


export default function ProjectPriority({ id, priority }: { id: string; priority: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const [color, setColor] = useState<string>('')
    useEffect(() => {
        switch (priority) {
            case CrmProjectPriority.HIGH:
                setColor('bg-red-500/5 border-red-500/20 text-red-500 font-semibold')
                break;

            case CrmProjectPriority.MEDIUM:
                setColor('bg-green-500/5 border-green-500/20 text-green-500 font-semibold')
                break;

            case CrmProjectPriority.LOW:
                setColor('bg-yellow-500/5 border-yellow-500/20 text-yellow-500 font-semibold')
                break;

            default:
                setColor('bg-accent/10')
                break;
        }
    }, [priority])

    return (
        <p className={`border text-xs px-2 py-1 rounded-full text-center ${color}`}>
            {priority}
        </p>
    )
}