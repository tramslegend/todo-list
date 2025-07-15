import ApiManager from "@/configs/api.config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export class DashboardAction {


    static getMainGraphData = createAsyncThunk(
        "DashboardAction/getMainGraphData",

        async (payload: { timePeriod: number }, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/dashboard/get/graph/main`, {
                    params: {
                        timePeriod: payload.timePeriod,
                    },
                });

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )

    static getCardsData = createAsyncThunk(
        "DashboardAction/getCardsData",

        async (_, { rejectWithValue, fulfillWithValue }) => {
            try {
                const { data } = await ApiManager.get(`/app/crm/dashboard/get/card`);

                return fulfillWithValue(data)
            } catch (error: any) {
                return rejectWithValue(error.response.data);
            }
        }
    )
}