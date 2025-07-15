
import { DashboardAction } from '@/cs-redux/thunks/app/crm/dashboard.action';
import { ICardsData, IMainGraphData } from '@/types/crm/dashboard.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    mainGraphData: IMainGraphData[],
    cardData: ICardsData | null,
    loading: boolean;
    notFound: boolean;
} = {
    loading: false,
    notFound: false,
    mainGraphData: [],
    cardData: null
};

const DashboardSlice = createSlice({
    name: "DashboardSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(DashboardAction.getMainGraphData.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(DashboardAction.getMainGraphData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.mainGraphData = payload.data;
            })
            .addCase(DashboardAction.getMainGraphData.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(DashboardAction.getCardsData.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(DashboardAction.getCardsData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.cardData = payload.data;
            })
            .addCase(DashboardAction.getCardsData.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default DashboardSlice;

