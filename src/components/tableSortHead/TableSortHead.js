import React from 'react'
import styled from 'styled-components'
import { setSortBy } from "../tableFilter/tableFilterSlice"
import { useDispatch, useSelector } from "react-redux";
import { FaSort , FaSortUp, FaSortDown} from "react-icons/fa"
import { selectSortBy } from "../tableFilter/tableFilterSlice";

const TableSortHead = styled(({className, fields}) => {
    return <thead className={className}>
    <tr>
        <th scope="col">#</th>
        {fields.map((field, index) => {
            return <SortByItem key={index} fieldName={field} />
        })}
    </tr>
    </thead>
})`
//display:flex;
//justify-content: space-between;
//align-items: center;
//flex-wrap:wrap;
  background:#0b5ed7;
  //text-transform: uppercase;
  color:white;
`

const SortByItem = styled(({className, fieldName}) => {
    const dispatch = useDispatch()
    const sortBy = useSelector(selectSortBy)
    const onHandleClick = (field, e) => {
        e.preventDefault()
        console.log("FIELD: ", field)
        dispatch(setSortBy(field))
    }

    return <th className={className} onClick={onHandleClick.bind(null,fieldName)} scope="col"><div>{fieldName === 'fullName' ? 'Name' : fieldName === 'isActive' ? 'Active' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1) } {(sortBy.name === fieldName ? sortBy.direction === "ASC" ? <FaSortUp style={{position:"relative", top:"3px"}} /> : <FaSortDown /> : <FaSort />)}</div></th>
})`
font-size: 13px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &:hover {
    cursor:pointer;
  }
  .icon {
    width:20px;
    img {
      width:100%;
      margin:auto;
    }
  }
`
export default TableSortHead