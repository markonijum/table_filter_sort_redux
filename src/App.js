import React, { useEffect} from 'react';
import { useSelector, useDispatch} from "react-redux";
import TableList from "./components/tableList/TableList";
import TableFilter from "./components/tableFilter/TableFilter"
import './App.css';
import TablePaginator from "./components/tablePaginator/TablePaginator";
import { selectLoading, fetchDataListAsync } from "./components/tableList/tableListSlice";
import ReactLoading from "react-loading"

function App() {
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDataListAsync())
    },[dispatch])
  return (
    <div className="App">
        <div className="container">
            <h2 style={{textAlign:"center", margin:"50px auto"}}>Table Sort and Filter Test</h2>
            { loading ? <div className="loading-wrapper">
                <ReactLoading type="spin" color="blue" height={100} width={100} />
                <h3>Loading data...</h3>
            </div> : <><TableFilter />
                <TablePaginator />
                <TableList />
                <TablePaginator /></>}
        </div>
    </div>
  );
}

export default App;
