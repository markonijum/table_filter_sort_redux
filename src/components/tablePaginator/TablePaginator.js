import React, {useEffect, useState} from 'react';
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { Link , navigate } from "@reach/router"
import { GrPrevious, GrNext } from "react-icons/gr";
import {
    selectTotalPages,
    selectOffset,
    setOffset,
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
    const [selectedPage, setSelectedPage] = useState(currentPage)

    useEffect(() => {
        dispatch(setTotalPages(Math.ceil(list.length/offset)))
        setSelectedPage(currentPage)
    },[ offset , list,  dispatch, currentPage ])

    const handleSelectPage = (e) => {
        e.preventDefault()
        if(Number(e.target.value) > totalPages) {
            setSelectedPage(totalPages)
        }else if(Number(e.target.value < 1 )) {
            setSelectedPage(1)
        }else {
            setSelectedPage(e.target.value)
        }
    }

    return (
        <div style={{marginTop: "30px"}} className={`${className} row`}>
            {paginatedList.length === 0 ? null : <div className="col nav-wrapper">
                <form onSubmit={e => { e.preventDefault(); navigate(`/?page=${selectedPage}&offset=${offset}`)}} action="#">
                    <div className="fields-wrapper">
                        <div className="input-field">
                            <label htmlFor="selectPage">Go to Page: </label>
                            <input id="selectPage" name="gotopage" onChange={handleSelectPage} type="number" placeholder="Select page..." max={totalPages} value={selectedPage}/>
                        </div>
                        <div className="input-field form-group">
                            <div>Show </div>
                            <select onChange={e => dispatch(setOffset(e.target.value))} className="form-select r_per_page" name="records_per_page" id="r_per_page">
                                {/*<option defaultValue value={offset}>{offset}</option>*/}
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <div> records </div>
                        </div>
                    </div>
                </form>
                <nav aria-label="navigation">

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
            </div>  }
        </div>
    );
}
const TablePaginator = styled(TablePaginatorRaw)`
  .fields-wrapper {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    align-items: center;
  }
  .r_per_page {
    margin: auto 10px;
  }
  nav, form {
    margin-bottom:20px;
  }
  .nav-wrapper {
    display:flex;
    align-items: center;
    //margin-bottom:30px;
    justify-content: space-between;
    flex-wrap:wrap;
  }
  .input-field {
    &:last-child {
      margin-left:20px;
    }
    width:200px;
    display: flex;
    align-items: center;
    margin-top:10px;
    justify-content: flex-start;
    input {
      width:70px;
      margin-left:7px;
      padding:5px;
    }
  }
  ul {
    margin-bottom:0
  }
  li {
    outline: none;
    //box-shadow: inset 0 -1px 0 #ddd;
  }
  a {
    outline:none;
    //box-shadow: inset 0 -1px 0 #ddd;
    &:focus {
      outline:none;
      box-shadow: none;
    }
    &.active {
      background: blue;
      color:white;
    }
  }
`
export default TablePaginator;