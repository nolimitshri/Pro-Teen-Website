const express = require('express');
const router = express.Router();
const multer = require('multer');

const paymentModel = require('../models/paymentModel');

router.get("/", async(req, res) => {
    try{
        const allPayments = await paymentModel.find();
        if(allPayments.length != 0){
            res.render('allPayments', {
                avail: true,
                data: allPayments
            });
        } else {
            res.render('allPayments', {
                avail: false
            });
        }
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});



module.exports = router;