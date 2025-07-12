
import { ItemThunk } from '@/cs-redux/thunks/app/crm/item.thunk';
import { IItemModel } from '@/types/crm/item.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    item: IItemModel | undefined;
    allItem: IPaginationResult<IItemModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    item: undefined,
    allItem: undefined,
    loading: false,
    notFound: false,
};

const ItemSlice = createSlice({
    name: "ItemSlice",
    initialState,
    reducers: {
        clearItem(state, _) {
            state.item = undefined
        },
        clearAllItem(state, { payload }) {
            if (state.allItem) state.allItem = undefined;
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(ItemThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ItemThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.item = payload.item;
                state.allItem?.data.unshift(payload.item);
            })
            .addCase(ItemThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.item = undefined;
            })

        builder
            .addCase(ItemThunk.update.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ItemThunk.update.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.item = payload.item;
                const index = state.allItem?.data.findIndex(item => item._id === payload.item._id);
                if (index !== -1 && state.allItem) {
                    state.allItem.data[index!] = payload.item;
                }
            })
            .addCase(ItemThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.item = undefined;
            })

        builder
            .addCase(ItemThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ItemThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                const pgData: IPaginationResult<IItemModel> = payload.allItem;
                if (state.allItem && state.allItem.data.length < pgData.pagination.limit * pgData.pagination.currentPage && pgData.pagination.totalData > pgData.pagination.limit) {
                    state.allItem.data.push(...pgData.data);
                    state.allItem.pagination = pgData.pagination;
                } else {
                    state.allItem = payload.allItem;
                }
            })
            .addCase(ItemThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allItem = undefined;
            })

        builder
            .addCase(ItemThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ItemThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.item = payload.item;
            })
            .addCase(ItemThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.item = undefined;
            })

        builder
            .addCase(ItemThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ItemThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.allItem) {
                    state.allItem.data = state.allItem.data.filter(item => item._id !== payload.item._id);
                }

            })
            .addCase(ItemThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default ItemSlice;

