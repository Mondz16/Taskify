import express from "express";
import cors from "cors";
import authRoutes from "./routers/authRoutes.js";
import boardRoutes from "./routers/boardRoutes.js";
import listRoutes from "./routers/listRoutes.js";
import cardRoutes from "./routers/cardRoutes.js";
import healthCheck from "./routers/healthCheckRoutes.js"


const app = express();

// middlewares
app.use(cors({
    allowedHeaders: process.env.CORS_ORIGIN
}));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/healthcheck", healthCheck);

export default app;
