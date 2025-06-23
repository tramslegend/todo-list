import ApiManager from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export default class AdminAccountThunk {

    static CreateAdminUser = createAsyncThunk(
        "AdminAccountThunk/CreateAdminUser",

        async (payload: { name: string; email: string; password: string; roles: string[]; phone?: string; }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/admin/account/create`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
    static UpdateSelfAccountDetails = createAsyncThunk(
        "AdminAccountThunk/UpdateSelfAccountDetails",

        async (payload: { name?: string; phone?: string; avatar?: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/admin/account/update/self/details`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static VerifySelfEmail = createAsyncThunk(
        "AdminAccountThunk/VerifySelfEmail",

        async (payload: { email: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/admin/account/verify/self/email`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static UpdateSelfEmail = createAsyncThunk(
        "AdminAccountThunk/UpdateSelfEmail",

        async (payload: { email: string; otp: string; }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/admin/account/update/self/email`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static UpdateSelfPassword = createAsyncThunk(
        "AdminAccountThunk/UpdateSelfPassword",

        async (payload: { password: string; newPassword: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/admin/account/update/self/password`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    // =================================================================
    static GetAll = createAsyncThunk(
        "AdminAccountThunk/GetAll",

        async (payload, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/admin/account/get/all`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static GetById = createAsyncThunk(
        "AdminAccountThunk/GetById",

        async (payload: { id: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/admin/account/get/user/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static UpdateDetailsById = createAsyncThunk(
        "AdminAccountThunk/UpdateDetailsById",

        async (payload: { id: string; body: { name?: string; phone?: string; avatar?: string } }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/update/details/${payload.id}`, payload.body);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static UpdateEmailById = createAsyncThunk(
        "AdminAccountThunk/UpdateEmailById",

        async (payload: { id: string; email: string; }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/update/email/${payload.id}`, { email: payload.email });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static UpdatePasswordById = createAsyncThunk(
        "AdminAccountThunk/UpdatePasswordById",

        async (payload: { id: string; password: string; }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/update/password/${payload.id}`, { password: payload.password });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static UpdateRolesById = createAsyncThunk(
        "AdminAccountThunk/UpdateRolesById",

        async (payload: { id: string; roles: string[]; }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/update/roles/${payload.id}`, { roles: payload.roles });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static Archive = createAsyncThunk(
        "AdminAccountThunk/Archive",

        async (payload: { id: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/archive/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static Unarchive = createAsyncThunk(
        "AdminAccountThunk/Unarchive",

        async (payload: { id: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.patch(`/admin/account/unarchive/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
    static Delete = createAsyncThunk(
        "AdminAccountThunk/Delete",

        async (payload: { id: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {

                const { data } = await ApiManager.delete(`/admin/account/delete/${payload.id}`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}
