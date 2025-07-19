"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Suspense, useEffect, useState } from "react"
import { IClientModel, INewClient } from "@/types/crm/client.type"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { ClientThunk } from "@/cs-redux/thunks/app/crm/client.thunk"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import ClientSlice from "@/cs-redux/slices/app/crm/client.slice"
import Container from "@/components/utils/Container"



export default function NewClientPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { client, loading } = useCsSelector(state => state.client);

    const dispatch = useCsDispatch();
    const router = useRouter();
    const [newClientList, setNewClientList] = useState<IClientModel[]>([]);

    const form = useForm<INewClient>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            isIndividual: true,
            tags: [],
            companyName: "",
        },
    })


    async function onSubmit(values: INewClient) {
        const errors: Record<string, string> = {};

        const { name, phone, email, tags, companyName, isIndividual, address } = values;
        if (!name || name.trim().length < 3 || name.trim().length > 30) errors.name = "Name must be 3 - 30 characters";
        if (!email && !phone) errors.email = "Either email or phone is required";
        // if (phone && phone?.trim().length > 10) errors.phone = "Invalid phone number";
        if (!isIndividual && !companyName?.trim()) errors.companyName = "Company name is required for businesses";


        if (Object.keys(errors).length > 0) {
            for (const [field, message] of Object.entries(errors)) {
                form.setError(field as keyof INewClient, { message });
            }
            return;
        }

        // Submit the form validation
        let result;
        if (id && client) {
            result = await dispatch(ClientThunk.update({ id, data: { name, email, phone, address, isIndividual, companyName, tags } }));
        } else {
            result = await dispatch(ClientThunk.create({ name, email, phone, address, isIndividual, companyName, tags }));
        }
        const { payload } = result;

        if (payload.message) {
            toast.success(payload.message);
            form.reset()
            router.replace(`/clients/${payload.client._id}`);
            if (!id) setNewClientList([payload.client, ...newClientList]);

        }
        else if (payload.error) {
            toast.error(payload.error);
        }
    }


    // Watch Individual and Company Name
    const isIndividual = form.watch("isIndividual");

    useEffect(() => {
        if (isIndividual) {
            form.setValue("companyName", "");
        }
    }, [isIndividual, form]);


    // Edit Client
    useEffect(() => {
        if (id) dispatch(ClientThunk.getById({ id }))

        return () => {
            dispatch(ClientSlice.actions.clearClient({}))
        }
    }, [dispatch, id])


    useEffect(() => {
        if (!loading && client) {
            form.setValue('name', client.name)
            form.setValue('email', client.email!)
            form.setValue('phone', client.phone!)
            form.setValue('address', client.address!)
            form.setValue('companyName', client.companyName!)
            form.setValue('isIndividual', client.isIndividual)
            form.setValue('tags', client.tags)
        } else {
            form.reset()
        }

    }, [client, form, loading])



    return (
        <Suspense>
            <Container className="py-3">
                <Suspense>
                    <h2 className="font-bold text-2xl mb-7">{id ? "Update Client" : "Create New Client"}</h2>
                </Suspense>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-3 gap-3 items-start">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Client full name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder="Phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3 items-start">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-3 items-center">
                            <FormField
                                control={form.control}
                                name="companyName"
                                disabled={isIndividual}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company Name (Optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isIndividual"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-1">
                                        <FormControl >
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked: boolean) => field.onChange(checked === true)}
                                            />
                                        </FormControl>
                                        <FormLabel className="!m-0">This is an individual client</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button size={'sm'} type="submit">{id ? "Update" : "Add Client"}</Button>
                            <Suspense> {id && <Button onClick={() => router.back()} size={'sm'} variant={'outline'}>Back</Button>}</Suspense>
                        </div>
                    </form>
                </Form>
            </Container>
        </Suspense>
    )
}