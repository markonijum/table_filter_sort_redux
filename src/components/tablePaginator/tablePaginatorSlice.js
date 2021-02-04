import { createSlice } from '@reduxjs/toolkit';

export const tablePaginatorSlice = createSlice({
    name: 'paginator',
    initialState: {
        offset: 25,
        totalPages: 0,
        currentPage: 1
    },
    reducers: {
        setOffset: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.offset = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
});

export const { setOffset, setTotalPages, setCurrentPage } = tablePaginatorSlice.actions;
export const selectOffset = state => state.paginator.offset;
export const selectTotalPages = state => state.paginator.totalPages
export const selectCurrentPage = state => state.paginator.currentPage

export default tablePaginatorSlice.reducer