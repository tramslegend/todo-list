"use client"

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"
import ArchivedClients from "./ArchivedClients";
import ArchivedProjects from "./ArchivedProjects";
import ArchivedInvoices from "./ArchivedInvoices";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import SearchInput from "@/components/utils/SearchInput";

export default function ArchivePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const filter = searchParams.get('filter');
    const [query, setQuery] = useState<string>('');


    useEffect(() => {
        if (!filter) {
            router.push('/settings/archive?filter=clients');
        }
    }, [filter, router]);

    useEffect(() => {
        setQuery('')
    }, [filter]);


    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <TypographyH3 className="my-3 grow">Archived <span className="capitalize">{filter}</span></TypographyH3>

                <div className='w-xs'><SearchInput setQuery={setQuery} /></div>

                <div className="rounded overflow-hidden">
                    <Button className="rounded-none" variant={filter === 'clients' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=clients')} size={'sm'}>Client</Button>
                    <Button className="rounded-none border-x" variant={filter === 'projects' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=projects')} size={'sm'}>Project</Button>
                    <Button className="rounded-none" variant={filter === 'invoices' ? "default" : "secondary"} onClick={() => router.push('/settings/archive?filter=invoices')} size={'sm'}>Invoice</Button>
                </div>
            </div>
            <div>
                {filter === 'clients' && <ArchivedClients query={query} />}
                {filter === 'projects' && <ArchivedProjects query={query} />}
                {filter === 'invoices' && <ArchivedInvoices query={query} />}
            </div>
        </div>
    )
}
