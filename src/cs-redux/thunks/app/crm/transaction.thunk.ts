import ApiManager from "@/configs/api.config";
import { INewTransaction } from "@/types/crm/transaction.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class TransactionThunk {
    static create = createAsyncThunk(
        "TransactionThunk/create",

        async (payload: INewTransaction, { rejectWithValue, fulfillWithValue, getState }) => {
            try {

                const { data } = await ApiManager.post(`/app/crm/transaction/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getAll = createAsyncThunk(
        "TransactionThunk/getAll",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/transaction/get`, {
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
        "TransactionThunk/getById",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/transaction/get/id/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getByInvoiceId = createAsyncThunk(
        "TransactionThunk/getByInvoiceId",

        async (payload: { invoiceId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/transaction/get/invoice/${payload.invoiceId}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static delete = createAsyncThunk(
        "TransactionThunk/delete",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.delete(`/app/crm/transaction/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )



    static sendPaymentReceipt = createAsyncThunk(
        "TransactionThunk/sendPaymentReceipt",

        async (payload: { id: string, clientId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/transaction/send`, {
                    params: {
                        transaction: payload.id,
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