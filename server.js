const express = require('express');
const cors = require('cors');
const app  = express()
const cookieParser = require('cookie-parser')
const dbconnect = require("./db/db")
const userRoute = require('./Routes/user-route')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('dotenv').config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));



const port =  process.env.PORT || 3000

app.use("/api", userRoute)

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  dbconnect()
  .then(
  app.listen(port, () => { console.log(`server is running on the http://localhost:${port}`)}))
  .catch(err => {console.error(`Error in connecting to database ${err}`)})
