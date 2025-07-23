import ApiManager from "@/configs/api.config";
import { INewInvoice } from "@/types/crm/invoice.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class InvoiceThunk {
    static create = createAsyncThunk(
        "InvoiceThunk/create",

        async (payload: INewInvoice, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/crm/invoice/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static update = createAsyncThunk(
        "InvoiceThunk/update",

        async (payload: { id: string; data: INewInvoice }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/invoice/update/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getAll = createAsyncThunk(
        "InvoiceThunk/getAll",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get`, {
                    params: {
                        page: payload.page,
                        limit: payload.limit,
                        query: payload.query,
                    },
                });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static getAllArchived = createAsyncThunk(
        "InvoiceThunk/getAllArchived",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get/archived`, {
                    params: {
                        page: payload.page,
                        limit: payload.limit,
                        query: payload.query,
                    },
                });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getById = createAsyncThunk(
        "InvoiceThunk/getById",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get/id/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getCascadeData = createAsyncThunk(
        "InvoiceThunk/getCascadeData",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get/cascade/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static getByClientId = createAsyncThunk(
        "InvoiceThunk/getByClientId",

        async (payload: { clientId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get/client/${payload.clientId}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
    static getByProjectId = createAsyncThunk(
        "InvoiceThunk/getByProjectId",

        async (payload: { projectId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/get/project/${payload.projectId}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static archive = createAsyncThunk(
        "InvoiceThunk/archive",

        async (payload: { id: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/invoice/archive/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static restore = createAsyncThunk(
        "InvoiceThunk/restore",

        async (payload: { id: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/invoice/restore/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static delete = createAsyncThunk(
        "InvoiceThunk/delete",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.delete(`/app/crm/invoice/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static sendInvoice = createAsyncThunk(
        "TransactionThunk/sendInvoice",

        async (payload: { id: string, clientId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/send`, {
                    params: {
                        invoice: payload.id,
                        client: payload.clientId
                    }
                });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static download = createAsyncThunk(
        "TransactionThunk/download",

        async (payload: { id: string, clientId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/invoice/download`, {
                    params: {
                        invoice: payload.id,
                        client: payload.clientId
                    }
                });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}