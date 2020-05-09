require("dotenv").config({ path: "./config/config.env" });
import express, { json } from "express";
import colors from "colors";

// Files
import database from "./config/database"; // connect to MongoDB Database
import index from "./routes/index";

//initialization
const app = express();
database();

// Settings
const PORT = process.env.PORT || 4000;

app.use(json());

// Routes Setup
app.use("/api/v1/", index);

// Server Listens
app.listen(
  PORT,
  console.log(
    `Server Started in ${process.env.NODE_ENV} mode at http://localhost:${PORT}/api/v1/`
  )
);
