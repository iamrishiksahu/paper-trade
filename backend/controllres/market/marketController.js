const axios = require('axios')
const { getSymbolSearchAPIUrl } = require("./operations/utilityOperations")
const symbolsData = require('../../static/BSE_SYMBOL_DATA.json')


const searchSymbolInMarket = async (req, res) => {

    const { query } = req.query

    const data = symbolsData.filter(item => item.security_id.includes(query))
    res.json(data)


    // BELOW CODE IS FOR ALPHAVANTAGE API: FREE LIMIT 25 REQUESTS PER DAY

    // try {
    //     const res = await axios.get(getSymbolSearchAPIUrl(query))
    //     console.log(res.data)
    //     res.json({ data: res.data })
    // } catch (err) {
    //     res.json({ err: res.data })
    // }


}

module.exports = { searchSymbolInMarket }