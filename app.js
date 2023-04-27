require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const ejs = require("ejs");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const PORT = 3000 ?? process.env.PORT;

const app = express();

// Loggers
app.use(logger("dev"));
app.use(cors());

// Set view engine as EJS
const viewsPath = path.join(__dirname, "./views")
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Require static assets from public folder
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static("public"));

// JSON and BodyParser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ---------------ROUTES-------------

// HOME
app.use('/home', require('./routers/home'));

// ABOUT
app.use('/about', require('./routers/about'));

// FEEDBACK
app.use('/feedback', require('./routers/feedback'));

// PROFUCTS
app.use('/product', require('./routers/product'));

// CONTACT
app.use('/contact', require('./routers/contact'));

// PAYMENT
app.use('/payments', require('./routers/payment'));

// All Payments
app.use('/allPayments', require('./routers/allPayments'));

app.use('*', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to PRO-TEEN",
        data: "Welcome to PRO-TEEN"
    });
});

// Connect to MongoDB
const connectDB = require("./config/db.config");

connectDB()
  .then(() => {
    console.log("CONNECTED TO DATABASE!");

    app.listen(PORT, () => {
      console.log(`Server Started at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Not Connected to database");
});

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
console.log(`Error: ${err.message}`);
console.log("Shutting Down Server due to Uncaught Exception");
process.exit(1);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
console.log(`Error: ${err.message}`);
console.log("Shutting Down Server due to Unhandled Promise Rejection");
server.close(() => {
    process.exit(1);
});
});