'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IServiceModel, IServicesItem } from '@/types/crm/service.type';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ServiceSelector from './ServiceSelector';
import { toast } from 'sonner';
import { TypographyP } from '../ui/typography';
import { CURRENCY } from '@/root.config';
import { getUnitLabel } from '@/constants/crm.constant';


export default function ServiceItemsForm({ services, setServices, }: { services: IServicesItem[]; setServices: ((services: IServicesItem[]) => void) }) {
    const [open, setOpen] = useState<boolean>(false);

    function onSelectService(service: IServiceModel) {
        if (services.some(s => s.slug === service.slug)) return toast.info("Service Already Added");

        const s: IServicesItem = {
            name: service.name,
            slug: service.slug,
            description: service.description,
            quantity: 1,
            unit: service.unit,
            basePrice: service.basePrice,
            totalAmount: service.basePrice
        }
        setServices([...services, s])
    }

    return (
        <div className="">
            <Button className='w-full' variant={'outline'} onClick={() => { setOpen(true) }}>+ Add Service</Button>
            <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <ServiceSelector setService={onSelectService} />
                </DialogContent>
            </Dialog>

            <div>
                {services.map((service: IServicesItem, i: number) => (
                    <div key={`service_${service.slug}_${i + 783945}`}>
                        <TypographyP className='font-bold'>{service.name}</TypographyP>
                        {service.description && <><TypographyP className='text-muted-foreground text-[12px]'>{service.description}</TypographyP></>}
                        <TypographyP className='text-muted-foreground text-[12px] font-semibold mt-1'>{CURRENCY} {service.basePrice} {getUnitLabel(service.unit)}</TypographyP>
                    </div>
                ))}
            </div>
        </div>
    );
}
