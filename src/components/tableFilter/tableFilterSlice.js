import { createSlice } from '@reduxjs/toolkit';

export const tableFilterSlice = createSlice({
    name: 'tableFilters',
    initialState: {
        filters: [],
        activeFilters: [],
        searching: false,
        sortBy: {
            name: 'fullName',
            direction: "ASC"
        },
        maxBalance : 0
    },
    reducers: {
        setFilters: (state,action) => {
            state.filters = action.payload;
        },
        setActiveFilters: (state, action) => {
            state.activeFilters = action.payload
        },
        resetActiveFilters: state => {
            state.activeFilters = []
        },
        setMaxBalance: (state, action) => {
            state.maxBalance = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = { name: action.payload, direction: state.sortBy.direction === "ASC" ? "DESC" : "ASC"}
        },
        setSearching: (state, action) => {
            state.searching = action.payload
        }
    },
});

export const { setFilters, setActiveFilters, setSortBy, setMaxBalance, resetFilter, setSearching } = tableFilterSlice.actions;


export const selectFilters = state => state.tableFilters.filters;
export const selectActiveFilters = state => state.tableFilters.activeFilters;
export const selectSortBy = state => state.tableFilters.sortBy
export const selectMaxBalance = state => state.tableFilters.maxBalance
export const selectSearching = state => state.tableFilters.searching

export default tableFilterSlice.reducer;