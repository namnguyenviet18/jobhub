const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');
const bookmarkRouter = require('./routes/bookmark');

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.listen(process.env.SERVER_PORT || 8080, console.log(`Example app listening on port ${process.env.SERVER_PORT}`));