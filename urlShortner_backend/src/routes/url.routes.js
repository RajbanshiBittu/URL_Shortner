import express from "express";

import * as urlController from "../controllers/url.controller.js";
import {
    createShortUrlSchema,
    updateUrlSchema,
} from "../validators/url.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
// Example authentication middleware
import { authenticateUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

// POST /api/url/shorten
router.post(
    "/shorten",
    authenticateUser,
    validate(createShortUrlSchema),
    urlController.createShortUrl
);


// GET /api/url/my-urls
router.get(
    "/my-urls",
    authenticateUser,
    urlController.getUserUrls
);


// PATCH /api/url/:id
router.patch(
    "/:id",
    authenticateUser,
    validate(updateUrlSchema),
    urlController.updateUrl
);


// DELETE /api/url/:id
router.delete(
    "/:id",
    authenticateUser,
    urlController.deleteUrl
);

export {router as urlRoutes};