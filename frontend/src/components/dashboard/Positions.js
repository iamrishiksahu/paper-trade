import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Container, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { setPositions, addNewPosition } from '../../features/positions/positionsState';

const rows = [{
  scriptName: 'RELIANCE',
  qty: 123,
  avgCost: 1435.6,
  ltp: 1778.8,

},
{
  scriptName: 'ADANIGREEN',
  qty: 123,
  avgCost: 1235.6,
  ltp: 1155.8,

},
{
  scriptName: 'TATAPOWER',
  qty: 123,
  avgCost: 1435.6,
  ltp: 1778.8,

},
{
  scriptName: 'CHOLAFIN',
  qty: 123,
  avgCost: 100,
  ltp: 94.66,

}
];

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

const Positions = () => {


  const [currentValue, setCurrentValue] = useState(0);
  const [totalPnL, setTotalPnL] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();
  const positionData = useSelector((store) => store.positionsData);
  const axiosp = useAxiosPrivate();

  const fetchAllPositions = async () => {

    let data;

    if (positionData.length != 0) {
      return
    }

    try {
      data = await axiosp.get('/user/positions')

      console.log(data);
      if (data) {
        dispatch(setPositions(data.data.positionsList));
      }


    } catch (err) {
      console.error(err)
    }


    setIsLoading(false);
  }


  useEffect(() => {

    setTotalPnL(4500.40);
    setCurrentValue(149023.44);

  }, [])


  useEffect(() => {
    setIsLoading(true);

    fetchAllPositions();
  }, [])
  return (

    <Container sx={{ padding: '2rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>

      <FlexBox>

        <FlexBox sx={{ justifyContent: 'flex-start', width: '50%', }}>
          <Typography variant='h5'>Positions ({positionData?.length})</Typography>


        </FlexBox>
        <FlexBox sx={{ justifyContent: 'flex-end', width: '50%', alignItems: 'flex-start' }}>


          {renderPreHeadingButtons()}
        </FlexBox>

      </FlexBox>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Instrument</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Avg. cost</TableCell>
              <TableCell align="right">LTP</TableCell>
              <TableCell align="right">Curr. Val.</TableCell>
              <TableCell align="right">P/L</TableCell>
              <TableCell align="right">Net chg.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positionData?.map((row) => (
              <TableRow
                key={row?.scriptName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.scriptName}
                </TableCell>
                <TableCell align="right">{row?.qty}</TableCell>
                <TableCell align="right">{row?.avgCost}</TableCell>
                <TableCell align="right">{row?.ltp}</TableCell>
                <TableCell align="right">{row?.ltp * row?.qty}</TableCell>
                {/* <TableCell align="right">{calcPnL(row)}</TableCell>
                <TableCell align="right">{calcDayChange(row)}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexBox sx={{ flex: 1, justifyContent: 'space-between ' }}>
        <Box>
          <Typography sx={{ color: 'grey.text' }}>Total investment</Typography>
          <Typography variant='h5'>90419.90</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: 'grey.text' }}>Crruent value</Typography>
          <Typography variant='h5' sx={{}}>{currentValue}</Typography>
        </Box>
        <Box>

          <Typography sx={{ color: 'grey.text' }}>Total P&L</Typography>

          {totalPnL < 0
            ?
            <Typography variant='h5' sx={{ color: 'red.main' }}>{totalPnL}</Typography>
            :
            <Typography variant='h5' sx={{ color: 'green.main' }}>{totalPnL}</Typography>

          }
        </Box>

      </FlexBox>
    </Container>
  );
}

export default Positions;