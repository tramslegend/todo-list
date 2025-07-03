
import { InvoiceThunk } from '@/cs-redux/thunks/app/crm/invoice.thunk';
import { IInvoiceModel } from '@/types/crm/invoice.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    invoice: IInvoiceModel | undefined;
    clientInvoices: IInvoiceModel[] | undefined;
    projectInvoices: IInvoiceModel[] | undefined;
    allInvoice: IPaginationResult<IInvoiceModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    invoice: undefined,
    clientInvoices: undefined,
    projectInvoices: undefined,
    allInvoice: undefined,
    loading: false,
    notFound: false,
};

const InvoiceSlice = createSlice({
    name: "InvoiceSlice",
    initialState,
    reducers: {
        clearInvoice(state, _) {
            state.invoice = undefined
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(InvoiceThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.invoice = payload.invoice;

                state.allInvoice?.data.unshift(payload.invoice);
            })
            .addCase(InvoiceThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.invoice = undefined;
            })


        builder
            .addCase(InvoiceThunk.update.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.update.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.invoice = payload.invoice;

                const index = state.allInvoice?.data.findIndex(invoice => invoice._id === payload.invoice._id);
                if (index !== -1 && state.allInvoice) {
                    state.allInvoice.data[index!] = payload.invoice;
                }
            })
            .addCase(InvoiceThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.invoice = undefined;
            })


        builder
            .addCase(InvoiceThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allInvoice = payload.allInvoice;
            })
            .addCase(InvoiceThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allInvoice = undefined;
            })


        builder
            .addCase(InvoiceThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.invoice = payload.invoice;
            })
            .addCase(InvoiceThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.invoice = undefined;
            })


        builder
            .addCase(InvoiceThunk.getByClientId.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.getByClientId.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.clientInvoices = payload.invoices;
            })
            .addCase(InvoiceThunk.getByClientId.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.clientInvoices = undefined;
            })


        builder
            .addCase(InvoiceThunk.archive.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.archive.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.allInvoice) {
                    state.allInvoice.data = state.allInvoice.data.filter(invoice => invoice._id !== payload.invoice._id);
                }

            })
            .addCase(InvoiceThunk.archive.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(InvoiceThunk.restore.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.restore.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(InvoiceThunk.restore.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(InvoiceThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(InvoiceThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.allInvoice) {
                    state.allInvoice.data = state.allInvoice.data.filter(invoice => invoice._id !== payload.invoice._id);
                }

            })
            .addCase(InvoiceThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default InvoiceSlice;

