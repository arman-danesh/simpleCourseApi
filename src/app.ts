// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from "@middleware/errorHandler";
import Routes from "@routes/Routers"; // adjust the path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not specified

// Middleware
app.use(cors());  // Enable CORS if needed
app.use(express.json());  // Middleware to parse JSON requests

app.use('/api', Routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
