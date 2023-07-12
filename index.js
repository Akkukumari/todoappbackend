const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { todosRouter } = require("./routes/todos.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/todos", todosRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`Server is running at port ${process.env.port}`);
  } catch (err) {
    console.log(err);
    console.log("Something went wrong!!");
  }
});
