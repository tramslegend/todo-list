'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IItemModel, IInvoiceItem } from '@/types/crm/item.type';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ItemSelector from './ItemSelector';
import { toast } from 'sonner';
import { TypographyP } from '../ui/typography';
import { CURRENCY } from '@/root.config';
import { getUnitLabel } from '@/constants/crm.constant';


export default function InvoiceItemsForm({ items, setItems, }: { items: IInvoiceItem[]; setItems: ((items: IInvoiceItem[]) => void) }) {
    const [open, setOpen] = useState<boolean>(false);

    function onSelectItem(item: IItemModel) {
        if (items.some(s => s.slug === item.slug)) return toast.info("Item Already Added");

        const s: IInvoiceItem = {
            name: item.name,
            slug: item.slug,
            description: item.description,
            quantity: 1,
            unit: item.unit,
            basePrice: item.basePrice,
            totalAmount: item.basePrice
        }
        setItems([...items, s])
    }

    return (
        <div className="">
            <Button className='w-full' variant={'outline'} onClick={() => { setOpen(true) }}>+ Add Item</Button>
            <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <ItemSelector setItem={onSelectItem} />
                </DialogContent>
            </Dialog>

            <div>
                {items.map((item: IInvoiceItem, i: number) => (
                    <div key={`item_${item.slug}_${i + 783945}`}>
                        <TypographyP className='font-bold'>{item.name}</TypographyP>
                        {item.description && <><TypographyP className='text-muted-foreground text-[12px]'>{item.description}</TypographyP></>}
                        <TypographyP className='text-muted-foreground text-[12px] font-semibold mt-1'>{CURRENCY} {item.basePrice} {getUnitLabel(item.unit)}</TypographyP>
                    </div>
                ))}
            </div>
        </div>
    );
}
