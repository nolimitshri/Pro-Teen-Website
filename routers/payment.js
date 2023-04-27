const express = require('express');
const router = express.Router();
const multer = require('multer');

const paymentModel = require('../models/paymentModel');

router.get("/", async(req, res) => {
    try{
        res.render('payment');
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});

// Set up multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image'); // Use .single() instead of .any()


router.post('/', upload, async(req, res) => {
    try{

        const payment = new paymentModel({
            name: req.body.name,
            paymentMethod: req.body.paymentMethod,
            transactionId: req.body.transactionId,
            itemName: req.body.itemName,
            image: req.file.buffer
        });

        payment.save()
        .then(() => res.redirect(`/payments/${payment.id}`))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err,
                data: "Some Error Occurred !!"
            });
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});

router.get('/:id', async(req, res) => {
    paymentModel.findById(req.params.id)
    .then(image => {
        res.render('image', { 
            name: image.name,
            paymentMethod: image.paymentMethod,
            itemName: image.itemName,
            transactionId: image.transactionId,
            image: image.image.toString('base64') // Convert the image buffer to base64 for sending over EJS
        });
    })
    .catch(err => console.log(err));
});

module.exports = router;