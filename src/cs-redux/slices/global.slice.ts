import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const initialState: {
    searchQuery: string;
    loading: boolean;
    notFound: boolean;
} = {
    searchQuery: '',
    loading: false,
    notFound: false,
};

const GlobalSlice = createSlice({
    name: "GlobalSlice",
    initialState,
    reducers: {
        setSearchQuery: (state, { payload }) => {
            state.searchQuery = payload;
        },
    },
    extraReducers: (builder) => {
    }
});



export default GlobalSlice;






