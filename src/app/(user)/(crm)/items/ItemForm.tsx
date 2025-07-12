"use client"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ItemThunk } from "@/cs-redux/thunks/app/crm/item.thunk"
import { IItemModel, INewItem } from "@/types/crm/item.type"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CrmUnits, CrmUnitsType } from "@/constants/crm.constant"
import { CsUtils } from "@/cs-toolkit"
import { toast } from "sonner"
import ItemSlice from "@/cs-redux/slices/app/crm/item.slice"


const defaultValue: INewItem = {
    name: "",
    description: "",
    unit: "fixed",
    basePrice: 0
}

export default function ItemForm({ item, setItem }: { item: IItemModel | null; setItem: Dispatch<SetStateAction<IItemModel | null>> }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useCsDispatch();
    const newItem = searchParams.get('new') === 'true';
    const [formData, setFormData] = useState<INewItem>(defaultValue)



    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                description: item.description,
                basePrice: item.basePrice,
                unit: item.unit,
            })
        }
    }, [dispatch, item])


    function onOpenChange() {
        setFormData(defaultValue);
        setItem(null);
        router.replace('/items');
    }


    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    async function onSubmit() {
        if (!formData.name.trim() || formData.name.trim().length < 3 || formData.name.trim().length > 49) return toast.error('Name must be 3 to 49 characters')
        if (formData.basePrice <= 0) return toast.error('Price must be grater that 0')


        // Dispatch
        let res;
        if (item) {
            res = await dispatch(ItemThunk.update({ id: item._id, data: formData }))
        } else {
            res = await dispatch(ItemThunk.create(formData))
        }

        if (res.payload.message) {
            router.replace('/items');
            toast.success(res.payload.message);
            setFormData(defaultValue);
            setItem(null);
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }

    }

    return (
        <Dialog open={newItem || item !== null} onOpenChange={onOpenChange}>
            <form>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{item ? "Update Item" : "Add New Item"}</DialogTitle>
                        <DialogDescription>
                            Fill the details for the item
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" type="text" value={formData.name} onChange={handleOnChange} placeholder="Basic website / Thumbnail design" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description-1">Description</Label>
                            <Input id="description-1" name="description" type="text" value={formData.description} onChange={handleOnChange} placeholder="Describe the item (Optional)" />
                        </div>
                        <div className="grid gap-3 grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="basePrice-1">Base Price</Label>
                                <Input id="basePrice-1" name="basePrice" type="number" value={formData.basePrice === 0 ? "" : formData.basePrice} onChange={handleOnChange} placeholder="Base price of item" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description-1">Unit</Label>
                                <Select value={formData.unit} onValueChange={(value: CrmUnitsType) => setFormData({ ...formData, unit: value })}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select the Unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Units</SelectLabel>
                                            {
                                                Object.values(CrmUnits).map((value: CrmUnitsType, i: number) => (
                                                    <SelectItem key={`unit_${value}_${i + 7834}`} value={value}>{CsUtils.capitalizeFirst(value)}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button size={'sm'} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={onSubmit} size={'sm'} >{item ? "Update" : "Add Item"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
