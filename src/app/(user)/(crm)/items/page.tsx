'use client'

import { Button } from "@/components/ui/button"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ItemThunk } from "@/cs-redux/thunks/app/crm/item.thunk"
import { EllipsisVertical, LoaderIcon, Plus, SquareMenu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import MainPageHeader from "@/components/utils/MainPageHeader"
import Container from "@/components/utils/Container"
import ItemSlice from "@/cs-redux/slices/app/crm/item.slice"
import { TypographyP } from "@/components/ui/typography"
import SpinLoader from "@/components/utils/SpinLoader"
import { IItemModel } from "@/types/crm/item.type"
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
import CrmItemForm from "./ItemForm"
import { toast } from "sonner"


export default function ItemsPage() {
    const router = useRouter()
    const dispatch = useCsDispatch();
    const { allItem, loading } = useCsSelector(state => state.item);
    const [flaggedItem, setFlaggedItem] = useState<IItemModel | null>(null);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    // Pagination & Fetch Data
    const [limit, setLimit] = useState<number>(20);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');


    // Reset data if query changed
    useEffect(() => {
        setPage(1)
        dispatch(ItemSlice.actions.clearAllItem({}))
    }, [dispatch, query])


    // Fetch Data
    useEffect(() => {
        dispatch(ItemThunk.getAll({ page, limit, query }))
    }, [dispatch, limit, query, page])

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
        <section>
            <MainPageHeader title="Items" setQuery={setQuery}>
                <Button size={'icon'} variant={'outline'}><Plus /></Button>
            </MainPageHeader>

            <Container className="pb-20">
                {allItem ?
                    allItem?.pagination.totalData > 0 ?
                        <>
                            <div className="grid grid-cols-1  border rounded bg-accent/10">
                                {allItem.data.map((item: IItemModel, i: number) => (
                                    <div className={`ps-5 pe-3 hover:bg-accent/15 transition-all flex items-center justify-between ${i !== allItem.data.length - 1 && "border-b"}`} key={`item_${i + 8437593}`}>
                                        <div onClick={() => setFlaggedItem(item)} className="grow py-3 cursor-pointer grid grid-cols-12 gap-3">
                                            <div className=" col-span-3">
                                                <TypographyP className="font-bold">{item.name}</TypographyP>
                                            </div>
                                            <div className="flex items-center col-span-3">
                                                <TypographyP className="">{item.basePrice}</TypographyP>
                                            </div>
                                            {/*<div className="flex items-center col-span-2">
                                                <TypographyP className="">{item.name}</TypographyP>
                                            </div>
                                            <div className="flex items-center col-span-4 overflow-hidden">
                                                <TypographyP className="">{item.name}</TypographyP>
                                            </div> */}
                                        </div>

                                        <div>

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
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(allItem?.pagination.currentPage !== allItem?.pagination.totalPages && allItem?.pagination.totalPages > 0) &&
                                <Button variant={'secondary'} className="w-full mt-5" onClick={() => setPage(page + 1)}>
                                    {loading ? <LoaderIcon className="animate-spin" /> : "Fetch More"}
                                </Button>
                            }
                        </>
                        :
                        <TypographyP className="text-center text-muted-foreground mt-9">{query ? "No items found." : "You haven’t added any items yet."}</TypographyP>
                    :
                    <SpinLoader />
                }

                {/* DEBUG */}
                <pre>{JSON.stringify(allItem?.pagination)}</pre>
            </Container>
            {/* <ItemDetails item={flaggedItem} setItem={setFlaggedItem} /> */}
            <Suspense><CrmItemForm /></Suspense>

        </section>
    )
}







