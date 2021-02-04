import React, {useEffect} from 'react';
import { useSelector , useDispatch} from "react-redux";
import styled from 'styled-components'
import { RiForbid2Line, RiCheckLine } from "react-icons/ri";
import { useLocation } from "@reach/router"
import {parse} from "query-string";
import {
    selectSortedFilteredList,
    selectSortedFilteredPaginatedList,
} from "./tableListSlice"
import {
    selectOffset,
    setCurrentPage
} from "../tablePaginator/tablePaginatorSlice";
import TableSortHead from "../tableSortHead/TableSortHead";

function TableList(props) {
    const filteredList = useSelector(selectSortedFilteredPaginatedList)
    const pageOffset = useSelector(selectOffset)
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = parse(location.search)
    useEffect(() => {
        console.log("RENDERING TABLELIST")
        console.log(queryParams)
        if(queryParams.page) {
            dispatch(setCurrentPage(queryParams.page))
        }else {
            dispatch(setCurrentPage(1))
        }
    },[dispatch, queryParams])
    return (
        <div>
            {filteredList.length === 0 ? <h2>Nothing match search criteria</h2> :<div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <TableSortHead fields={["fullName", "balance", "isActive", "registered", "state", "country"]}/>
                            <tbody>
                            {
                                // renderList()
                                filteredList && filteredList.map((row, index) => {
                                    return <TableRow key={index} fields={row} number={(index + 1) + (queryParams.page > 1 ? pageOffset*(parseInt(queryParams.page) - 1) : 0)} />
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
        </div>
    );
}

const TableRow = styled(({className, fields, number}) => {
    return <tr>
        <th scope="row">{number}</th>
        <td>{fields.fullName}</td>
        <td>{fields.balance}</td>
        <td>{fields.isActive ? <RiCheckLine color="green" /> : <RiForbid2Line color="red" />}</td>
        <td>{fields.registered}</td>
        <td>{fields.state}</td>
        <td>{fields.country}</td>
    </tr>
})`
//display:flex;
//justify-content:space-between;
//align-item: center;
//padding-bottom:20px;
//border-bottom: 1px solid white;
//font-size:13px;
//> div {
//  padding:10px;
//}
`

export default TableList;