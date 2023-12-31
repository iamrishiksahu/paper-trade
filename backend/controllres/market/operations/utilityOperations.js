const getSymbolSearchAPIUrl = (query) => {

    const API_KEY = process.env.ALPHAVANTAGE_BSE_API_KEY
    const FUNCTION_TYPE = 'SYMBOL_SEARCH'
    const url = `https://www.alphavantage.co/query?function=${FUNCTION_TYPE}&keywords=${query}&apikey=${API_KEY}`
    return url

}

module.exports = { getSymbolSearchAPIUrl }