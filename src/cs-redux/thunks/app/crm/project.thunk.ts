import ApiManager from "@/configs/api.config";
import { INewProject } from "@/types/crm/project.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class ProjectThunk {
    static create = createAsyncThunk(
        "ProjectThunk/create",

        async (payload: INewProject, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/crm/project/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static update = createAsyncThunk(
        "ProjectThunk/update",

        async (payload: { id: string; data: INewProject }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/project/update/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static updateStatus = createAsyncThunk(
        "ProjectThunk/updateStatus",

        async (payload: { id: string; data: { status: string } }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/project/update/status/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static updatePriority = createAsyncThunk(
        "ProjectThunk/updatePriority",

        async (payload: { id: string; data: { priority: string } }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/project/update/priority/${payload.id}`, payload.data);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static getAll = createAsyncThunk(
        "ProjectThunk/getAll",

        async (payload: { page: number, limit: number, query?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/project/get`, {
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
        "ProjectThunk/getById",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/project/get/id/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static getByClientId = createAsyncThunk(
        "ProjectThunk/getByClientId",

        async (payload: { clientId: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/project/get/client/${payload.clientId}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static archive = createAsyncThunk(
        "ProjectThunk/archive",

        async (payload: { id: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/project/archive/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static restore = createAsyncThunk(
        "ProjectThunk/restore",

        async (payload: { id: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/crm/project/restore/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static delete = createAsyncThunk(
        "ProjectThunk/delete",

        async (payload: { id: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.delete(`/app/crm/project/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}