import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation  } from "@reach/router"

import {
    selectTotalPages,
    selectOffset,
    setTotalPages,
    selectCurrentPage
} from "./tablePaginatorSlice";
import {
    selectSortedFilteredList
} from "../tableList/tableListSlice";

function TablePaginator(props) {
    const dispatch = useDispatch()
    const currentPage = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const offset = useSelector(selectOffset)
    const list = useSelector(selectSortedFilteredList)

    useEffect(() => {
        dispatch(setTotalPages(list.length/offset))
    },[ offset , list,  dispatch ])

    const renderPagination = () => {

        const rows = []
        for(let page = 0 ; page < totalPages ; page++) {
            rows.push(<li key={page + 1} className="page-item"><Link className="page-link" to={`?page=${page + 1}&offset=${offset}`}>{page + 1}</Link></li>)
        }
        return rows
    }
    return (
        <div className="row">
            <div className="col">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><Link className="page-link" to={ `?page=${currentPage - 1 }&offset=${offset}` }>Previous</Link></li>
                        { renderPagination() }
                        <li className="page-item"><Link className="page-link" to={ `?page=${currentPage + 1 }&offset=${offset}` }>Next</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default TablePaginator;