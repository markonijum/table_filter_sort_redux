import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { RangeSlider } from 'reactrangeslider';
import currency from 'currency.js'
import { navigate } from "@reach/router"
import { useSelector, useDispatch} from "react-redux";
import {
    selectMaxBalance,
    selectFilters,
    selectFailed,
    setActiveFilters, setMaxBalance
} from "./tableFilterSlice"

import { selectCurrentPage , setCurrentPage} from "../tablePaginator/tablePaginatorSlice";

const currencyStyle = {style: 'currency', currency: 'USD'}

const TableFilter = styled(({className}) => {
    const maxBalance = useSelector(selectMaxBalance)
    const filters = useSelector(selectFilters)
    const filterMessage = useSelector(selectFailed)
    const currentPage = useSelector(selectCurrentPage)

    const dispatch = useDispatch()


    let countries = []
    let states = []
    let years = []
    filters.forEach(filter => {
        if(filter.name === 'country'){
            countries = filter.value
        }
        if(filter.name === 'state') {
            states = filter.value
        }
        if(filter.name === 'registered'){
            years = filter.value
        }
    })
    const[searching, setSearching] = useState(false)
    const [inputFilters, setInputFilters] = useState([])
    const [balance, setBalance] = useState(
        {
            start: Intl.NumberFormat('en-Us', currencyStyle).format(0) ,
            end: Intl.NumberFormat('en-Us', currencyStyle).format(maxBalance)
        }
    )
    const handleFilterClick = (name, value) => {
        if(value === '' && inputFilters.find(el => el.name === name)) {
            setInputFilters(prevState => [...inputFilters.filter(el => el.name !== name)])
        }else if(value !== '' && inputFilters.find(el => el.name === name)) {
            setInputFilters([...inputFilters.map(el => {
                if(el.name === name) {
                    return {
                        name,
                        value
                    }
                }
                return el
            })])
        }else {
            setInputFilters(prevState => {
                        return [...prevState, {
                            name: name,
                            value: value
                        }]
                    })
        }
    }


    const handleClick = async () => {
        setSearching(true)
        // await dispatch(setActiveFilters(inputFilters))
        if(currentPage > 1 ) {
            // await dispatch(setCurrentPage(1))
            await navigate('/')
        }
        await dispatch(setActiveFilters(inputFilters))
        setSearching(false)
    }

    const onRangeChange = (value) => {
        console.log(value)
        setBalance({start: Intl.NumberFormat('en-Us', currencyStyle).format(value.start ? value.start : 0), end: Intl.NumberFormat('en-Us', currencyStyle).format(value.end ? value.end : maxBalance)})

        setInputFilters(prevState => {
            if(prevState.find(el => el.name === 'balance')) {
                return prevState.map(filter => {
                    if(filter.name === 'balance') {
                        return {
                            name: "balance",
                            value: {
                                start: (value.start ? Intl.NumberFormat('en-Us', currencyStyle).format(value.start) : Intl.NumberFormat('en-Us', currencyStyle).format(0)),
                                end : (value.end ? Intl.NumberFormat('en-Us', currencyStyle).format(value.end)  : Intl.NumberFormat('en-Us', currencyStyle).format(maxBalance))
                            }
                        }
                    }
                    return filter
                })
            }
            return [...prevState, {
                name: "balance",
                value: {
                    start: (value.start ? Intl.NumberFormat('en-Us', currencyStyle).format(value.start) : Intl.NumberFormat('en-Us', currencyStyle).format(0)),
                    end : (value.end ? Intl.NumberFormat('en-Us', currencyStyle).format(value.end)  : Intl.NumberFormat('en-Us', currencyStyle).format(maxBalance))
                }
            }]
        })
    }

    useEffect(() => {
        console.log("RENDERING FILTER")
        setBalance(prevState =>  ({ ...prevState, end : Intl.NumberFormat('en-Us', currencyStyle).format(maxBalance) }))
    },[maxBalance])

    return (
        <div className={className}>
            <div style={{minWidth:"150px"}} className="f-name input-field">
                <input className="form-control" onChange={(e) => handleFilterClick('fullName', e.target.value)} type="text" name="full_name" placeholder="Search by name..."/>
            </div>
            <div className="country">
                <select className="form-select" onChange={(e) => handleFilterClick('country', e.target.value)} name="countries" id="s-countries">
                    <option defaultValue value={''}>Country</option>
                    {countries.map((country, index) => {
                        return <option key={index} value={country}>{country}</option>
                    })}
                </select>
            </div>
            <div className="state">
                <select className="form-select" onChange={(e) => handleFilterClick('state', e.target.value)} name="states" id="s-states">
                    <option defaultValue value={''}>State</option>
                    {states.map((state, index) => {
                        return <option key={index} value={state}>{state}</option>
                    })}
                </select>
            </div>
            <div className="registered">
                <select className="form-select" onChange={(e) => handleFilterClick('registered', e.target.value)} name="registered" id="s-registered">
                    <option defaultValue value={''}>Registered</option>
                    {years.map((year, index) => {
                        return <option key={index} value={year}>{year}</option>
                    })}
                </select>
            </div>
            <div className="status">
                <select className="form-select" onChange={(e) => handleFilterClick('status', e.target.value)} name="states" id="s-states">
                    <option defaultValue value={''}>Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>
            </div>
            <div className="balance">
                <span>Balance range</span>
                <RangeSlider
                    step={100}
                    min={0}
                    max={maxBalance}
                    handleStyle={{height:"15px", width:"15px"}}
                    highlightedTrackStyle={{top:"6px"}}
                    wrapperStyle={{height:"auto", marginBottom:"10px", width:"95%"}}
                    trackStyle={{top:"6px"}}
                    onChange={onRangeChange}
                />
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <span className="start">{balance.start}</span>
                    <span className="end">{balance.end ? balance.end : Intl.NumberFormat('en-Us', currencyStyle).format(maxBalance) }</span>
                </div>
            </div>
            <div className="search-btn">
                <button style={{width:"100%"}} className="btn btn-primary" onClick={handleClick}>Search</button>
            </div>
            {searching && <p style={{width:"100%", margin:"30px 0"}}>Searching...</p>}
            {filterMessage !== '' && <p style={{width:"100%", margin:"30px 0"}}>{filterMessage}</p>}
        </div>
    );
})`
display:flex;
  width: 100%;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items: center;
  > div {
    width:100%;
    margin-bottom:15px;
    margin-right:5px;
    @media screen and (min-width: 768px) {
      width:24%;
    }
    @media screen and (min-width: 1200px) {
      width:12%;
    }
  }
  .balance {
    display:flex;
    flex-direction: column;
    justify-content: center;
    span.start, span.end {
      display:flex;
      justify-content: center;
      align-items: center;
      font-size:13px;
      padding:2px;
      color:black;
    }
  }
  .f-name {
    input {
      width:100%;
    }
  }
`

export default TableFilter;