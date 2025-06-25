
import { UserAccountThunk } from '@/cs-redux/thunks/app/user-account.thunk';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    loading: boolean;
    notFound: boolean;
} = {
    loading: false,
    notFound: false,
};

const UserAccountSlice = createSlice({
    name: "UserAccountSlice",
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {

        builder
            .addCase(UserAccountThunk.updateName.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.updateName.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.updateName.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAccountThunk.updateAvatar.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.updateAvatar.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.updateAvatar.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAccountThunk.addEmail.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.addEmail.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.addEmail.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAccountThunk.addEmailVerify.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.addEmailVerify.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.addEmailVerify.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAccountThunk.updatePrimaryEmail.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.updatePrimaryEmail.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.updatePrimaryEmail.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAccountThunk.removeEmail.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.removeEmail.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.removeEmail.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })

        builder
            .addCase(UserAccountThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAccountThunk.delete.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAccountThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default UserAccountSlice;

