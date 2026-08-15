// Sends a standardized success response.

// export const sendSuccessResponse = (
//     res,
//     {
//         statusCode: HTTP_STATUS.CREATED,
//         message: "Short URL created successfully.",
//         data: {
//             id: url._id,
//             originalUrl: url.originalUrl,
//             shortCode: url.shortCode,
//             shortUrl,
//             clicks: url.clicks,
//             createdAt: url.createdAt,
//         },
//     }
// );

// Sends a standardized success response.

export const sendSuccessResponse = (
    res,
    {
        statusCode = 200,
        message = "Success",
        data = null,
    }
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};