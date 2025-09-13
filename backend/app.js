import 'dotenv/config';
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT;

connectDB();

// Re-enable Helmet for security
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// The list of websites that are allowed to make requests
const allowedOrigins = [
  'http://localhost:3000',
  'https://main.d1sj7cd70hlter.amplifyapp.com',
  'https://expense-tracker-app-three-beryl.vercel.app',
];

// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.get("/", (req, res) => {
  res.send("Deployment sanity check successful!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
