import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Container, Box, Button, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import OrderWindow from './OrderWindow';
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';

import { createOrder, getOrders } from '../../features/orders/ordersApi';
import { setOrders } from '../../features/orders/orderState';
import { addNewPosition } from '../../features/positions/positionsState';


const preHeadingButtons = [
  {
    title: 'Authorization',
    id: 'auth'
  },
  {
    title: 'Family',
    id: 'family'
  },
  {
    title: 'Analytics',
    id: 'analytics'
  },
  {
    title: 'Download',
    id: 'download'
  },
]

const calcPnL = (row) => {
  const a = Math.round(((row.ltp * row.qty - row.avgCost * row.qty) * 100)) / 100;

  if (a < 0) {
    return <Typography sx={{ color: 'red.main' }}>{a}</Typography>
  } else {
    return <Typography sx={{ color: 'green.main' }}>+{a}</Typography>

  }
}

const calcDayChange = (row) => {
  const a = Math.round(((row.ltp - row.avgCost) / row.avgCost) * 10000) / 100;

  if (a < 0) {
    return <Typography sx={{ color: 'red.main' }}>{a}</Typography>
  } else {
    return <Typography sx={{ color: 'green.main' }}>+{a}</Typography>

  }
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex'
}))

const PreHeadingButtons = styled(Button)(({ theme }) => ({

  color: theme.palette.blue.main,
  fontSize: '.75rem',
  textTransform: 'none',

}));

const renderPreHeadingButtons = () => {

  return (
    preHeadingButtons.map((item) => (

      <PreHeadingButtons key={item.id} variant='text'>{item.title}</PreHeadingButtons>
    ))
  )
}

const Orders = () => {


  const axiosp = useAxiosPrivate();


  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [waste, setWaste] = useState(true);

  const auth = useSelector((store) => store.authData);
  let orderData = useSelector((store) => store.ordersData);
  // orderData = orderData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)s);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAllOrders = async () => {

    let data;

    if (orderData.length != 0) {
      return
    }

    try {
      data = await axiosp.get('/user/orders')
      if (data) {
        dispatch(setOrders(data.data.ordersList));
      }


    } catch (err) {
      console.error(err)
    }


    setIsLoading(false);
  }

  useEffect(() => {


    setIsLoading(true);

    fetchAllOrders();


  }, [])

  useEffect(() => {

  }, [orderData])

  const testg = async () => {

    console.log(orderData)
  }



  return (

    <Container sx={{ padding: '2rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>



      <FlexBox>

        <FlexBox sx={{ justifyContent: 'flex-start', width: '50%', }}>
          <Typography variant='h5'>Orders ({orderData.length})</Typography>

        </FlexBox>

        <FlexBox sx={{ justifyContent: 'flex-end', width: '50%', alignItems: 'flex-start' }}>


          {renderPreHeadingButtons()}
        </FlexBox>

      </FlexBox>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow  >
              <TableCell width={'14.28%'} sx={{ color: 'grey' }}>Time</TableCell>
              <TableCell width={'18.56%'} align="left" sx={{ color: 'grey' }}>Instrument</TableCell>
              <TableCell width={'14.28%'} align="left" sx={{ color: 'grey' }}>Type</TableCell>
              <TableCell width={'14.28%'} align="left" sx={{ color: 'grey' }}>Price</TableCell>
              <TableCell width={'14.28%'} align="left" sx={{ color: 'grey' }}>Qty.</TableCell>
              <TableCell width={'14.28%'} align="left" sx={{ color: 'grey' }}>Total value</TableCell>
              <TableCell width={'10%'} align="left" sx={{ color: 'grey' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData?.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{format(new Date(row?.createdAt), 'hh:mm:ss')}</TableCell>
                <TableCell align="left" >{row?.scriptName}</TableCell>
                <TableCell align="left"><span style={{ color: row?.transactionType === 'BUY' ? '#4184f3' : '#ff5722' }}>{row?.transactionType}</span></TableCell>
                <TableCell align="left">{row?.avgCost}</TableCell>
                <TableCell align="left">{row?.qty}</TableCell>
                <TableCell align="left">{row?.avgCost * row?.qty}</TableCell>
                <TableCell align="left">{row?.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Button onClick={handleClickOpen}>open</Button>
      <Button onClick={testg}>{'Test'}</Button> */}

    </Container>
  );
}

export default Orders;