
import { ClientThunk } from '@/cs-redux/thunks/app/crm/client.thunk';
import { IClientModel } from '@/types/crm/client.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    client: IClientModel | undefined;
    allClient: IPaginationResult<IClientModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    client: undefined,
    allClient: undefined,
    loading: false,
    notFound: false,
};

const ClientSlice = createSlice({
    name: "ClientSlice",
    initialState,
    reducers: {
        clearClient(state, _) {
            state.client = undefined
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(ClientThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.client = payload.client;
            })
            .addCase(ClientThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.client = undefined;
            })

        builder
            .addCase(ClientThunk.update.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.update.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.client = payload.client;
            })
            .addCase(ClientThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.client = undefined;
            })

        builder
            .addCase(ClientThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allClient = payload.allClient;
            })
            .addCase(ClientThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allClient = undefined;
            })

        builder
            .addCase(ClientThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.client = payload.client;
            })
            .addCase(ClientThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.client = undefined;
            })

        builder
            .addCase(ClientThunk.archive.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.archive.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.client = payload.client;
            })
            .addCase(ClientThunk.archive.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })

        builder
            .addCase(ClientThunk.restore.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.restore.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.client = payload.client;
            })
            .addCase(ClientThunk.restore.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })

        builder
            .addCase(ClientThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ClientThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(ClientThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default ClientSlice;

