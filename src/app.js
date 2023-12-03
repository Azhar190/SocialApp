import express from "express";
import allRoutes from "./router/index.js";
import { connectdb } from "./database/config.js";
import dbInt from "./database/init.js";
const PORT = 3309;

const app = express();
app.use(express.json());
app.use("/", allRoutes);
connectdb();

dbInt()
  .then(() => console.log("Database synced"))
  .catch(() => console.log("Database not synced"));

app.listen(3301, () => {
  console.log("Server is ready http://localhost:3309");
});
