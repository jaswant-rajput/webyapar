const express = require('express');
const path = require('path');
const cors= require('cors')
const app = express();
const uploadRouter = require("./routes/uploadRouter");
const userRouter = require("./routes/userRoutes");
const { default: mongoose } = require('mongoose');

const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/assignment"

mongoose.connect(DB_URL).then(res => console.log("connected")).catch(err => console.log(err))

app.use(cors())
app.use(express.json())

// Assuming your images are in a directory named 'public/images'
app.use(express.static(`${__dirname}/`));



app.use("/",uploadRouter)
app.use("/",userRouter)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
