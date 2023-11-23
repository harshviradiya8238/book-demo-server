const express = require('express');

const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const dotenv = require('dotenv');
const connectDB = require("./db/connection")
const cors = require("cors")


dotenv.config();
const app = express();

app.use(cors())

app.use(bodyParser.json());
app.get("/", (req, res) => res.send("API is runningsss...."))


console.log(process.env.MONGO_URI);


connectDB();


app.use('/books', bookRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
