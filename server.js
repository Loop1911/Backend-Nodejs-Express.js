


const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
connectDB();
const app = express();


const port = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactroutes"));
app.use("/api/user", require("./routes/userroutes"));
app.use(errorHandler);


app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});

