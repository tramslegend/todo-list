"use client"

import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ItemThunk } from "@/cs-redux/thunks/app/crm/item.thunk";
import { ChangeEvent, useEffect, useState } from "react";
import { INewItem, IItemModel } from "@/types/crm/item.type";
import { TypographyH3, TypographyP, TypographySmall } from "../ui/typography";
import SearchInput from "@/components/utils/SearchInput";
import { Button } from "../ui/button";
import { CURRENCY } from "@/root.config";
import { CsUtils } from "@/cs-toolkit";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CrmUnits, CrmUnitsType, getUnitLabel } from "@/constants/crm.constant";

const defaultValue: INewItem = {
    name: "",
    description: "",
    unit: "fixed",
    basePrice: 0
}

export default function ItemSelector({ item, setItem }: { item?: IItemModel; setItem: ((item: IItemModel) => void) }) {
    const dispatch = useCsDispatch();
    const { allItem } = useCsSelector((state) => state.item);


    const [newItem, setNewItem] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>('')
    const [formData, setFormData] = useState<INewItem>(defaultValue)

    useEffect(() => {
        dispatch(ItemThunk.getAll({ page, limit: 100, query }))
    }, [dispatch, page, query])


    // New Item
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
        const res = await dispatch(ItemThunk.create(formData))

        if (res.payload.message) {
            toast.success(res.payload.message);
            setFormData(defaultValue);
            setNewItem(false)
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }

    }


    return (
        <div>
            <TypographyH3 className="mb-3">{newItem ? "Add New Item" : "Select Item"}</TypographyH3>

            {!newItem ?
                <div>
                    <div className="h-8 mb-3 flex gap-3">
                        <SearchInput setQuery={(q) => setQuery(q)} />
                        <Button size={'sm'} onClick={() => setNewItem(true)}>New</Button>
                    </div>
                    <div className="grid max-h-[20rem] overflow-y-auto">
                        {allItem?.data.map((item: IItemModel, i: number) => (
                            <div className="mb-3 cursor-pointer bg-accent/30 hover:bg-accent/50  px-3 py-1 rounded-lg" key={`item_${item._id}${i + 9786}`} onClick={() => { setItem(item) }}>
                                <TypographyP className='font-bold'>{item.name}</TypographyP>
                                {item.description && <><TypographyP className='text-muted-foreground text-[12px]'>{item.description}</TypographyP></>}
                                <TypographyP className='text-muted-foreground text-[12px] font-semibold mt-1'>{CURRENCY} {item.basePrice} {getUnitLabel(item.unit)}</TypographyP>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div>
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
                    <div className="mt-5 space-x-3">
                        <Button onClick={() => { setNewItem(false); setFormData(defaultValue) }} size={'sm'} variant="outline">Cancel</Button>
                        <Button onClick={onSubmit} size={'sm'} >Submit</Button>
                    </div>
                </div>
            }
        </div>
    )
}
