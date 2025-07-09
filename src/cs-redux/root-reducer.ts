import { combineReducers } from "@reduxjs/toolkit";
import GlobalSlice from "./slices/global.slice";
import AdminAccountSlice from "./slices/admin/admin-account.slice";
import AdminAuthSlice from "./slices/admin/admin-auth.slice";
import UserAuthSlice from "./slices/app/user-auth.slice";
import UserAccountSlice from "./slices/app/user-account.slice";
import ClientSlice from "./slices/app/crm/client.slice";
import ItemSlice from "./slices/app/crm/item.slice";
import ProjectSlice from "./slices/app/crm/project.slice";
import InvoiceSlice from "./slices/app/crm/invoice.slice";

const CsRootReducer = combineReducers({
    global: GlobalSlice.reducer,
    adminAuth: AdminAuthSlice.reducer,
    adminAccount: AdminAccountSlice.reducer,
    userAuth: UserAuthSlice.reducer,
    userAccount: UserAccountSlice.reducer,

    client: ClientSlice.reducer,
    item: ItemSlice.reducer,
    project: ProjectSlice.reducer,
    invoice: InvoiceSlice.reducer,
})

export type CsRootState = ReturnType<typeof CsRootReducer>;
export default CsRootReducer;