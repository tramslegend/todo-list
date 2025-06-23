import ApiManager from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class UserAuthThunk {

    static signup = createAsyncThunk(
        "UserAuthThunk/signup",

        async (payload: { name: string, email: string, avatar?: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/auth/signup`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static verifySignup = createAsyncThunk(
        "UserAuthThunk/verifySignup",

        async (payload: { token: string, otp: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/auth/signup/verify`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static login = createAsyncThunk(
        "UserAuthThunk/login",

        async (payload: { email: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/auth/login`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static verifyLogin = createAsyncThunk(
        "UserAuthThunk/verifyLogin",

        async (payload: { token: string, otp: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.post(`/app/auth/login/verify`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static session = createAsyncThunk(
        "UserAuthThunk/session",

        async (_, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/auth/session`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
    static logout = createAsyncThunk(
        "UserAuthThunk/logout",

        async (_, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/auth/logout`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}