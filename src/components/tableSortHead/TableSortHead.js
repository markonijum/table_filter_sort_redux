import React from 'react'
import styled from 'styled-components'
import { setSortBy } from "../tableFilter/tableFilterSlice"
import { useDispatch } from "react-redux";

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
`

const SortByItem = styled(({className, fieldName}) => {
    const dispatch = useDispatch()
    const onHandleClick = (field, e) => {
        e.preventDefault()
        console.log("FIELD: ", field)
        dispatch(setSortBy(field))
    }

    return <th onClick={onHandleClick.bind(null,fieldName)} scope="col">{fieldName === 'fullName' ? 'Name' : fieldName === 'isActive' ? 'Active' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1) }</th>
})`
font-size: 13px;
`
export default TableSortHead