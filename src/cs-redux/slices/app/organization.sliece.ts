import { OrganizationAction } from '@/cs-redux/thunks/app/organization.action';
import { IOrganizationModel } from '@/types/organization.type';
import { createSlice } from '@reduxjs/toolkit';



const initialState: {
    organization: IOrganizationModel | null;
    loading: boolean;
    notFound: boolean;
} = {
    organization: null,
    loading: false,
    notFound: false,
};

const OrganizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(OrganizationAction.getDefaultOrg.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(OrganizationAction.getDefaultOrg.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.organization = payload.organization;
            })
            .addCase(OrganizationAction.getDefaultOrg.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.organization = null;
            })

        builder
            .addCase(OrganizationAction.updateDetails.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(OrganizationAction.updateDetails.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.organization = payload.organization;
            })
            .addCase(OrganizationAction.updateDetails.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.organization = null;
            })


        builder
            .addCase(OrganizationAction.updateCurrency.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(OrganizationAction.updateCurrency.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.organization = payload.organization;
            })
            .addCase(OrganizationAction.updateCurrency.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.organization = null;
            })

        builder
            .addCase(OrganizationAction.updateFooterText.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(OrganizationAction.updateFooterText.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.organization = payload.organization;
            })
            .addCase(OrganizationAction.updateFooterText.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.organization = null;
            })


    }
});



export default OrganizationSlice;






