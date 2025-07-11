'use client'

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk"
import { IClientModel } from "@/types/crm/client.type"
import { Grid, MoveRight, Plus, SquareMenu } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ClientAction from "./ClientAction"
import MainPageHeader from "@/components/utils/MainPageHeader"
import PaginationButton from "@/components/utils/PaginationButton"
import Container from "@/components/utils/Container"

export default function CrmClientsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const searchParams = useSearchParams();
    const { allClient } = useCsSelector(state => state.client);


    // Pagination & Fetch Data
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [limit, setLimit] = useState<number>(30);
    const [query, setQuery] = useState<string>('');

    // Reset to page 1 if query changes

    useEffect(() => {
        dispatch(ClientThunk.getAll({ page: currentPage, limit, query }))
    }, [dispatch, limit, currentPage, query])


    return (
        <div>
            <MainPageHeader title="Clients" setQuery={setQuery}>
                <Button size={'icon'} variant={'outline'}><Plus /></Button>
            </MainPageHeader>
            <Container>
                <Table>
                    <TableCaption>{allClient?.data.length ? "A list of your clients" : <>No client available, <Link className="text-blue-600" href={'/clients/new'}>Create Now</Link></>}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">##</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="max-w-[12rem]">Address</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {allClient && <TableBody className="border-b">
                        {allClient.data?.map((client: IClientModel, i: number) => (
                            <TableRow key={`client_${i + 7863456}`}>
                                <TableCell className="font-medium w-[50px]">{(i + 1).toString().padStart(2, '0')}</TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell className="max-w-[12rem] overflow-hidden">
                                    {client.address && client.address.length > 35
                                        ? `${client.address.slice(0, 35)}...`
                                        : client.address}
                                </TableCell>
                                <TableCell className={`${client.isIndividual && "text-muted-foreground"}`}>{client.companyName ? client.companyName : "Individual"}</TableCell>
                                <TableCell className="text-right w-[100px] flex items-center justify-end">
                                    <Button variant={'ghost'} onClick={() => { router.push(`/clients/${client._id}`) }}><SquareMenu /></Button>
                                    <ClientAction client={client} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>

                {allClient && <PaginationButton limit={limit} setLimit={setLimit} query={query} totalPages={allClient.pagination.totalPages} />}
            </Container>
        </div>
    )
}
