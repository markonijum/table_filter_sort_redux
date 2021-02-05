import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";
import { makeArray} from "../../utils";

export const tablePaginatorSlice = createSlice({
    name: 'paginator',
    initialState: {
        offset: 25,
        totalPages: 0,
        currentPage: 1,
        neighbours: 2
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
            state.totalPages = parseInt(action.payload)
        },
        setCurrentPage: (state, action) => {
            state.currentPage = parseInt(action.payload)
        },
        setNeighbours : (state, action) => {
            state.neighbours = parseInt(action.payload)
        }
    },
});

export const { setOffset, setTotalPages, setCurrentPage } = tablePaginatorSlice.actions;
export const selectOffset = state => state.paginator.offset;
export const selectTotalPages = state => state.paginator.totalPages
export const selectCurrentPage = state => state.paginator.currentPage
export const selectNeighbours = state => state.paginator.neighbours

export const selectPaginationList = createSelector(
    selectTotalPages,
    selectCurrentPage,
    selectNeighbours,
    (totalPages, currentPage, neighbours) =>  {
        console.log("TOTAL PAGES: ",totalPages)
        const pagesWithoutNeighbours = (neighbours * 2) + 3
        const pagesWithNeighbours = pagesWithoutNeighbours + 2

        if(totalPages > pagesWithNeighbours) {
            const startPage = Math.max(2, currentPage - neighbours)
            const endPage = Math.min(totalPages -1, currentPage + neighbours)
            let pages = makeArray(startPage, endPage)

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = pagesWithoutNeighbours - (pages.length + 1)

            if(hasLeftSpill && !hasRightSpill) {
                const extraPages = makeArray(startPage - spillOffset, startPage - 1);
                pages = ["PREV", ...extraPages, ...pages];
            }else if(!hasLeftSpill && hasRightSpill) {
                const extraPages = makeArray(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, "NEXT"];
            }else if(hasLeftSpill && hasRightSpill) {
                pages = ["PREV", ...pages, "NEXT"];
            }

            return [1, ...pages, totalPages]
        }
        return makeArray(1, totalPages)
    }
)

export default tablePaginatorSlice.reducer