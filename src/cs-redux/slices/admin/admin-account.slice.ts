import { createSlice } from '@reduxjs/toolkit';
import { TsIAdmin } from '@/types/admin.t';
import AdminAccountThunk from '@/cs-redux/thunks/admin/admin-account.thunk';



const initialState: {
    allAdmin: TsIAdmin[],
    adminUser: TsIAdmin | null,
    loading: boolean;
    notFound: boolean;
} = {
    loading: false,
    notFound: false,
    allAdmin: [],
    adminUser: null
};


const AdminAccountSlice = createSlice({
    name: "AdminAccountSlice",
    initialState,
    reducers: {
        resetAdminUser(state, _) {
            state.adminUser = null;
        }
    },
    extraReducers: (builder) => {
        // Create Admin User
        builder
            .addCase(AdminAccountThunk.CreateAdminUser.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.CreateAdminUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allAdmin.push(payload.admin);
            })
            .addCase(AdminAccountThunk.CreateAdminUser.rejected, (state, _) => {
                state.loading = false;
            })


        // Update self Admin account
        builder
            .addCase(AdminAccountThunk.UpdateSelfAccountDetails.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateSelfAccountDetails.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(AdminAccountThunk.UpdateSelfAccountDetails.rejected, (state, _) => {
                state.loading = false;
            })


        // VerifySelfEmail (Send otp to email for updating)
        builder
            .addCase(AdminAccountThunk.VerifySelfEmail.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.VerifySelfEmail.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(AdminAccountThunk.VerifySelfEmail.rejected, (state, _) => {
                state.loading = false;
            })


        // Update Self Email
        builder
            .addCase(AdminAccountThunk.UpdateSelfEmail.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateSelfEmail.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(AdminAccountThunk.UpdateSelfEmail.rejected, (state, _) => {
                state.loading = false;
            })


        // Update Self Password
        builder
            .addCase(AdminAccountThunk.UpdateSelfPassword.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateSelfPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(AdminAccountThunk.UpdateSelfPassword.rejected, (state, _) => {
                state.loading = false;
            })


        // Get All Admin User ------------------------------------------------------------------------
        builder
            .addCase(AdminAccountThunk.GetAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.GetAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allAdmin = payload.allAdmin;
            })
            .addCase(AdminAccountThunk.GetAll.rejected, (state, _) => {
                state.loading = false;
            })


        // Get Admin User By Id
        builder
            .addCase(AdminAccountThunk.GetById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.GetById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.GetById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.adminUser = null;

            })


        // Update Admin User Details (name, phone, avatar)
        builder
            .addCase(AdminAccountThunk.UpdateDetailsById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateDetailsById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.UpdateDetailsById.rejected, (state, _) => {
                state.loading = false;
            })


        // Update Admin User Email
        builder
            .addCase(AdminAccountThunk.UpdateEmailById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateEmailById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.UpdateEmailById.rejected, (state, _) => {
                state.loading = false;
            })


        // Update Admin User Password
        builder
            .addCase(AdminAccountThunk.UpdatePasswordById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdatePasswordById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.UpdatePasswordById.rejected, (state, _) => {
                state.loading = false;
            })


        // Update Admin User Roles
        builder
            .addCase(AdminAccountThunk.UpdateRolesById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.UpdateRolesById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.UpdateRolesById.rejected, (state, _) => {
                state.loading = false;
            })


        // Archive Admin 
        builder
            .addCase(AdminAccountThunk.Archive.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.Archive.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.Archive.rejected, (state, _) => {
                state.loading = false;
            })


        // Restore/Unarchive Admin 
        builder
            .addCase(AdminAccountThunk.Unarchive.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.Unarchive.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = payload.admin;
            })
            .addCase(AdminAccountThunk.Unarchive.rejected, (state, _) => {
                state.loading = false;
            })


        // Delete Admin 
        builder
            .addCase(AdminAccountThunk.Delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(AdminAccountThunk.Delete.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminUser = null;
            })
            .addCase(AdminAccountThunk.Delete.rejected, (state, _) => {
                state.loading = false;
            })

    }
});

export default AdminAccountSlice;



