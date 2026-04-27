import "dotenv/config"; // Must be at the VERY top
import express from "express";
import cors from "cors";
import { getRegisterRoutes } from "./register/routes";

const app = express();
const PORT = 3001;

// 1. Setup CORS (allows your frontend to talk to this API)
app.use(cors()); 

// 2. Setup JSON Parsing (allows Express to read req.body)
app.use(express.json());

// 3. Health Check
app.get("/", (req, res) => {
  res.send("NOUN Registration API is live!");
});

// 4. Routes (Remember the brackets!)
app.use("/register", getRegisterRoutes());

app.listen(PORT, () => {
  console.log(`🚀 Server live on http://localhost:${PORT}`);
});