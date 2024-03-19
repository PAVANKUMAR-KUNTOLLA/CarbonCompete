const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for local host
app.use(cors({}));

//import routes
const productRouter = require("./routes/product_routes");

app.use("/api/v1", productRouter);


mongoose
  .connect(process.env.DATABASE_CREDENTIALS)
  .then(() => app.listen(8080))
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error:", err));
