const express = require("express");
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();

const app = express();

connectToDB();

app.use(cors())
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server in up and running on port: ${PORT}`);
});
