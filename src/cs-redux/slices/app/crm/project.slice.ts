
import { ProjectThunk } from '@/cs-redux/thunks/app/crm/project.thunk';
import { IProjectCascadeData, IProjectModel } from '@/types/crm/project.type';
import { IPaginationResult } from '@/types/pagination.type';
import { createSlice } from '@reduxjs/toolkit';


const initialState: {
    project: IProjectModel | undefined;
    cascadeData: IProjectCascadeData;
    clientProjects: IProjectModel[] | undefined;
    allProject: IPaginationResult<IProjectModel> | undefined;
    allArchivedProject: IPaginationResult<IProjectModel> | undefined;
    loading: boolean;
    notFound: boolean;
} = {
    project: undefined,
    clientProjects: undefined,
    allProject: undefined,
    allArchivedProject: undefined,
    loading: false,
    notFound: false,
    cascadeData: {
        canDelete: false,
        invoices: []
    }
};

const ProjectSlice = createSlice({
    name: "ProjectSlice",
    initialState,
    reducers: {
        clearProject(state, _) {
            state.project = undefined
        },
        clearAllProject(state, { payload }) {
            if (state.allProject) state.allProject = undefined;
        },
        clearAllArchivedProject(state, { payload }) {
            if (state.allArchivedProject) state.allArchivedProject = undefined;
        },

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

                // Update UI (Array)
                const index = state.allProject?.data.findIndex(project => project._id === payload.project._id);
                if (index !== -1 && state.allProject) {
                    state.allProject.data[index!] = payload.project;
                    state.allProject.data.sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
                }
            })
            .addCase(ProjectThunk.update.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.project = undefined;
            })


        builder
            .addCase(ProjectThunk.updateStatus.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.updateStatus.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;

                // Update UI (Array)
                const index = state.allProject?.data.findIndex(project => project._id === payload.project._id);
                if (index !== -1 && state.allProject) {
                    state.allProject.data[index!] = payload.project;
                }
            })
            .addCase(ProjectThunk.updateStatus.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.project = undefined;
            })


        builder
            .addCase(ProjectThunk.updatePriority.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.updatePriority.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.project = payload.project;

                // Update UI (Array)
                const index = state.allProject?.data.findIndex(project => project._id === payload.project._id);
                if (index !== -1 && state.allProject) {
                    state.allProject.data[index!] = payload.project;
                }
            })
            .addCase(ProjectThunk.updatePriority.rejected, (state, _) => {
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

                const pgData: IPaginationResult<IProjectModel> = payload.allProject;

                if (state.allProject && pgData && state.allProject.data.length < pgData.pagination.limit * pgData.pagination.currentPage && pgData.pagination.totalData > pgData.pagination.limit) {
                    state.allProject.data.push(...pgData.data);
                    state.allProject.pagination = pgData.pagination;
                } else {
                    state.allProject = payload.allProject;
                }
            })
            .addCase(ProjectThunk.getAll.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allProject = undefined;
            })

        builder
            .addCase(ProjectThunk.getAllArchived.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.getAllArchived.fulfilled, (state, { payload }) => {
                state.loading = false;

                const pgData: IPaginationResult<IProjectModel> = payload.allProject;

                if (state.allArchivedProject && pgData && state.allArchivedProject.data.length < pgData.pagination.limit * pgData.pagination.currentPage && pgData.pagination.totalData > pgData.pagination.limit) {
                    state.allArchivedProject.data.push(...pgData.data);
                    state.allArchivedProject.pagination = pgData.pagination;
                } else {
                    state.allArchivedProject = payload.allArchivedProject;
                }
            })
            .addCase(ProjectThunk.getAllArchived.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
                state.allArchivedProject = undefined;
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
            .addCase(ProjectThunk.getCascadeData.pending, (state, _) => {
                state.loading = true;
            })
            .addCase(ProjectThunk.getCascadeData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.cascadeData = payload.cascadeData;
            })
            .addCase(ProjectThunk.getCascadeData.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
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

                // Remover from UI (Array)
                if (state.allProject) {
                    state.allProject.data = state.allProject.data.filter(project => project._id !== payload.project._id);
                }

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

                if (state.allArchivedProject) {
                    state.allArchivedProject.data = state.allArchivedProject.data.filter(project => project._id !== payload.project._id);
                }
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

                // remover from UI (Array)
                if (state.clientProjects) {
                    state.clientProjects = state.clientProjects.filter(project => project._id !== payload.project._id);
                }

                if (state.allProject) {
                    state.allProject.pagination.totalData -= 1;
                    state.allProject.data = state.allProject.data.filter(project => project._id !== payload.project._id);
                }

                if (state.allArchivedProject) {
                    state.allArchivedProject.pagination.totalData -= 1;
                    state.allArchivedProject.data = state.allArchivedProject.data.filter(project => project._id !== payload.project._id);
                }

            })
            .addCase(ProjectThunk.delete.rejected, (state, _) => {
                state.loading = false;
                state.notFound = true;
            })
    }
});

export default ProjectSlice;

