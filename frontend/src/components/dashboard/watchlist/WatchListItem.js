import React, { useState } from 'react'
import { Typography, IconButton, Box } from '@mui/material'
import { AddBoxOutlined, IndeterminateCheckBoxOutlined, InsertChart, DeleteTwoTone } from '@mui/icons-material'
import {  useDispatch } from 'react-redux'

import { scriptChange } from '../../../features/overview/chartFeatures'
import { toggleOrderWindowOpen } from '../../../features/orderWindowState'
import { useNavigate } from 'react-router-dom'

const HoverToolbar = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleItemIconClicked = (action, e) => {
        e.preventDefault();
        console.log(props.item)

        switch (action) {


            case 'BUY':
                dispatch(toggleOrderWindowOpen({ transactionType: 'BUY', scriptName: props.item.scriptName, ltp: props.item.ltp, exchange: props.item.exchange }))
                break;
            case 'SELL':
                dispatch(toggleOrderWindowOpen({ transactionType: 'SELL', scriptName: props.item.scriptName, ltp: props.item.ltp, exchange: props.item.exchange }))
                break;
            case 'CHART':
                if ('dashboard' !== window.location.pathname) {
                    navigate('/dashboard')
                }
                dispatch(scriptChange({ symbol: props.item.scriptName, exchange: 'BSE' }))
                break;
            case 'DELETE':
                // alert(`Deleting ${props.item.symbol}`)
                props.deleteItem({data: props.item})
                break;
            default:
                break;
        }
    }

    return (
        <div style={{ display: 'flex', maxHeight: '1rem', paddingTop: '0.25rem' }}>
            <IconButton color="blue" aria-label="buy quantity" onClick={(e) => handleItemIconClicked('BUY', e)}>
                <AddBoxOutlined />
            </IconButton>
            <IconButton color="red" aria-label="sell quantity" onClick={(e) => handleItemIconClicked('SELL', e)}>
                <IndeterminateCheckBoxOutlined />
            </IconButton>
            <IconButton color="blue" aria-label="chart" onClick={(e) => {
                handleItemIconClicked('CHART', e);
            }}>
                <InsertChart />
            </IconButton>
            <IconButton color="black" aria-label="chart" onClick={(e) => handleItemIconClicked('DELETE', e)}>
                <DeleteTwoTone />
            </IconButton>
        </div>
    )
}

const WatchListItem = (props) => {

    const [showToolbar, setShowToolbar] = useState(false)

    return (
        <div key={props.idx} className={'wathlist-item-container'}
            style={{ maxHeight: '2.5rem' }}
            onMouseOver={() => setShowToolbar(true)}
            onMouseOut={() => setShowToolbar(false)}
            >


            <Box sx={{ paddingY: '0.5rem', fontSize: '16px', paddingX: '1rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-1)' }} >

                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

                    <Typography >{props.stock.scriptName}</Typography>
                    <Typography sx={{ fontSize: '0.75rem' }} >{props.stock.exchange}</Typography>
                </Box>

                {showToolbar
                    ? <HoverToolbar deleteItem = {props.deleteItem} item={props.stock} />
                    : <Typography>{props.stock.ltp}</Typography>
                }

            </Box>


        </div>
    )
}

export default WatchListItem