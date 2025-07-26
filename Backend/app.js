const express = require('express');
const dotenv = require('dotenv')
const app = express();
const userRouter = require('./Routes/user')
const movieRouter = require('./Routes/movie');
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors())

app.use('/api/user',userRouter);
app.use('/api/movie',movieRouter);

const connectDB = require("./Config/db");
connectDB();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});