import { combineReducers } from "@reduxjs/toolkit";
import GlobalSlice from "./slices/global.slice";
import AdminAccountSlice from "./slices/admin/admin-account.slice";
import AdminAuthSlice from "./slices/admin/admin-auth.slice";

const CsRootReducer = combineReducers({
    global: GlobalSlice.reducer,
    auth: AdminAuthSlice.reducer,
    adminAccount: AdminAccountSlice.reducer,
})

export type CsRootState = ReturnType<typeof CsRootReducer>;
export default CsRootReducer;