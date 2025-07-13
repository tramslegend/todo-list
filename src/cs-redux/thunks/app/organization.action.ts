import ApiManager from "@/configs/api.config";
import { ICurrency } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class OrganizationAction {

    static getDefaultOrg = createAsyncThunk(
        "OrganizationAction/getDefaultOrg",

        async (_, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/organization/get/default`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )


    static updateDetails = createAsyncThunk(
        "OrganizationAction/updateDetails",

        async (payload: { name: string; email?: string; phone?: string; website?: string; address1?: string; address2?: string; }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/organization/update/details`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static updateCurrency = createAsyncThunk(
        "OrganizationAction/updateCurrency",

        async (payload: { currency: ICurrency }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/organization/update/currency`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static updateFooterText = createAsyncThunk(
        "OrganizationAction/updateFooterText",

        async (payload: { footerText: string }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.patch(`/app/organization/update/footer-text`, payload);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

}