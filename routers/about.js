const express = require('express');
const router = express.Router();

router.get("/", async(req, res) => {
    try{
        res.render('about');
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some Error Occurred !!",
            data: "Some Error Occurred !!"
        });
    }
});

module.exports = router;