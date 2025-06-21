import AdminSettingsHeader from '@/components/layouts/admin/admin-settings-header'
import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function page() {
    return (
        <div>
            <AdminSettingsHeader title='Appearance'>

            </AdminSettingsHeader>

            <div className='px-3 py-3'>
                <div className='border rounded max-w-sm px-3 py-2'>
                    <h4 className='font-semibold'>Select Theme</h4>
                    <p className='text-sm text-muted-foreground'>Choose how your app looks across the interface. </p>


                    <div className='mt-5'>
                        <Select>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                </div>
            </div>
        </div>
    )
}
