
import { UserAuthThunk } from '@/cs-redux/thunks/app/user-auth.thunk';
import { IUser } from '@/types/user.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    authUser: IUser | null;
    loading: boolean;
    notFound: boolean;
} = {
    authUser: null,
    loading: false,
    notFound: false,
};

const UserAuthSlice = createSlice({
    name: "UserAuthSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        builder
            .addCase(UserAuthThunk.session.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.session.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload.authUser;
            })
            .addCase(UserAuthThunk.session.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authUser = null;
            })


        builder
            .addCase(UserAuthThunk.logout.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.logout.fulfilled, (state, _) => {
                state.loading = false;
                state.authUser = null;
            })
            .addCase(UserAuthThunk.logout.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authUser = null;
            })


        builder
            .addCase(UserAuthThunk.login.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.login.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAuthThunk.login.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAuthThunk.verifyLogin.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.verifyLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload.authUser;
            })
            .addCase(UserAuthThunk.verifyLogin.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authUser = null;
            })


        builder
            .addCase(UserAuthThunk.signup.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.signup.fulfilled, (state, _) => {
                state.loading = false;
            })
            .addCase(UserAuthThunk.signup.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(UserAuthThunk.verifySignup.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(UserAuthThunk.verifySignup.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload.authUser;
            })
            .addCase(UserAuthThunk.verifySignup.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.authUser = null;
            })
    }
});

export default UserAuthSlice;

