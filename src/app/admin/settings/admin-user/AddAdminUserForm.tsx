"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCsDispatch } from "@/cs-redux"
import AdminAccountThunk from "@/cs-redux/thunks/admin/admin-account.thunk"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function AddAdminUserForm() {
    const dispatch = useCsDispatch();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<{
        name: string;
        email: string;
        phone: string;
        password: string;
        roles: string[];
    }>({
        name: "",
        email: "",
        password: "",
        phone: "",
        roles: [],
    })
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function addAdmin() {

        if (!data.name) return toast.error('Enter name');
        else if (!data.email) return toast.error('Enter email');
        else if (!data.password) return toast.error('Enter password');
        else if (data.password.length < 8) return toast.error('Password must be at least 8 character');
        else if (data.phone !== '' && data.phone.length !== 10) return toast.error('Phone number must be 10 digit');


        const res = await dispatch(AdminAccountThunk.CreateAdminUser(data));
        if (res.payload?.message) {
            toast.success(res.payload?.message);
            resetForm()
            setOpen(false)
        }
        else if (res.payload?.error) {
            toast.error(res.payload?.error);
        }
    }

    function resetForm() {
        setData({
            name: "",
            email: "",
            password: "",
            phone: "",
            roles: [],
        })
    }

    return (
        <>
            <Button onClick={() => { setOpen(true) }} variant="outline"><UserPlus /></Button>
            <Sheet open={open} onOpenChange={() => { resetForm(); setOpen(false) }}>
                <SheetTrigger asChild>
                </SheetTrigger>
                <form action="">
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Add Admin User</SheetTitle>
                            <SheetDescription>
                                Make changes & click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" type="text" value={data.name} onChange={handleChange} placeholder="Full Name" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="Email address" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" type="number" value={data.phone} onChange={handleChange} placeholder="10 digit phone number" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput id="password" name="password" value={data.password} onChange={handleChange} />
                            </div>
                        </div>
                        <SheetFooter>
                            <Button type="submit" onClick={addAdmin}>Save changes</Button>
                            <SheetClose asChild>
                                <Button variant="outline" onClick={resetForm}>Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </form>
            </Sheet>
        </>
    )
}
