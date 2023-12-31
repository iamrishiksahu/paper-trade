import React, { useState } from 'react'
import { Button, Typography, Divider, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { styled } from '@mui/system'
// import { axiosPrivate as axios } from '../../api/axiosConfig'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect } from 'react'
import { axiosPrivate } from '../../api/axiosConfig'

const FundsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey.text,
}));

const FundsValueMain = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.text,
  fontSize: '1.5rem',
  fontWeight: 400,

}));

const FundsValueSecondary = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.text,
  fontWeight: 400,

}));
const FundsItemContainer = styled(Box)(({ theme }) => ({

  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  margin: '1rem 0',
  alignItems: 'center'

}));
const FundsButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'black',
  padding: 8,
  borderRadius: 4,
  textTransform: 'none',
  padding: '0.5rem 1rem'

}));

const FlexBox = styled(Box)(({ theme }) => ({

  display: 'flex',
  alignItems: 'center'

}))

const secondaryFundsName = ['Opening Balance', 'Payin', 'Payout', 'SPAN', 'Delivery Margin', 'Exposure', 'Options Premium', 'Collateral (Liquid Funds)', 'Collateral (Equity)', 'Total Collateral'];

const secondaryFundsValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Funds = () => {

  const axios = useAxiosPrivate();

  const [funds, setFunds] = useState({});

  const withdrawFunds = async () => {
    const res = await axios.put('/user/funds', {
      'amount': 434.5,
      'transaction_type': 'DR'
    });

    if(res.status === 201){
      setFunds(res?.data)
    }else{
      // handle error in funds addition
    }
  
  }

  const addFunds = async () => {
    const res = await axios.put('/user/funds', {
      'amount': 434.57,
      'transaction_type': 'CR'
    });

    if(res.status === 201){
      setFunds(res?.data)
    }else{
      // handle error in funds addition
    }
  
  }

  const getFunds = async () => {

    const response = await axios.get('/user/funds');

    if(response){

      console.log(response)

      setFunds(response.data.fundsData)

    } else {
      console.log('response recieved empty funds.js')
    }

  }

  useEffect(() => {

    
    getFunds();
  }, [])

  return (

    <Box maxWidth='false' sx={{ boxShadow: '4px 40px 10px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', margin: '0.25rem 0 0 0', background: 'white', padding: '2rem 1rem', gap: '1rem', overflowX: 'hidden' }}>

      {/* TOP COMPONENT */}

      <FlexBox sx={{ justifyContent: 'flex-end', gap: '1rem' }} >

        <div style={{ display: 'flex' }}>


          <Typography>Instant, zero-cost funds transfer with</Typography>
          <img height={'24 rem'} width={'auto'} src={'https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_169316.png'}></img>
        </div>

        <FundsButton onClick={addFunds} sx={{ backgroundColor: 'green.main', '&:hover': { backgroundColor: 'green.medium' } }}>Add Funds</FundsButton>
        <FundsButton onClick={withdrawFunds} sx={{ backgroundColor: 'blue.main', '&:hover': { backgroundColor: 'blue.medium' } }}  >Withdraw</FundsButton>


      </FlexBox>


      {/* BOTTOM COMPONENT */}
      <FlexBox sx={{ alignItems: 'flex-start' }}>

        {/* LEFT COMPONENT */}
        <Box sx={{ margin: '0 2rem', padding: '1rem 2rem', boxSizing: 'border-box', width: '50%', gap: '.75rem', display: 'flex', flexDirection: 'column' }}>

          <FlexBox sx={{ justifyContent: 'space-between' }}>
            <FlexBox>

              <Typography>Equity</Typography>
            </FlexBox>

            <FlexBox sx={{ gap: '0.75rem' }}>
              <Typography sx={{ color: 'blue.main', fontSize: '0.75rem' }}>View Statement</Typography>
              <Typography sx={{ color: 'blue.main', fontSize: '0.75rem' }}>Help</Typography>

            </FlexBox>
          </FlexBox>

          <Paper variant="outlined" square sx={{ padding: '1rem  2rem' }}>

            <FundsItemContainer>

              <FundsTitle>Available Margin</FundsTitle>
              <FundsValueMain className='funds_breakup_amt'>

              {funds?.fundsInfo?.available_funds}
                

              </FundsValueMain>

            </FundsItemContainer>

            <FundsItemContainer>

              <FundsTitle>Used Margin</FundsTitle>
              <FundsValueMain className='funds_breakup_amt'>2L</FundsValueMain>

            </FundsItemContainer>



            <FundsItemContainer>

              <FundsTitle>Available Cash</FundsTitle>
              <FundsValueMain className='funds_breakup_amt'>{funds?.fundsInfo?.available_funds}</FundsValueMain>

            </FundsItemContainer>

            <Divider variant='full' />

            {secondaryFundsName.map((item) => (


              <FundsItemContainer key={item}>

                <FundsTitle>{item}</FundsTitle>
                <FundsValueSecondary>0.00</FundsValueSecondary>

              </FundsItemContainer>
            ))}

          </Paper>


        </Box>

        {/* RIGHT COMPONENT */}

        <Box sx={{ margin: '0 2rem', padding: '1rem 2rem', boxSizing: 'border-box', width: '50%', gap: '.75rem', display: 'flex', flexDirection: 'column' }}>

          <FlexBox sx={{ justifyContent: 'space-between' }}>
            <FlexBox>

              <Typography>Commodity</Typography>
            </FlexBox>

            <FlexBox sx={{ gap: '0.75rem' }}>
              <Typography sx={{ color: 'blue.main', fontSize: '0.75rem' }}>View Statement</Typography>
              <Typography sx={{ color: 'blue.main', fontSize: '0.75rem' }}>Help</Typography>

            </FlexBox>
          </FlexBox>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '1rem' }}>


            <img style={{ width: '6rem', margin: 'auto', marginTop: '2rem' }} src="https://kite.zerodha.com/static/images/illustrations/positions.svg" alt="Anchor icon"></img>
            <Typography>You don't have a commodity account</Typography>
            <FundsButton sx={{ backgroundColor: 'blue.main', margin: 'auto', width: '8rem', '&:hover': { backgroundColor: 'blue.medium' } }}>Activate</FundsButton>

          </Box>


        </Box>

      </FlexBox>


      {/* RIGHT COMPONENT */}

      <FlexBox>

      </FlexBox>






    </Box >
  )
}

export default Funds


