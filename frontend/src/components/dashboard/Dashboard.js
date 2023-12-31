import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Navbar from './Navbar'
import Watchlist from './Watchlist.js'
import DashboardFrame from './DashboardFrame'
import { Container, Box } from '@mui/system'
import OrderWindow from './OrderWindow'
import { useDispatch, useSelector } from 'react-redux'
import { toggleOrderWindowOpen } from '../../features/orderWindowState'


const Dashboard = (props) => {

  const [navHeight, setNavHeight] = useState('');

  const orderWindowState = useSelector((state) => state.orderWindow);
  const dispatch = useDispatch();

  useEffect(() => {

    const navElement = document.getElementById('navbar_main_container');
    const contentContainer = document.getElementById('main_content_container');
    contentContainer.style.paddingTop = (navElement.offsetHeight) + 'px'
  }, [])

  useEffect(() => {

  }, [orderWindowState])

  return (
    <>

      <Navbar sx={{ zIndex: 100 }} />

      <div id='main_content_container' style={{
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'hidden',
        marginLeft: '2rem',
        marginRight: '2rem',
        boxSizing: 'border-box', 
        boxShadow: '0px 4px 10px rgba(0,0,0,0.08)',
        minHeight: '100vh',
      }}>

        <div style={{
          width: '30vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'fixed',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}>

          <div style={{
            border: '1px solid #e4e4e4',
            borderTop: 'none',
            height: 'inherit',
            borderBottom: 'none',
            overflowY: 'auto',
            maxHeight: '100vh',
            minHeight: '100vh',
            flex: 1,
          }} id="watchlist_main">


            <Watchlist />
          </div>

        </div>

        <div className="dashboard_frame_main" style={{
          marginLeft: '30vw',
          width: '70vw',
        }}>
          <DashboardFrame />



        </div>
        <OrderWindow state={orderWindowState} handleClose={() => dispatch(toggleOrderWindowOpen())} handleClickOpen={() => dispatch(toggleOrderWindowOpen())} />
      </div>
    </>
  )
}

export default Dashboard