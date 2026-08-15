import * as urlService from "../services/url.services.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { sendSuccessResponse } from "../utils/response.util.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";


// POST /api/url/shorten
// Create Short URL

export const createShortUrl = asyncHandler(async (req, res) => {

    const { originalUrl } = req.body;

    const url = await urlService.createShortUrl(
        originalUrl,
        req.user.id
    );

    const shortUrl =
        `${req.protocol}://${req.get("host")}/${url.shortCode}`;

    return sendSuccessResponse(
        res,
        {
            statusCode: HTTP_STATUS.CREATED,

            message: "Short URL created successfully.",

            data: {
                id: url._id,
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl,
                clicks: url.clicks,
                createdAt: url.createdAt,
            },
        }
    );
});

// GET /:shortCode
// Redirect to Original URL

export const redirectUrl = asyncHandler(async (req, res) => {

    const { shortCode } = req.params;

    const originalUrl =
        await urlService.redirectUrl(shortCode);

    return res.redirect(originalUrl);
});


// GET /api/url/my-urls
// Get Logged-in User's URLs

export const getUserUrls = asyncHandler(async (req, res) => {

    const urls = await urlService.getUserUrls(
        req.user.id
    );

    return sendSuccessResponse(
        res,
        {
            statusCode: HTTP_STATUS.OK,

            message: "URLs fetched successfully.",

            data: urls,
        }
    );
});


// =====================================================
// PATCH /api/url/:id
// Update URL
// =====================================================

export const updateUrl = asyncHandler(async (req, res) => {

    const updatedUrl =
        await urlService.updateUrl(
            req.params.id,
            req.user.id,
            req.body
        );

    return sendSuccessResponse(
        res,
        {
            statusCode: HTTP_STATUS.OK,

            message: "URL updated successfully.",

            data: updatedUrl,
        }
    );
});


// DELETE /api/url/:id
// Delete URL

export const deleteUrl = asyncHandler(async (req, res) => {

    await urlService.deleteUrl(
        req.params.id,
        req.user.id
    );

    return sendSuccessResponse(
        res,
        {
            statusCode: HTTP_STATUS.OK,

            message: "URL deleted successfully.",

            data: null,
        }
    );
});