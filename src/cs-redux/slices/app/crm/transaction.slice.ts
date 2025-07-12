
import { TransactionThunk } from '@/cs-redux/thunks/app/crm/transaction.thunk';
import { ITransactionModel } from '@/types/crm/transaction.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    transaction: ITransactionModel | undefined;
    invoiceTransactions: ITransactionModel[];
    allTransaction: IPaginationResult<ITransactionModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    transaction: undefined,
    allTransaction: undefined,
    loading: false,
    notFound: false,
    invoiceTransactions: []
};

const TransactionSlice = createSlice({
    name: "TransactionSlice",
    initialState,
    reducers: {
        clearTransaction(state, _) {
            state.transaction = undefined
        },
        clearAllTransaction(state, { payload }) {
            console.log('Clearing transaction')
            if (state.allTransaction) state.allTransaction = undefined;
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(TransactionThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(TransactionThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.transaction = payload.transaction;
                state.invoiceTransactions.unshift(payload.transaction);
            })
            .addCase(TransactionThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.transaction = undefined;
            })



        builder
            .addCase(TransactionThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(TransactionThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;

                const pgData: IPaginationResult<ITransactionModel> = payload.allTransaction;
                if (state.allTransaction && state.allTransaction.data.length < pgData.pagination.limit * pgData.pagination.currentPage && pgData.pagination.totalData > pgData.pagination.limit) {
                    state.allTransaction.data.push(...pgData.data);
                    state.allTransaction.pagination = pgData.pagination;
                } else {
                    state.allTransaction = payload.allTransaction;
                }
            })
            .addCase(TransactionThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allTransaction = undefined;
            })

        builder
            .addCase(TransactionThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(TransactionThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.transaction = payload.transaction;
            })
            .addCase(TransactionThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.transaction = undefined;
            })

        builder
            .addCase(TransactionThunk.getByInvoiceId.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(TransactionThunk.getByInvoiceId.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.invoiceTransactions = payload.transactions;
            })
            .addCase(TransactionThunk.getByInvoiceId.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.transaction = undefined;
            })

        builder
            .addCase(TransactionThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(TransactionThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.invoiceTransactions) {
                    state.invoiceTransactions = state.invoiceTransactions.filter(transaction => transaction._id !== payload.transaction._id);
                }

            })
            .addCase(TransactionThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default TransactionSlice;

