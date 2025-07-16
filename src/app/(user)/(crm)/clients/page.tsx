'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk"
import { IClientModel } from "@/types/crm/client.type"
import { LoaderIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ClientAction from "./ClientAction"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import ClientSlice from "@/cs-redux/slices/app/crm/client.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoaderCard from "@/components/utils/SpinLoaderCard"
import Link from "next/link"
import EmptyList from "@/components/utils/EmptyList"


export default function ClientsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allClient, loading } = useCsSelector(state => state.client);


    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(ClientSlice.actions.clearAllClient({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(ClientThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, query, page])


    return (
        <section>
            <MainPageHeader title="Clients" setQuery={setQuery}>
                <Button size={'icon'} variant={'outline'} onClick={() => router.push(`/clients/new`)}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allClient ?
                    allClient?.pagination.totalData > 0 ?
                        <>
                            <div className="grid grid-cols-1  border rounded bg-accent/10">
                                {allClient.data.map((client: IClientModel, i: number) => (
                                    <div className={`ps-5 pe-3  hover:bg-accent/15 transition-all flex items-center justify-between ${i !== allClient.data.length - 1 && "border-b"}`} key={`client_${i + 8437593}`}>
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
                                            {/* <Button variant={'ghost'} onClick={() => { router.push(`/clients/${client._id}`) }}><SquareMenu /></Button> */}
                                            <ClientAction client={client} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(allClient?.pagination.currentPage !== allClient?.pagination.totalPages && allClient?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <EmptyList title="No Clients" subtitle="You currently don't have any clients." notFoundSubtitle="No clients found with the query." query={query !== ''} />
                    :
                    <SpinLoaderCard />
                }

                {/* DEBUG */}
                {/* <pre>{JSON.stringify(allClient?.pagination)}</pre> */}
            </Container>
        </section>
    )
}

