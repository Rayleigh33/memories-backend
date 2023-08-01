const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js"); 
const dotenv = require("dotenv");

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: "true"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}));
app.use(cors());

app.use("/posts",postRoutes);
app.use("/user",userRoutes);

const port = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: "true", useUnifiedTopology: "true"})
  .then(() => app.listen(port,() => console.log(`server is running on ${port}`)))
  .catch((error) => console.log(error.message));

