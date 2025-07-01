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
import { ServiceThunk } from "@/cs-redux/thunks/app/crm/service.thunk"
import { INewService } from "@/types/crm/service.type"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
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
import ServiceSlice from "@/cs-redux/slices/app/crm/service.slice"


const defaultValue: INewService = {
    name: "",
    description: "",
    unit: "fixed",
    basePrice: 0
}

export default function CrmServiceForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useCsDispatch();

    const open = searchParams.get('open');
    const id = searchParams.get('id');

    const { service } = useCsSelector(state => state.service);
    const [formData, setFormData] = useState<INewService>(defaultValue)


    useEffect(() => {
        if (id) dispatch(ServiceThunk.getById({ id }))
    }, [dispatch, id])

    useEffect(() => {
        if (id && service) {
            setFormData({
                name: service.name,
                description: service.description,
                basePrice: service.basePrice,
                unit: service.unit,
            })
        }
    }, [dispatch, id, service])


    function onOpenChange() {
        dispatch(ServiceSlice.actions.clearService({}));
        setFormData(defaultValue);
        router.push('/services');
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
        if (id && service) {
            res = await dispatch(ServiceThunk.update({ id, data: formData }))
        } else {
            res = await dispatch(ServiceThunk.create(formData))
        }

        if (res.payload.message) {
            router.push('/services');
            toast.success(res.payload.message);
            setFormData(defaultValue);
        }
        else if (res.payload.error) {
            toast.error(res.payload.error);
        }

    }

    return (
        <Dialog open={open === 'true'} onOpenChange={onOpenChange}>
            <form>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{id ? "Update Service" : "Add New Service"}</DialogTitle>
                        <DialogDescription>
                            Fill the details for the service
                        </DialogDescription>
                    </DialogHeader>
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button size={'sm'} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={onSubmit} size={'sm'} >{id ? "Update" : "Add Service"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
