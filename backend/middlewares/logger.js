const fs = require('fs');
const path = require('path');
const {format} = require('date-fns');
const { randomUUID } = require('crypto');

const logEvent = async (message, filename) => {

    const date = format(new Date(), 'dd-MM-yyy \t hh:mm:ss',);
    const toWrite = date + '\t' + randomUUID() + '\t' + message + '\n';
    console.log(toWrite);

    try{
        if(!fs.existsSync(path.join(__dirname, '..','logs'))){
            // directory does not exists
            try{
                fs.mkdirSync(path.join(__dirname, '..','logs'));         

            }catch(err){
                console.log(err.message);
            }
        }

        /**Writing contents to file */
        await fs.promises.appendFile(path.join(__dirname, '..','logs',filename), toWrite);

    }catch(err){
        console.log(err.message);
    
    }

   
}

const logRequest = (req, res, next) => {

    const url = req.url
    const method = req.method
    const origin = req.headers.origin

    logEvent(`origin: ${origin}\t method: ${method}\t endpoint: ${url}`, 'requestsLog.log')


    next();
}

module.exports = {logEvent, logRequest}