
import { AdminAuthThunk } from '@/cs-redux/thunks/admin/admin-auth.thunk';
import { TsIAdmin } from '@/types/admin.t';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    authAdmin: TsIAdmin | null;
    loading: boolean;
    notFound: boolean;
} = {
    authAdmin: null,
    loading: false,
    notFound: false,
};

const AdminAuthSlice = createSlice({
    name: "AdminAuthSlice",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {

        builder
            .addCase(AdminAuthThunk.GetAuthAdmin.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAuthThunk.GetAuthAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.authAdmin = action.payload.authAdmin;
            })
            .addCase(AdminAuthThunk.GetAuthAdmin.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authAdmin = null;
            })


        builder
            .addCase(AdminAuthThunk.LoginAdmin.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAuthThunk.LoginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.authAdmin = action.payload.authAdmin;
            })
            .addCase(AdminAuthThunk.LoginAdmin.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authAdmin = null;
            })


        builder
            .addCase(AdminAuthThunk.LogoutAdmin.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAuthThunk.LogoutAdmin.fulfilled, (state, _) => {
                state.loading = false;
                state.authAdmin = null;
            })
            .addCase(AdminAuthThunk.LogoutAdmin.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authAdmin = null;
            })

    }
});

export default AdminAuthSlice;

