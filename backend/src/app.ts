import express from "express";
import router from "./routes/task";
import cors from "cors";

const app = express();

// Use PORT from environment variables or default to 4000 for backend
const port = process.env.PORT || 4000;

// Use FRONTEND_PORT from environment variables or default to 3000
const frontendPort = process.env.FRONTEND_PORT || 3000;
const frontendUrl = `http://localhost:${frontendPort}`;

// Configure CORS to accept requests from the frontend URL
app.use(
  cors({
    origin: frontendUrl,
  })
);

app.use(express.json());

// Apply the routes using a base path (e.g., "/tasks")
app.use("/tasks", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`CORS enabled for requests from ${frontendUrl}`);
});
