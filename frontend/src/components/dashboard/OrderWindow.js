import React from 'react'
import { Box, Container, Typography, TextField, Button, Dialog, DialogActions } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useRef } from 'react'
import OrderWindowContent from '../OrderWindowContent'

const OrderWindow = (props) => {


    const data = props.state;

    return (

        < Dialog open={data.open} onClose={props.handleClose}  hideBackdrop={true} >
            <OrderWindowContent data={data} />

        </Dialog >


    )
}

export default OrderWindow