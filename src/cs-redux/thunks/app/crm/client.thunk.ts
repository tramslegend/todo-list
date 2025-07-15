import ApiManager from "@/configs/api.config";
import { INewClient } from "@/types/crm/client.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class ClientThunk {
    static create = createAsyncThunk(
        "ClientThunk/create",

        async (payload: INewClient, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/crm/client/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static update = createAsyncThunk(
        "ClientThunk/update",

        async (payload: { id: string; data: INewClient }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/client/update/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getAll = createAsyncThunk(
        "ClientThunk/getAll",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/client/get`, {
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
        "ClientThunk/getAllArchived",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/client/get/archived`, {
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
        "ClientThunk/getById",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/client/get/id/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static archive = createAsyncThunk(
        "ClientThunk/archive",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/client/archive/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static restore = createAsyncThunk(
        "ClientThunk/restore",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/client/restore/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static delete = createAsyncThunk(
        "ClientThunk/delete",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.delete(`/app/crm/client/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}