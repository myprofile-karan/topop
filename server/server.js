require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./utils/dbConfig.js");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}));

connect()


// routes import
const userRouter = require("./routes/user.routes.js");


//routes
app.use("/api", userRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
