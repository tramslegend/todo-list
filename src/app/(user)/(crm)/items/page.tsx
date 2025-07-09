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
import { ItemThunk } from "@/cs-redux/thunks/app/crm/item.thunk"
import { IItemModel } from "@/types/crm/item.type"
import { EllipsisVertical, MoveRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import CrmItemForm from "./ItemForm"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import MainPageHeader from "@/components/utils/MainPageHeader"



export default function CrmItemsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(40)
    const [idToDelete, setIdToDelete] = useState<string | null>(null)


    const { allItem } = useCsSelector(state => state.item);
    const { query } = useCsSelector(state => state.global);


    useEffect(() => {
        dispatch(ItemThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, page, query])


    async function onDelete() {
        if (!idToDelete) return toast.error('Something went wrong! Try again later.')

        // Delete...
        const { payload } = await dispatch(ItemThunk.delete({ id: idToDelete! }));

        if (payload.message) {
            toast.success(payload.message);
        }
        else if (payload.error) {
            toast.error(payload.error);
        }

        setIdToDelete(null);
    }

    return (
        <div>
            <MainPageHeader title="Items">
                {/* <Button size={'icon'} variant={'secondary'}><Grid /></Button> */}
            </MainPageHeader>
            <Suspense><CrmItemForm /></Suspense>
            <Table>
                <TableCaption>{allItem?.data.length ? "A list of your items" : <>No item available, <Link className="text-blue-600" href={'/items?open=true'}>Create Now</Link></>}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">##</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead >Base Price</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {allItem && <TableBody className="border-b">
                    {allItem.data?.map((item: IItemModel, i: number) => (
                        <TableRow key={`item_${i + 7863456}`}>
                            <TableCell className="font-medium w-[50px]">{(i + 1).toString().padStart(2, '0')}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.basePrice}</TableCell>
                            <TableCell className="text-right w-[100px] flex items-center justify-end">

                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size={'sm'}><EllipsisVertical /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className=" space-y-1 py-2">
                                        {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => router.push(`/items?open=true&id=${item._id}`)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer px-3 py-0.5 hover:bg-accent rounded" onClick={() => setIdToDelete(item._id)}>Delete</DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Dialog open={idToDelete !== null} onOpenChange={() => setIdToDelete(null)}>
                                    <DialogTrigger></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete item from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button variant={'outline'} onClick={() => setIdToDelete(null)}> Cancel </Button>
                                            <Button variant={'destructive'} onClick={onDelete}> Delete </Button>
                                        </DialogFooter>
                                    </DialogContent>

                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>

            {/* DELETE Dialog */}

        </div>
    )
}
