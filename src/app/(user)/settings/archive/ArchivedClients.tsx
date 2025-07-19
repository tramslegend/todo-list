'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk"
import { IClientModel } from "@/types/crm/client.type"
import { ArchiveRestore, LoaderIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ClientSlice from "@/cs-redux/slices/app/crm/client.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function ArchivedClients({ query }: { query: string }) {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allArchivedClient, loading } = useCsSelector(state => state.client);


    // Pagination & Fetch Data
    const [page, setPage] = useState<number>(1);



    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(ClientSlice.actions.clearAllArchivedClient({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(ClientThunk.getAllArchived({ page, limit: 20, query }))
    }, [dispatch, query, page])


    async function onRestore(id: string) {
        const { payload } = await dispatch(ClientThunk.restore({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    return (
        <div>
            {allArchivedClient ?
                allArchivedClient?.pagination.totalData > 0 ?
                    <>
                        <div className="grid grid-cols-1  border rounded bg-accent/10">
                            {allArchivedClient.data.map((client: IClientModel, i: number) => (
                                <div className={`ps-5 pe-3  hover:bg-accent/15 transition-all flex gap-5 items-center justify-between ${i !== allArchivedClient.data.length - 1 && "border-b"}`} key={`client_${i + 8437593}`}>
                                    <Link href={`/clients/${client._id}`} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                        <div className=" col-span-3">
                                            <TypographyP className="font-bold">{client.name}</TypographyP>
                                            <TypographyP className="text-muted-foreground text-[12px]" title="Company name">{(!client.isIndividual && client.companyName) && client.companyName}</TypographyP>
                                        </div>
                                        <div className="flex items-center col-span-3">
                                            <TypographyP className="">{client.email}</TypographyP>
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <TypographyP className="">{client.phone}</TypographyP>
                                        </div>
                                        <div className="flex items-center col-span-4 overflow-hidden">
                                            <TypographyP className="">{client.address}</TypographyP>
                                        </div>
                                    </Link>

                                    <div>
                                        <Button onClick={() => onRestore(client._id)} variant={'destructive'} size={'icon'}><ArchiveRestore /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {(allArchivedClient?.pagination.currentPage !== allArchivedClient?.pagination.totalPages && allArchivedClient?.pagination.totalPages > 0) &&
                            <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                            </Button>
                        }
                    </>
                    :
                    <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No clients found." : "No Archived Client"}</TypographyP>
                :
                <SpinLoaderCard />
            }
        </div>
    )
}
