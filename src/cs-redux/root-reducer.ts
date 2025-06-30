import { combineReducers } from "@reduxjs/toolkit";
import GlobalSlice from "./slices/global.slice";
import AdminAccountSlice from "./slices/admin/admin-account.slice";
import AdminAuthSlice from "./slices/admin/admin-auth.slice";
import UserAuthSlice from "./slices/app/user-auth.slice";
import UserAccountSlice from "./slices/app/user-account.slice";
import ClientSlice from "./slices/app/crm/client.slice";

const CsRootReducer = combineReducers({
    global: GlobalSlice.reducer,
    adminAuth: AdminAuthSlice.reducer,
    adminAccount: AdminAccountSlice.reducer,
    userAuth: UserAuthSlice.reducer,
    userAccount: UserAccountSlice.reducer,

    client: ClientSlice.reducer,
})

export type CsRootState = ReturnType<typeof CsRootReducer>;
export default CsRootReducer;