import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'
import axios from "axios"
import currency from "currency.js"
import {
    setFilters,
    setMaxBalance,
    selectActiveFilters,
    selectSortBy,
} from "../tableFilter/tableFilterSlice"
import { selectOffset, selectCurrentPage } from "../tablePaginator/tablePaginatorSlice";

export const tableListSlice = createSlice({
    name: 'tableList',
    initialState: {
        list: [],
        loading: true,
        failed: ''
    },
    reducers: {
        loadDataList: (state, action) => {
            state.list = action.payload
        },
        loading: state => {
            state.loading = !state.loading;
        },
        failed: (state, action) => {
            state.failed += action.payload;
        },
    },
});

export const { loadDataList, loading, failed } = tableListSlice.actions;

export const fetchDataListAsync = () => async dispatch => {
    try {
        const response = await axios.get("https://fww-demo.herokuapp.com/");
        const countries = []
        const states = []
        const registered = []
        const balances = []
        let rows = []

        let dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        response.data.forEach((bycountry => {

            const country = bycountry.country
            countries.push(country)
            bycountry.state.forEach(bystate => {
                const state = bystate.name
                states.push(state)
                bystate.users.forEach((byuser) => {
                    const date = new Date(byuser.registered)
                    balances.push(currency(byuser.balance).value)
                    registered.push(date.getFullYear())
                    rows = [...rows, { state: state, country: country, ...byuser, registered: date.toLocaleString('en-US', dateOptions) }]
                })
            })
        }))
        dispatch(loadDataList(rows))
        const sorted_countries = countries.sort()
        const distinct_states = states.filter((state, index) => states.indexOf(state) === index).sort()
        const sorted_years = registered.sort()
        const distinct_years = sorted_years.filter((year, index) => sorted_years.indexOf(year) === index )
        dispatch(setFilters([
            {
                name: 'country',
                value: sorted_countries
            },
            {
                name: 'state',
                value: distinct_states
            },
            {
                name: 'registered',
                value: distinct_years
            },
        ]))
        dispatch(setMaxBalance(Math.ceil(Math.max(...balances))))
        dispatch(loading())
    }catch (err) {
        dispatch(loading())
        dispatch(failed(err.message))
    }

};

export const selectList = state => state.tableList.list;
export const selectColumns = state => state.tableList.columns
export const selectLoading = state => state.tableList.loading
export const selectFilteredList = createSelector(
    selectList,
    selectActiveFilters,
    (list, activeFilters) => {
        let acc = list
        if(activeFilters.length > 0) {
            activeFilters.forEach(activeFilter => {
                acc = acc.filter( row => {
                    if(typeof row[activeFilter.name] === 'string') {
                        if(typeof activeFilter.value === 'string'){
                            return row[activeFilter.name].indexOf(activeFilter.value) > - 1
                        }else if(typeof activeFilter.value === 'object' && activeFilter.value.hasOwnProperty('start')){
                            return currency(row[activeFilter.name]).subtract(activeFilter.value.start).value >= 0 &&  currency(activeFilter.value.end).subtract(row[activeFilter.name]).value >= 0
                        }
                    }else if( typeof row[activeFilter.name] === 'boolean') {
                        return (row[activeFilter.name] + "") === activeFilter.value
                    }
                    return row
                })
            })
        }
        return acc
    }
)
export const selectSortedFilteredList = createSelector(
    selectFilteredList,
    selectSortBy,
    (filteredList, sortBy) => {
        if(sortBy.name !== ''){
            return filteredList.slice().sort((a, b) => {
                if(sortBy.name === 'registered') {
                    let d1 = new Date(a[sortBy.name])
                    let d2 = new Date(b[sortBy.name])

                    return d1.getTime() > d2.getTime() ? ( sortBy.direction === 'ASC' ? 1 : -1) : (a[sortBy.name] === b[sortBy.name] ? (a["fullName"] > b["fullName"] ? 1 : -1 ) : (sortBy.direction === 'ASC' ? -1 : 1))
                }
                return a[sortBy.name] > b[sortBy.name] ? ( sortBy.direction === 'ASC' ? 1 : -1) : (a[sortBy.name] === b[sortBy.name] ? (a["fullName"] > b["fullName"] ? 1 : -1 ) : (sortBy.direction === 'ASC' ? -1 : 1))
            })
        }
       return filteredList
    }
)

export const selectSortedFilteredPaginatedList = createSelector(
    selectSortedFilteredList,
    selectOffset,
    selectCurrentPage,
    (sortedFilteredList, offset, currentPage) => {
        return sortedFilteredList.slice((currentPage-1)*(currentPage > 1 ? offset : 1), offset * currentPage)
    }
)


export default tableListSlice.reducer;
