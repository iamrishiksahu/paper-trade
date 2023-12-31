import React from 'react'
import { Button, Container, Typography, Box, styled, ListItem, MenuList, List, Divider } from '@mui/material'
import { app_logo_url } from '../app/constants';
import Navbar from './dashboard/Navbar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import './Landing.css'

const Landing = () => {

  const navigate = useNavigate();

  const ColFlex = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',

    [theme.breakpoints.down("sm")]: {
      marginRight: '1rem',
      marginLeft: '1rem',

    }
    
  }))

  const RowFlex = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',


  }))


  return (
    <Box>


      {/* HEADER SECTION */}

      <Navbar />

      <ColFlex
        sx={{
          backgroundImage: 'url("../resources/hero-bg.jpg")',
          minHeight: '40vh',
          marginTop: '5rem',
          marginBottom: '1rem',
        }}
      >

        <img alt='logo' src="/logo192.png" style={{
          maxWidth: '2rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }} />

        <Typography variant='h4' align='center'>Try. Trade. Triumph.</Typography>
        <Typography align='center'
          sx={{
            maxWidth: '50rem',
            marginX: 'auto'
          }}
        >PaperTrade is a platform to practice trading with virtual money and build confidence.</Typography>

        <Button variant='outlined' onClick={()=> navigate('/login')}>Try Now</Button>

      </ColFlex>


      {/* DEMO IMAGE SECTION */}

      <ColFlex>
        <img className='demo-image' src={require('../resources/demonstration-bg.png')} />
      </ColFlex>

      {/* FEATURES SECTION */}


      <RowFlex className='rfx' sx={{ marginX: '12rem', marginY: '5rem'}}>

        <ColFlex sx={{
          width: '50%',
          minHeight: '10vw',
          alignItems: 'flex-start',
         
        }}>

          <Typography variant='h5' color={'blue.main'}>Features</Typography>

          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >INR 10 Lakh Virtual Money</Typography>
          </RowFlex>
          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >Place Buy/Sell Orders</Typography>
          </RowFlex>
          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >Create WatchList</Typography>
          </RowFlex>
          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >Monitor Your Positions</Typography>
          </RowFlex>
          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >View Market Charts</Typography>
          </RowFlex>
          <RowFlex>
            <ChevronRightIcon />
            <Typography color='blue.text' >Use 50+ Indicators on Charts</Typography>
          </RowFlex>

        </ColFlex>



        <ColFlex sx={{
          width: '50%',
          minHeight: '10vw',
        }}>

        <img src='/a8432.jpg' width='350px' />


        </ColFlex>

      </RowFlex>


      {/* Why PaperTrade */}

      {/* Call to action section */}

      <ColFlex
        sx={{
          backgroundColor: '#ffffff',
          paddingY: '2rem',
          marginX: '12rem',
          marginY: '2rem',
          borderRadius: '2rem',
          boxShadow: '0 0 30px 10px #f5faff'
        }}
      >

        <Typography align='center' variant='h5' color='blue.main'  >Ready to start your trading journey?</Typography>
        <Typography align='center' color='black.text' fontWeight={'400'} >Begin by testing your strategies and systems by taking paper trades to avoid real money losses.</Typography>

        <Button variant='outlined'  onClick={()=> navigate('/login')} >Try Now</Button>

      </ColFlex >

      {/* Footer Component  */}


      <RowFlex sx={{
        justifyContent: 'space-between',
        paddingX: '12rem',
        paddingY: '3rem',
        backgroundColor: '#e6e6e6',
        flexWrap: 'wrap',
      }} >

        <ColFlex
          sx={{
            // alignItems: 'flex-start',
            gap: '0.5rem',
            flex: '1 1 0'

          }}
        >

          <img  src="/logo192.png" alt="logo" style={{ maxWidth: '32px', }} />

          <Typography color='black.text'>Project - PaperTrade</Typography>
          <Typography color='grey.text' fontWeight={'300'} align='center'>A platform to take trades using virtual money.<br />&#169; Rishik Sahu</Typography>


        </ColFlex>

        <ColFlex
          sx={{
            justifyContent: 'flex-start',
            gap: '0rem',
            flex: '1 1 0'
          }}
        >

          <Typography color='black.text'>Developer</Typography>
          <Divider sx={{ width: '5rem', marginY: '0.25rem' }} />
          <Typography color='grey.text' fontWeight={'400'} >Rishik Sahu</Typography>
          <Typography color='grey.text' fontWeight={'400'} >+91-8987400143</Typography>
          <Typography color='grey.text' fontWeight={'400'} >iamrishiksahu@gmail.com</Typography>
          



        </ColFlex>

        <ColFlex
          sx={{
            justifyContent: 'flex-start',
            gap: '0rem',
            flex: '1 1 0'

          }}
        >
          <Typography color='black.text'>Technologies</Typography>
          <Divider sx={{ width: '5rem', marginY: '0.25rem' }} />
          <Typography color='grey.text' fontWeight={'400'} >MERN Stack</Typography>
          <Typography color='grey.text' fontWeight={'400'} >Material UI</Typography>
          <Typography color='grey.text' fontWeight={'400'} >JSONWebToken</Typography>



        </ColFlex>

        <ColFlex
          sx={{
            justifyContent: 'flex-start',
            gap: '0rem',
            flex: '1 1 0'

          }}
        >

          <Typography color='black.text'>Test Account</Typography>
          <Divider sx={{ width: '5rem', marginY: '0.25rem' }} />
          <Typography color='grey.text' fontWeight={'400'} >Test@gmail.com</Typography>
          <Typography color='grey.text' fontWeight={'400'} >Pass: Test@123</Typography>
          <Typography color='grey.text' fontWeight={'400'} >Only for testing.</Typography>


        </ColFlex>

      </RowFlex>

    </Box>
  )
}

export default Landing