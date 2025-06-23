import ApiManager from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class UserAccountThunk {

    static updateName = createAsyncThunk(
        "UserAccountThunk/updateName",

        async (payload: { name: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/account/update/name`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static updateAvatar = createAsyncThunk(
        "UserAccountThunk/updateAvatar",

        async (payload: { avatar: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/account/update/avatar`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static addEmail = createAsyncThunk(
        "UserAccountThunk/addEmail",

        async (payload: { email: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/account/add/email`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static addEmailVerify = createAsyncThunk(
        "UserAccountThunk/addEmailVerify",

        async (payload: { otp: string; token: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/account/add/email/verify`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static updatePrimaryEmail = createAsyncThunk(
        "UserAccountThunk/updatePrimaryEmail",

        async (payload: { email: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/account/update/primary-email`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static removeEmail = createAsyncThunk(
        "UserAccountThunk/removeEmail",

        async (payload: { email: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/account/remove/email`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

}