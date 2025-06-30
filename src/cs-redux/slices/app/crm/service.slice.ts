
import { ServiceThunk } from '@/cs-redux/thunks/app/crm/service.thunk';
import { IServiceModel } from '@/types/crm/service.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    service: IServiceModel | undefined;
    allService: IPaginationResult<IServiceModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    service: undefined,
    allService: undefined,
    loading: false,
    notFound: false,
};

const ServiceSlice = createSlice({
    name: "ServiceSlice",
    initialState,
    reducers: {
        clearService(state, _) {
            state.service = undefined
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(ServiceThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ServiceThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.service = payload.item;
                state.allService?.data.unshift(payload.item);
            })
            .addCase(ServiceThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.service = undefined;
            })

        builder
            .addCase(ServiceThunk.update.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ServiceThunk.update.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.service = payload.item;
                const index = state.allService?.data.findIndex(item => item._id === payload.item._id);
                if (index !== -1 && state.allService) {
                    state.allService.data[index!] = payload.item;
                }
            })
            .addCase(ServiceThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.service = undefined;
            })

        builder
            .addCase(ServiceThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ServiceThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allService = payload.allItem;
            })
            .addCase(ServiceThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allService = undefined;
            })

        builder
            .addCase(ServiceThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ServiceThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.service = payload.item;
            })
            .addCase(ServiceThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.service = undefined;
            })

        builder
            .addCase(ServiceThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ServiceThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.allService) {
                    state.allService.data = state.allService.data.filter(item => item._id !== payload.item._id);
                }

            })
            .addCase(ServiceThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default ServiceSlice;

