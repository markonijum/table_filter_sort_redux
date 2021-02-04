import { createSlice } from '@reduxjs/toolkit';

export const tableFilterSlice = createSlice({
    name: 'tableFilters',
    initialState: {
        filters: [],
        activeFilters: [],
        sortBy: {
            name: 'fullName',
            direction: "ASC"
        },
        maxBalance : 0
    },
    reducers: {
        setFilters: (state,action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
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
        setFailed: (state, action) => {
            state.failed = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = { name: action.payload, direction: state.sortBy.direction === "ASC" ? "DESC" : "ASC"}
        }
    },
});

export const { setFilters, setActiveFilters, setSortBy, setFailed, setMaxBalance, resetFilter } = tableFilterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFilters = state => state.tableFilters.filters;
export const selectActiveFilters = state => state.tableFilters.activeFilters;
export const selectSortBy = state => state.tableFilters.sortBy
export const selectMaxBalance = state => state.tableFilters.maxBalance
export const selectFailed = state => state.tableFilters.failed

export default tableFilterSlice.reducer;