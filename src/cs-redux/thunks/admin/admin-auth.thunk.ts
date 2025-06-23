import ApiManager from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class AdminAuthThunk {

    static GetAuthAdmin = createAsyncThunk(
        "AdminAuthThunk/GetAuthAdmin",

        async (payload, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/admin/auth/session`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static LoginAdmin = createAsyncThunk(
        "AdminAuthThunk/LoginAdmin",

        async (payload: { email: string, password: string }, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/admin/auth/login`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static LogoutAdmin = createAsyncThunk(
        "AdminAuthThunk/LogoutAdmin",

        async (payload, { getState, rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/admin/auth/logout`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

}
