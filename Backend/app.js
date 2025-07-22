const express = require('express');
const dotenv = require('dotenv')
const app = express();
const userRouter = require('./Routes/user')

dotenv.config();

app.use(express.json());

app.use('/api/user',userRouter);

const connectDB = require("./Config/db")
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});