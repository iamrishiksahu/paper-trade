import React, { useEffect, useRef } from 'react'
import { Box, Container, Typography, TextField, Button, Dialog, DialogActions } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/system'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useDispatch } from 'react-redux'
import { setOrders, addNewOrder } from '../features/orders/orderState'
import { addNewPosition } from '../features/positions/positionsState'
import { toggleOrderWindowOpen } from '../features/orderWindowState'

const OrderWindowContent = (props) => {


    const data = props.data;
    const axios = useAxiosPrivate();
    const dispatch = useDispatch();

    const [orderPrice, setOrderPrice] = useState(data.ltp)
    const [orderQty, setOrderQty] = useState(1)



    const FlexBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        padding: '1rem',
    }))

    const colorTheme = () => {
        if (data.transactionType === undefined) {
            return 'grey.main'
        }
        const a = (data.transactionType === 'BUY') ? 'blue.main' : 'red.main'
        return a;
    }

    const placeOrderAction = async () => {


        let b;

        try {
            b = await axios.post('/user/orders', {
                payload: {
                    scriptName: data.scriptName,
                    qty: orderQty,
                    avgCost: orderPrice,
                    orderStatus: 'ACTIVE',
                    transactionType: data.transactionType,
                    orderType: 'LIMIT'
                }

            })

            if (b.status === 201) {
                dispatch(addNewOrder(b.data.data.orders[b.data.data.orders.length - 1]));
                window.location.reload()
                dispatch(toggleOrderWindowOpen)
                // dispatch(addNewPosition(b.data.data.orders[b.data.data.orders.length - 1]));
            } else {
                console.log("orderCreation: ", b);
            }
        } catch (err) {

            if (err.response.status === 402) {
                // INSUFFICIENT FUNDS
                alert(JSON.stringify(err.response.data))
            } else {

                console.error(err);
            }
        }
    }

    useEffect(() => {

    }, [orderQty, orderPrice])

    return (
        <Container disableGutters sx={{ width: '25rem', background: '#ffffff', borderRadius: '0.25rem', boxShadow: '0 0 2rem rgba(0,0,0,0.08)', overflow: 'hidden' }}>

            <FlexBox sx={{ gap: '0.5rem', backgroundColor: colorTheme, color: 'white' }}>
                <Typography variant='span' sx={{ fontWeight: 700 }}>{data.transactionType}</Typography>
                <Typography variant='span' sx={{ fontWeight: 600 }}>{data.scriptName}</Typography>
                <Typography variant='span' sx={{ fontWeight: 600 }}>{data.exchange}</Typography>
                <Typography variant='span' sx={{ fontWeight: 600 }}>x{orderQty} Qty</Typography>
                {/* <Typography variant='span'>{instrument.transactionType}</Typography> */}
            </FlexBox>

            <FlexBox sx={{ gap: '0.5rem', marginY: '1rem', justifyContent: 'center' }}>
                <TextField
                    required
                    id="order-qty"
                    label="Qty"
                    // autoFocus='autofocus'// to prevent focus losing onChange
                    type='number'
                    size='small'
                    onChange={(e) => setOrderQty(e.current.value)}
                    defaultValue={1}
                />
                <TextField

                    required
                    id="order-price"
                    label="Price"
                    // value={orderPrice}
                    // autoFocus='autoFocus' // to prevent focus losing onChange
                    onChange={(e) => setOrderPrice(e.current.value)}
                defaultValue={data.ltp}
                type='number'
                size='small'
                />

            </FlexBox>

            <FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e6e6e6' }}>

                <Box sx={{ gap: '0.25rem' }}>
                    <Typography variant='span' sx={{ color: 'black.text' }}>Margin </Typography>
                    <Typography variant='span' sx={{ color: 'blue.main' }}>₹{Math.round((orderQty* orderPrice) * 100) / 100}</Typography>
                </Box>

                <Button onClick={placeOrderAction} variant='contained' size='small' sx={{ height: '2rem', backgroundColor: colorTheme }}>{data.transactionType}</Button>

            </FlexBox>
        </Container>
    )
}

export default OrderWindowContent