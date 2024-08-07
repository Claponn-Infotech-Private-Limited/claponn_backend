// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const dotenv = require("dotenv")

const app = express();

app.use(cors(
  {
    origin : "https://localhost:5173/",
    methods: ['GET', 'POST'],
  }
));
app.use(bodyParser.json());
dotenv.config();
app.use("/api/form", formRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
