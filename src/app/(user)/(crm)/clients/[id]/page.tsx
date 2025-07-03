'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { useCsDispatch, useCsSelector } from "@/cs-redux";
import ClientSlice from "@/cs-redux/slices/app/crm/client.slice";
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk";
import { PLACEHOLDER_IMAGE } from "@/root.config";
import { EllipsisVertical, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";

export default function CrmClientDetailsPage() {
    const params = useParams()
    const id = params?.id?.toString();

    const dispatch = useCsDispatch();
    const router = useRouter()
    const { client, loading } = useCsSelector(state => state.client);


    useEffect(() => {
        if (id) dispatch(ClientThunk.getById({ id }))

        return () => {
            dispatch(ClientSlice.actions.clearClient({}))
        }
    }, [dispatch, id])


    async function onArchive(id: string) {
        const { payload } = await dispatch(ClientThunk.archive({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }
    async function onRestore(id: string) {
        const { payload } = await dispatch(ClientThunk.restore({ id }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    async function onDelete(id: string) {
        const { payload } = await dispatch(ClientThunk.delete({ id }));

        if (payload.message) {
            toast.success(payload.message);
            router.back();
        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }

    const dropdownItemClassName = 'cursor-pointer px-3 py-0.5 hover:bg-accent rounded'
    return (
        <div className="py-3">
            {
                !client ?
                    <div className="border rounded-lg px-3 py-5 flex items-start justify-between gap-3">
                        <div className="grow">
                            <Skeleton className="h-[33px] w-[200px] rounded mb-3" />
                            <hr />
                            <div className="mt-3">
                                <Skeleton className="h-[14px] w-[180px] rounded" />
                                <Skeleton className="h-[14px] w-[280px] rounded mt-2" />
                                <Skeleton className="h-[14px] w-[170px] rounded mt-2" />
                                <Skeleton className="h-[14px] w-[70px] rounded mt-5" />
                                <Skeleton className="h-[14px] w-[370px] rounded mt-2" />
                            </div>
                        </div>
                        {/* <div>
                            <Avatar className="w-22 h-22">
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div> */}
                    </div>
                    :
                    <div className="border rounded-lg px-3 py-5 flex  justify-between gap-3">
                        <div className="grow">
                            <TypographyH2 className="flex items-center justify-between">
                                <span>
                                    <span>{client?.name}</span>
                                    {client.isArchived && <span className="text-sm text-destructive ms-2"> (archived)</span>}
                                </span>
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <Button size={'icon'} variant={'ghost'}><EllipsisVertical /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className=" space-y-1 py-2">
                                        <DropdownMenuItem className={dropdownItemClassName} onClick={() => router.push(`/clients/new?id=${client._id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem className={dropdownItemClassName} onClick={() => client.isArchived ? onRestore(client._id) : onArchive(client._id)}>{client.isArchived ? "Restore" : "Archive"}</DropdownMenuItem>
                                        <DropdownMenuItem className={dropdownItemClassName} onClick={() => onDelete(client._id)}><span className={`text-destructive hover:text-destructive`}>Delete</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TypographyH2>


                            <div className="mt-3">
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
                        <div className="flex flex-col items-center justify-between h-full">
                            {/* <Avatar className="w-22 h-22">
                                <AvatarImage src={PLACEHOLDER_IMAGE} alt={client?.name} />
                                <AvatarFallback><User size={30} className="text-muted-foreground" /></AvatarFallback>
                            </Avatar> */}
                            {/* <div className="mt-2">
                                {client.isArchived && <Badge variant={'destructive'}>archived</Badge>}
                            </div> */}
                        </div>
                    </div>
            }
        </div>
    )
}
