import React, { useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import TableList from "./components/tableList/TableList";
import TableFilter from "./components/tableFilter/TableFilter"
import './App.css';
import TablePaginator from "./components/tablePaginator/TablePaginator";
import { selectLoading, fetchDataListAsync } from "./components/tableList/tableListSlice";

function App() {
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDataListAsync())
    },[dispatch])
  return (
    <div className="App">
        <div className="container">
            { loading ? <h2>Loading data...</h2> : <><TableFilter />
                <TableList />
                <TablePaginator /></>}
        </div>
    </div>
  );
}

export default App;
