"use client"

import { useCsDispatch, useCsSelector } from "@/cs-redux";
import { ServiceThunk } from "@/cs-redux/thunks/app/crm/service.thunk";
import { ChangeEvent, useEffect, useState } from "react";
import { INewService, IServiceModel } from "@/types/crm/service.type";
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

const defaultValue: INewService = {
    name: "",
    description: "",
    unit: "fixed",
    basePrice: 0
}

export default function ServiceSelector({ service, setService }: { service?: IServiceModel; setService: ((service: IServiceModel) => void) }) {
    const dispatch = useCsDispatch();
    const { allService } = useCsSelector((state) => state.service);


    const [newService, setNewService] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<string>('')
    const [formData, setFormData] = useState<INewService>(defaultValue)

    useEffect(() => {
        dispatch(ServiceThunk.getAll({ page, limit: 100, query }))
    }, [dispatch, page, query])


    // New Service
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
        const res = await dispatch(ServiceThunk.create(formData))

        if (res.payload.message) {
            toast.success(res.payload.message);
            setFormData(defaultValue);
            setNewService(false)
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }

    }


    return (
        <div>
            <TypographyH3 className="mb-3">{newService ? "Add New Service" : "Select Service"}</TypographyH3>

            {!newService ?
                <div>
                    <div className="h-8 mb-3 flex gap-3">
                        <SearchInput setQuery={(q) => setQuery(q)} />
                        <Button size={'sm'} onClick={() => setNewService(true)}>New</Button>
                    </div>
                    <div className="grid max-h-[20rem] overflow-y-auto">
                        {allService?.data.map((service: IServiceModel, i: number) => (
                            <div className="mb-3 cursor-pointer bg-accent/30 hover:bg-accent/50  px-3 py-1 rounded-lg" key={`service_${service._id}${i + 9786}`} onClick={() => { setService(service) }}>
                                <TypographyP className='font-bold'>{service.name}</TypographyP>
                                {service.description && <><TypographyP className='text-muted-foreground text-[12px]'>{service.description}</TypographyP></>}
                                <TypographyP className='text-muted-foreground text-[12px] font-semibold mt-1'>{CURRENCY} {service.basePrice} {getUnitLabel(service.unit)}</TypographyP>
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
                            <Input id="description-1" name="description" type="text" value={formData.description} onChange={handleOnChange} placeholder="Describe the service (Optional)" />
                        </div>
                        <div className="grid gap-3 grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="basePrice-1">Base Price</Label>
                                <Input id="basePrice-1" name="basePrice" type="number" value={formData.basePrice === 0 ? "" : formData.basePrice} onChange={handleOnChange} placeholder="Base price of service" />
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
                        <Button onClick={() => { setNewService(false); setFormData(defaultValue) }} size={'sm'} variant="outline">Cancel</Button>
                        <Button onClick={onSubmit} size={'sm'} >Submit</Button>
                    </div>
                </div>
            }
        </div>
    )
}
