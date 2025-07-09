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
import { MoveRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ClientAction from "./ClientAction"

export default function CrmClientsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(40)

    const { allClient } = useCsSelector(state => state.client);
    const { query } = useCsSelector(state => state.global);


    useEffect(() => {
        dispatch(ClientThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, page, query])

    return (
        <div>
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
                                <Button variant={'ghost'} onClick={() => { router.push(`/clients/${client._id}`) }}><MoveRight /></Button>
                                <ClientAction client={client} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
        </div>
    )
}
