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
import { TypographyH4, TypographyP } from '@/components/ui/typography';
import { getUnitLabel } from '@/constants/crm.constant';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ICurrency } from '@/types';


export default function InvoiceItemsForm({ items, setItems, currency }: { items: IInvoiceItem[]; setItems: ((items: IInvoiceItem[]) => void), currency: ICurrency | null; }) {
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


    // Handle basePrice and update totalAmount
    function handleItemChange(index: number, value: number) {
        const updatedItems = [...items];
        const item = updatedItems[index];

        // Update only the basePrice
        item.basePrice = isNaN(value) ? 0 : value;

        // Recalculate totalAmount based on existing quantity
        const price = item.basePrice;
        const qty = isNaN(item.quantity) ? 0 : item.quantity;
        item.totalAmount = price * qty;

        setItems(updatedItems);
    }


    // 🔧 Adjust quantity using buttons (+ / -)
    function updateQuantity(index: number, delta: number) {
        const updatedItems = [...items];
        const item = updatedItems[index];

        // Ensure quantity doesn't go below 1
        const newQty = Math.max(1, item.quantity + delta);
        item.quantity = newQty;

        // Update totalAmount
        item.totalAmount = item.basePrice * newQty;

        setItems(updatedItems);
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
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <ItemSelector setItem={onSelectItem} />
                </DialogContent>
            </Dialog>

            <div className='mt-5 space-y-3'>
                {items.map((item: IInvoiceItem, i: number) => (
                    <div className='border px-3 py-3 rounded-lg' key={`item_${item.slug}_${i + 783945}`}>
                        <div className='border-b pb-2'>
                            <TypographyP className='font-bold text-[18px]'>{item.name}</TypographyP>
                            {item.description && <><TypographyP className='text-muted-foreground text-[12px]'>{item.description}</TypographyP></>}
                        </div>
                        <div className='grid grid-cols-3 gap-3 mt-3'>
                            <div className="grid gap-3">
                                <Label htmlFor="basePrice-1">Price <span className='text-muted-foreground'>{getUnitLabel(item.unit)}</span></Label>
                                <Input id="basePrice-1" name="basePrice" type="number" value={item.basePrice === 0 ? "" : item.basePrice} onChange={(e) => handleItemChange(i, Number(e.target.value))} placeholder="Base price of item" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="quantity-1">Quantity</Label>
                                <div className='space-x-3 flex items-center'>
                                    <Button variant={'outline'} size={'icon'} onClick={() => updateQuantity(i, -1)} disabled={item.quantity <= 1}>-</Button>
                                    <TypographyP >{item.quantity}</TypographyP>
                                    <Button variant={'outline'} size={'icon'} onClick={() => updateQuantity(i, +1)}>+</Button>
                                </div>
                            </div>
                            <div className="grid gap-3 justify-end">
                                <TypographyP className='text-right'>Amount</TypographyP>
                                <TypographyH4 className='text-[17px] text-right'>{currency?.symbol} {item.totalAmount}</TypographyH4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

