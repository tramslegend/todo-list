
import { ProjectThunk } from '@/cs-redux/thunks/app/crm/project.thunk';
import { IProjectModel } from '@/types/crm/project.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    project: IProjectModel | undefined;
    clientProjects: IProjectModel[] | undefined;
    allProject: IPaginationResult<IProjectModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    project: undefined,
    clientProjects: undefined,
    allProject: undefined,
    loading: false,
    notFound: false,
};

const ProjectSlice = createSlice({
    name: "ProjectSlice",
    initialState,
    reducers: {
        clearProject(state, _) {
            state.project = undefined
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(ProjectThunk.create.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.create.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;

                state.allProject?.data.unshift(payload.project);
            })
            .addCase(ProjectThunk.create.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.project = undefined;
            })


        builder
            .addCase(ProjectThunk.update.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.update.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;

                const index = state.allProject?.data.findIndex(project => project._id === payload.project._id);
                if (index !== -1 && state.allProject) {
                    state.allProject.data[index!] = payload.project;
                }
            })
            .addCase(ProjectThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.project = undefined;
            })


        builder
            .addCase(ProjectThunk.getAll.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.getAll.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.allProject = payload.allProject;
            })
            .addCase(ProjectThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allProject = undefined;
            })


        builder
            .addCase(ProjectThunk.getById.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.getById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;
            })
            .addCase(ProjectThunk.getById.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.project = undefined;
            })


        builder
            .addCase(ProjectThunk.getByClientId.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.getByClientId.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.clientProjects = payload.projects;
            })
            .addCase(ProjectThunk.getByClientId.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.clientProjects = undefined;
            })


        builder
            .addCase(ProjectThunk.archive.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.archive.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;

            })
            .addCase(ProjectThunk.archive.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(ProjectThunk.restore.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.restore.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;
            })
            .addCase(ProjectThunk.restore.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })


        builder
            .addCase(ProjectThunk.delete.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.delete.fulfilled, (state, { payload }) => {
                state.loading = false;

                if (state.allProject) {
                    state.allProject.data = state.allProject.data.filter(project => project._id !== payload.project._id);
                }

            })
            .addCase(ProjectThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default ProjectSlice;

