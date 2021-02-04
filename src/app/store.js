import { configureStore } from '@reduxjs/toolkit';
import tableListReducer from '../components/tableList/tableListSlice';
import tableFilterReducer from '../components/tableFilter/tableFilterSlice';
import tablePaginatorReducer from "../components/tablePaginator/tablePaginatorSlice"

export default configureStore({
  reducer: {
    tableList: tableListReducer,
    tableFilters: tableFilterReducer,
    paginator: tablePaginatorReducer
  },
});
