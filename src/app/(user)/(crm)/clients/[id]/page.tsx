'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import ClientSlice from "@/cs-redux/slices/app/crm/client.slice";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { PLACEHOLDER_IMAGE } from "@/root.config";
import { EllipsisVertical, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClientAction from "../ClientAction";
import { Label } from "@/components/ui/label";
import ClientProjectList from "./ClientProjectList";
import ClientInvoiceList from "./ClientInvoiceList";

export default function CrmClientDetailsPage() {
    const params = useParams()
    const id = params?.id?.toString();

    const dispatch = useCsDispatch();
    const router = useRouter()
    const { client } = useCsSelector(state => state.client);
    const [show, setShow] = useState<'project' | 'invoice'>('project')

    useEffect(() => {
        if (id) dispatch(ClientThunk.getById({ id }))

        return () => {
            dispatch(ClientSlice.actions.clearClient({}))
        }
    }, [dispatch, id])


    if (!client) {
        return (<></>)
    }

    return (
        <div className="py-3">
            {(!client || client._id !== id) ?
                <div className="border rounded-lg px-3 py-5">
                    <Skeleton className="h-[33px] w-[200px] rounded mb-3" />
                    <hr />
                    <div className="mt-3">
                        <div className="grid grid-cols-4 gap-3 mt-3">
                            <Skeleton className="h-[54px] w-full rounded" />
                            <Skeleton className="h-[54px] w-full rounded" />
                            <Skeleton className="h-[54px] w-full rounded" />
                            <Skeleton className="h-[54px] w-full rounded" />
                            <Skeleton className="h-[55px] w-full rounded col-span-4" />
                        </div>
                    </div>
                </div>
                :
                <div className="border rounded-lg px-3 py-5">
                    <TypographyH2 className="flex items-center justify-between">
                        <span>
                            <span>{client?.name}</span>
                            {client.isArchived && <span className="text-sm text-destructive ms-2"> (archived)</span>}
                        </span>
                        <ClientAction client={client} />
                    </TypographyH2>

                    <div className="grid grid-cols-4 gap-3 mt-3">
                        <div className="space-y-1 bg-accent/20 px-3 py-2 rounded">
                            <Label>Phone</Label>
                            <TypographyP className="text-muted-foreground">{client?.phone ? client?.phone : "NA"}</TypographyP>
                        </div>
                        <div className="space-y-1 bg-accent/20 px-3 py-2 rounded">
                            <Label>Email</Label>
                            <TypographyP className="text-muted-foreground">{client?.email ? client?.email : "NA"}</TypographyP>
                        </div>
                        <div className="space-y-1 bg-accent/20 px-3 py-2 rounded">
                            <Label>Type</Label>
                            <TypographyP className="text-muted-foreground">{client?.isIndividual ? "Individual" : "Organization"}</TypographyP>
                        </div>
                        <div className="space-y-1 bg-accent/20 px-3 py-2 rounded">
                            <Label>Company</Label>
                            <TypographyP className="text-muted-foreground">{client?.companyName}</TypographyP>
                        </div>

                        <div className="col-span-4 space-y-1 bg-accent/20 px-3 py-2 rounded">
                            <Label ><span>Address:</span></Label>
                            <TypographyP className="text-muted-foreground">{client?.address}</TypographyP>
                        </div>
                    </div>

                    <div className="mt-3 hidden">
                        <TypographyP><span>Phone: </span><span className="text-muted-foreground">{client?.phone ? client?.phone : "NA"}</span></TypographyP>
                        <TypographyP><span>Email: </span><span className="text-muted-foreground">{client?.email ? client?.email : "NA"}</span></TypographyP>
                        <TypographyP><>Client Type: </><span className="text-muted-foreground">{client?.isIndividual ? "Individual" : <>Organization</>}</span></TypographyP>
                        {!client?.isIndividual &&
                            <TypographyP><span>Company: </span><span className="text-muted-foreground">{client?.companyName}</span></TypographyP>
                        }
                        <TypographyP className="mt-2"><span>Address:</span></TypographyP>
                        <TypographyP className="text-muted-foreground">{client?.address}</TypographyP>
                    </div>
                </div>
            }

            <div className="mt-9">
                <div className="flex items-center justify-between">
                    <div className="space-x-2">
                        <button className={`py-2 cursor-pointer px-1 transition-all duration-300 border-b-2 ${show === 'project' ? "border-b-destructive" : "border-b-transparent"}`} onClick={() => setShow('project')}>Projects</button>
                        <button className={`py-2 cursor-pointer px-1 transition-all duration-300 border-b-2 ${show === 'invoice' ? "border-b-destructive" : "border-b-transparent"}`} onClick={() => setShow('invoice')}>Invoices</button>
                    </div>
                    {show === 'project' && <Button size={'sm'} variant={'outline'} onClick={() => router.push(`/projects/new?client=${client?._id}`)}>New Project</Button>}
                    {show === 'invoice' && <Button size={'sm'} variant={'outline'} onClick={() => router.push(`/invoices/new?client=${client?._id}`)}>New Invoice</Button>}
                </div>
                <hr />
                <section className="mt-5">
                    {show === 'project' && <ClientProjectList />}
                    {show === 'invoice' && <ClientInvoiceList />}
                </section>
            </div>
        </div>
    )
}
