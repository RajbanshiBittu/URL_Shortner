import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.route.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { urlRoutes } from "./routes/url.routes.js";
import * as urlController from "./controllers/url.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// root route
app.get("/", (req, res) => {
    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Welcome to the URL Shortener API",
        version: "1.0.0",
    });
});

// Health Check Route
app.get("/health", (req, res) => {
    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Server is running successfully.",
    });
});

app.use("/api/auth", userRoutes);
app.use("/api/url", urlRoutes);
// Redirect route (outside /api)
app.get("/:shortCode", urlController.redirectUrl);

app.use((req, res) => {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: {
            code: "ROUTE_NOT_FOUND",
            message: `Cannot ${req.method} ${req.originalUrl}`,
        },
    });
});

// Global Error Handler
app.use(errorHandler);


export default app;