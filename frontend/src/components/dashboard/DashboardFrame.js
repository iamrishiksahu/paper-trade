import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardFrame = (props) => {
  return (
    <Outlet sx={{overflowX: 'hidden', zIndex: -100}} symbol={props.symbol}/>
  )
}

export default DashboardFrame