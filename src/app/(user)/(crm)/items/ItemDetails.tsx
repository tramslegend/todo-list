import { IItemModel } from '@/types/crm/item.type';
import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TypographyP } from '@/components/ui/typography';
import { CURRENCY } from '@/root.config';
import { getUnitLabel } from '@/constants/crm.constant';
export default function ItemDetails({ item, setItem }: { item: IItemModel | null; setItem: Dispatch<SetStateAction<IItemModel | null>> }) {
    return (
        <Dialog open={item !== null} onOpenChange={() => setItem(null)}>
            <DialogTrigger ></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item?.name}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                {item && <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2">
                        <TypographyP className='text-muted-foreground'>Price:</TypographyP>
                        <TypographyP className="font-medium capitalize">{CURRENCY} {item.basePrice}</TypographyP>
                    </div>
                    <div className="grid grid-cols-2">
                        <TypographyP className='text-muted-foreground'>Unit:</TypographyP>
                        <TypographyP className="font-medium capitalize">{getUnitLabel(item.unit)}</TypographyP>
                    </div>
                    {item.description && (
                        <div className="grid grid-cols-2">
                            <TypographyP className='text-muted-foreground'>Description:</TypographyP>
                            <TypographyP className="">{item.description}</TypographyP>
                        </div>
                    )}
                </div>}
            </DialogContent>
        </Dialog>
    )
}
