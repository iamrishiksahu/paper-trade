const express = require('express');
const router = express.Router();
const Constants = require('../models/Constants');
const TestModel = require('../models/TestModel');



router.post('/', async (req, res) => {

    // res.status(200).json({message: "asdf"})

    const data = await TestModel.create({

        testObject: 23423.66
    })
    
    res.json({data: data})

})

module.exports = router