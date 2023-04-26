const mongoose = require('mongoose');

// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Calcutta").format();
// console.log(dateIndia);
// console.log(Date.now());

const imageSchema = new mongoose.Schema({
    name: String,
    paymentMethod: String,
    transactionId: String,
    itemName: String,
    image: Buffer
}, {timestamps: true});
  
const Image = mongoose.model('Payment', imageSchema);

module.exports = Image;
