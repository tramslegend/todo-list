"use client"

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"
import ArchivedClients from "./ArchivedClients";
import ArchivedProjects from "./ArchivedProjects";
import ArchivedInvoices from "./ArchivedInvoices";
import { TypographyH2 } from "@/components/ui/typography";

export default function ArchivePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const filter = searchParams.get('filter');

    return (
        <div>
            <div className="space-x-3">
                <Button variant={filter === 'clients' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=clients')}>Client</Button>
                <Button variant={filter === 'projects' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=projects')}>Project</Button>
                <Button variant={filter === 'invoices' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=invoices')}>Invoice</Button>
            </div>
            <TypographyH2 className="my-3">Archived Data</TypographyH2>
            <div>
                {filter === 'clients' && <ArchivedClients />}
                {filter === 'projects' && <ArchivedProjects />}
                {filter === 'invoices' && <ArchivedInvoices />}
            </div>
        </div>
    )
}
