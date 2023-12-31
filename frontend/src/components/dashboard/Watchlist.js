import { Divider, Typography, Container, Box, TextField, InputBase, Button, StepperContext } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWatchlist, addNewWatchListItem } from '../../features/watchlist/watchlistState'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import WatchListItem from './watchlist/WatchListItem'

import fyers from 'fyers-api-v2'
import WatchlistSearchBar from './watchlist/WatchlistSearchBar'

const listOfStocks = [
    {
        scriptName: 'MAINFRA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'MARUTI',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'TATAMOTORS',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'TATASTEEL',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SBIN',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    }, ,
    {
        scriptName: 'ADANIPOWER',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'BAJFINANCE',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
    {
        scriptName: 'SUNPHARMA',
        ltp: 300.45,
        exchange: 'BSE',
        dayPercent: 0.33,

    },
]


const Watchlist = (props) => {


    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    const watchlistData = useSelector((store) => store.watchListData);

    const test = async () => {

        fyers.setAppId('CA9L7D7Z7O-100');
        fyers.setRedirectUrl('http://localhost:3000/fyersredirect');
        // const a = await fyers.generateAuthCode()

        const reqBody = {
            auth_code: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE2NzUxNTYwMzEsImV4cCI6MTY3NTE4NjAzMSwibmJmIjoxNjc1MTU1NDMxLCJhdWQiOiJbXCJkOjFcIiwgXCJkOjJcIiwgXCJkOjFcIiwgXCJkOjJcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJYUjE0NjMxIiwib21zIjpudWxsLCJub25jZSI6IiIsImFwcF9pZCI6IkNBOUw3RDdaN08iLCJ1dWlkIjoiZjUxNjIxMzU4YTYzNGY1OGIyNDRlZDNjZmQ3ZTdkNWMiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.nAM6nYsTMqpHZ0n12rwRfLZVbA0Fs2oObtexc0FJ4xY',

            secret_key: 'A18L0U97I4'

        }

        fyers.generate_access_token(reqBody).then((response) => {
            console.log(response)
        })

        // console.log(a);
        //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE2NzUxNTQ4ODYsImV4cCI6MTY3NTE4NDg4NiwibmJmIjoxNjc1MTU0Mjg2LCJhdWQiOlsiZDoxIiwiZDoyIiwiZDoxIiwiZDoyIl0sInN1YiI6ImF1dGhfY29kZSIsImRpc3BsYXlfbmFtZSI6IlhSMTQ2MzEiLCJvbXMiOm51bGwsIm5vbmNlIjoiIiwiYXBwX2lkIjoiQ0E5TDdEN1o3TyIsInV1aWQiOiJjMTllMzkzYjFkMGY0MzI3Yjg5NWUzNWVkYjk1ZWM1NCIsImlwQWRkciI6IjExNS4yNDAuOTAuMTMwLCAxMzAuMTc2LjE4NC43Iiwic2NvcGUiOiIifQ.tzVD2wxU8LD2OT6NmAMacIwnGiRYaPpoU-d6inuyISw
    }

    async function getQuotes() {
        fyers.setAccessToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2NzUxNTYwNTAsImV4cCI6MTY3NTIxMTQzMCwibmJmIjoxNjc1MTU2MDUwLCJhdWQiOlsiZDoxIiwiZDoyIiwiZDoxIiwiZDoyIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCajJOcFNLbFFVa0VWSFNoeFZwZTZMcmVZeU9Ea1hQZ201ZzVkTTctX2RDblBVekZtampYTEpEc0M2MjJrMlFJdTVQMEx2SGFOalFOcTBOTENSaHJTaXRxcEJLNkxvcTlUVlg2SnRpMEswYy1sSzFHQT0iLCJkaXNwbGF5X25hbWUiOiJSSVNISUsgS1VNQVIgU0FIVSIsIm9tcyI6bnVsbCwiZnlfaWQiOiJYUjE0NjMxIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.atuaA6T--ivRJHEAi6ZWIP_yOmyaZL2pRL7MAyABTKI")
        fyers.setAppId('CA9L7D7Z7O-100');

        let quotes = new fyers.quotes()
        let result = await quotes
            .setSymbol('NSE:ONGC-EQ')
            .getQuotes();
        console.log(result)
    }


    const abc = async () => {
        const reqBody = {
            symbol: ['NSE:ONGC-EQ', 'NSE:IOC-EQ'],

            dataType: 'symbolUpdate'

        }

        fyers.setAccessToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2NzUxNTYwNTAsImV4cCI6MTY3NTIxMTQzMCwibmJmIjoxNjc1MTU2MDUwLCJhdWQiOlsiZDoxIiwiZDoyIiwiZDoxIiwiZDoyIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCajJOcFNLbFFVa0VWSFNoeFZwZTZMcmVZeU9Ea1hQZ201ZzVkTTctX2RDblBVekZtampYTEpEc0M2MjJrMlFJdTVQMEx2SGFOalFOcTBOTENSaHJTaXRxcEJLNkxvcTlUVlg2SnRpMEswYy1sSzFHQT0iLCJkaXNwbGF5X25hbWUiOiJSSVNISUsgS1VNQVIgU0FIVSIsIm9tcyI6bnVsbCwiZnlfaWQiOiJYUjE0NjMxIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.atuaA6T--ivRJHEAi6ZWIP_yOmyaZL2pRL7MAyABTKI")
        fyers.setAppId('CA9L7D7Z7O-100');
        fyers.fyers_connect(reqBody, function (data) {
            console.log(data)
            //write your code here
        })
    }




    const fetchWatchlist = async () => {
        try {
            const response = await axios.get('/user/watchlist');
            dispatch(setWatchlist(response.data.watchlist))
        } catch (err) {
            console.error(err);
        }

    }

    const deleteWatchlistItem = async ({ data }) => {
        try {
            // const response = await axios.delete('/user/watchlist', {

            // })
            dispatch(deleteWatchlistItem({ item: data }))

        } catch (err) {
            console.error(err)
        }
    }


    const handleHover = () => {
        setIsHovering(prev => !prev);
    }


    useEffect(() => {

        fetchWatchlist();
    }, [])



    const addWatchListItem = async () => {



        const payload = {
            scriptName: 'HINDUNILVR',
            ltp: 2634.85,
            exchange: 'BSE',
            tradingAllowed: true,

        }
        const data = await axios.post('/user/watchlist', {
            payload
        });

        if (data.status === 201) {
            dispatch(addNewWatchListItem(payload));
        }

        console.log(data);


    }

    return (
        <>
            <Box sx={{ padding: 0 }} >


                <WatchlistSearchBar />

                <Divider />


                <Box sx={{ height: '100%' }}>
                    {

                        watchlistData.length != 0 ? watchlistData.map((stock, idx) => (
                            <WatchListItem key={idx} deleteItem={deleteWatchlistItem} stock={stock} idx={idx} />
                        )) : <Typography sx={{ paddingY: '4rem' }} align='center'>Add items to watchlist!</Typography>
                    }
                    {/* <Divider color='#e4e4e4' /> */}


                </Box>


                {/* <Button onClick={addWatchListItem} >Test</Button> {/*  */}
                {/* <Button onClick={abc} >getQuotes</Button> */}





            </Box>






        </>
    )
}

export default Watchlist