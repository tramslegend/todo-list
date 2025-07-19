import ApiManager from "@/configs/api.config";
import { INewItem } from "@/types/crm/item.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class ItemThunk {
    static create = createAsyncThunk(
        "ItemThunk/create",

        async (payload: INewItem, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/crm/item/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static update = createAsyncThunk(
        "ItemThunk/update",

        async (payload: { id: string; data: INewItem }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/item/update/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getAll = createAsyncThunk(
        "ItemThunk/getAll",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/item/get`, {
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
        "ItemThunk/getById",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/item/get/id/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static delete = createAsyncThunk(
        "ItemThunk/delete",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.delete(`/app/crm/item/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}