import React, {useEffect} from 'react';
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { Link  } from "@reach/router"
import { GrPrevious, GrNext } from "react-icons/gr";
import {
    selectTotalPages,
    selectOffset,
    setTotalPages,
    selectPaginationList,
    selectCurrentPage,
    selectNeighbours,
    setCurrentPage
} from "./tablePaginatorSlice";
import {
    selectSortedFilteredList,
    selectSortedFilteredPaginatedList
} from "../tableList/tableListSlice";

function TablePaginatorRaw({className}) {
    const dispatch = useDispatch()
    const currentPage = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const neighbours = useSelector(selectNeighbours)
    const paginationList = useSelector(selectPaginationList)
    const offset = useSelector(selectOffset)
    const list = useSelector(selectSortedFilteredList)
    const paginatedList = useSelector(selectSortedFilteredPaginatedList)

    console.log("PAGINATION LIST: ", paginationList)

    useEffect(() => {
        dispatch(setTotalPages(Math.ceil(list.length/offset)))
    },[ offset , list,  dispatch ])

    return (
        <div style={{marginTop: "50px"}} className={`${className} row`}>
            {paginatedList.length === 0 ? null : <div className="col nav-wrapper">
                <nav aria-label="Page navigation example">

                    { paginationList.length > 0 &&  (<ul className="pagination">

                        { paginationList.map((page, index) => {

                            if(page === "PREV") {
                                return <li key={index} className="page-item"><Link className="page-link" to={`?page=${currentPage - (neighbours*2) - 1}&offset=${offset}`} href="#" >&#8678;</Link></li>
                            }
                            if(page === "NEXT") {
                                return <li key={index} className="page-item"><Link className="page-link" to={`?page=${currentPage + (neighbours*2) + 1}&offset=${offset}`} >&#8680;</Link></li>
                            }
                            return <li key={index} className="page-item"><Link className={`page-link${ parseInt(currentPage) === page ? ' active' : ''}`} to={`?page=${page}&offset=${offset}`}>{page}</Link></li>
                        })}
                    </ul>)}
                </nav>
                {/*<div className="input-field">*/}
                {/*    <label htmlFor="selectPage">Select Page: </label>*/}
                {/*    <input id="selectPage" onChange={e => dispatch(setCurrentPage(e.target.value))} type="number" placeholder="Select page..." max={totalPages} value={currentPage}/>*/}
                {/*</div>*/}
            </div>  }
        </div>
    );
}
const TablePaginator = styled(TablePaginatorRaw)`
  .nav-wrapper {
    display:flex;
    align-items: center;
    margin-bottom:30px;
  }
  .input-field {
    margin-left:20px;
    width:200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width:100px;
      padding:5px;
    }
  }
  ul {
    margin-bottom:0
  }
  li {
    outline: none;
    box-shadow: inset 0 -1px 0 #ddd;
  }
  a {
    outline:none;
    box-shadow: inset 0 -1px 0 #ddd;
    &:focus {
      outline:none;
      box-shadow: inset 0 -1px 0 #ddd;
    }
    &.active {
      background: blue;
      color:white;
    }
  }
`
export default TablePaginator;