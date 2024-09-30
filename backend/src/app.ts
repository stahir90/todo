import express from "express";
import router from "./routes/task";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Apply the routes using a base path (e.g., "/tasks")
app.use("/tasks", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
