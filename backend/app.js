import 'dotenv/config';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

const app = express();
const port = process.env.PORT || 5000; // Provide a default port

// Connect to Database
connectDB();

// --- Middleware Configuration ---

// Security Headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://main.d1sj7cd70hlter.amplifyapp.com',
  'https://expense-tracker-app-three-beryl.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Modern Body Parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Logger
app.use(morgan("dev"));


// --- Routers ---
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Expense Tracker API is running" });
});


// --- Centralized Error Handling ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// --- Server Listener ---
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});