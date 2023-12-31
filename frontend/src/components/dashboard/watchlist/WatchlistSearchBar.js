import React, { useEffect, useState } from 'react'
import { Box, Autocomplete, TextField, selectClasses } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { setWatchlist, addNewWatchListItem } from '../../../features/watchlist/watchlistState';
import { useDispatch } from 'react-redux';

const WatchlistSearchBar = () => {

    const [suggestions, setSuggestions] = useState([])

    const axios = useAxiosPrivate()
    const dispatch = useDispatch()

    const handleAutoCompleteChange = async (e) => {

        const selected = e.target.textContent

        if(selected.length == 0) return

        // Add this to the watchlist

        try {
            const response = await axios.post('/user/watchlist', {
                scriptName: selected,
                exchange: 'BSE',
                ltp: 234,
                tradingAllowed: true
            });
            dispatch(setWatchlist(response.data.data.watchlist))
        } catch (err) {
            console.error(err);
        }finally{
            e.target.value = null
        }



    }

    const getSuggestions = async (value) => {

        try {

            const res = await axios.get(`/market/symbol-search/?query=${value.toUpperCase()}`)

            // Adding label parameter to add into AutoComplete
            const data = res.data.map((item) => {
                return { ...item, label: item.security_id }
            })

            setSuggestions(data)

        } catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {

    //     if(value.length >= 3){
    //         getSuggestions()
    //     }else{
    //         setSuggestions([])
    //     }

    // }, [value])

    return (

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', paddingY: '0.25rem' }} >
            <SearchIcon color='grey' sx={{ maxWidth: '1rem', paddingLeft: '0.75rem' }} />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={handleAutoCompleteChange}
                options={suggestions}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} size='small' onChange={(e) => {
                    const value = e.target.value
                    if (value.length >= 3) {
                        getSuggestions(value)
                    } else {
                        setSuggestions([])
                    }


                }} placeholder='Search BSE stocks here!' />}
            />

            {/* <InputBase fullWidth placeholder='Search BSE stocks here!' /> */}
        </Box>

    )
}

export default WatchlistSearchBar