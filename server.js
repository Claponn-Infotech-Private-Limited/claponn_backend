const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use("/send", formRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
