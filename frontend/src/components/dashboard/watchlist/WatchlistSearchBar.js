import React, { useEffect, useState } from 'react'
import { Box, Autocomplete, TextField, selectClasses, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { setWatchlist, addNewWatchListItem } from '../../../features/watchlist/watchlistState';
import { useDispatch } from 'react-redux';

const WatchlistSearchBar = () => {

    const [suggestions, setSuggestions] = useState(['asd','sfg'])

    const axios = useAxiosPrivate()
    const dispatch = useDispatch()

    const handleAutoCompleteChange = async (e) => {

        const selected = e.target.textContent

        console.log(selected)

        if (selected.length == 0) return

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
        } finally {
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', paddingY: '0.25rem', marginRight: '1rem' }} >

            {/* <SearchIcon color='grey' sx={{ maxWidth: '1rem', paddingLeft: '0.75rem' }} /> */}
            <Autocomplete
                // disablePortal
                id="combo-box-demo"
                onChange={handleAutoCompleteChange}
                options={suggestions}
                sx={{ width: '100%' }}

                renderInput={(params) => (<TextField

                    {...params}
                    size='small'
                    variant='standard'

                    InputProps={{
                        startAdornment: <SearchIcon color='grey' sx={{ maxWidth: '1rem', paddingX: '0.75rem' }} />, // <== adjusted this
                        // disableUnderline:    , // <== added this
                        

                      }}
                      sx={{
                        "& fieldset": { border: 'none' },
                      }}

                    style={{
                        width: '100%',
                        // height: '1rem',
                        padding: '0.5rem',
                        border: 'none',
                        outline: 'none',
                        border: 'none',
                    }}
                    onChange={(e) => {
                        const value = e.target.value
                        if (value.length >= 3) {
                            getSuggestions(value)
                        } else {
                            setSuggestions([])
                        }
                    }}


                    placeholder='Search BSE stocks here eg: RELIANCE,'
                />)}
            />




            {/* <InputBase fullWidth placeholder='Search BSE stocks here!' /> */}
        </Box>

    )
}

export default WatchlistSearchBar