import * as urlRepository from "../repositories/url.repository.js";
import { generateShortCode } from "../utils/shortCode.util.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";



// Create Short URL
export const createShortUrl = async (
    originalUrl,
    userId
) => {
    while(true){
        const shortCode = generateShortCode();
        const existingUrl = await urlRepository.findByShortCode(shortCode);

        if(existingUrl) continue;

        try{
            const url = await urlRepository.createUrl({
                originalUrl,
                shortCode,
                user: userId
            })
            return  url;
        }catch(error){
            //MongoDB duplicate key error
            if error.code === 11000 continue;
            throw error;
        }
    
    }
};


// Redirect URL
export const redirectUrl = async (shortCode) => {

    const url = await urlRepository.findByShortCode(shortCode);

    if (!url) {
        throw new AppError(
            ERROR_CODES.URL_NOT_FOUND,
            "Short URL does not exist.",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (url.expiresAt && url.expiresAt < new Date()) {

        throw new AppError(
            ERROR_CODES.URL_EXPIRED,
            "This URL has expired.",
            HTTP_STATUS.GONE
        );
    }

    await urlRepository.incrementClicks(shortCode);

    return url.originalUrl;
};


// Get All URLs Of Logged-in User
export const getUserUrls = async (userId) => {

    return await urlRepository.findByUserId(userId);

};


// Update URL
export const updateUrl = async (
    urlId,
    userId,
    updatedData
) => {

    const url =
        await urlRepository.findById(urlId);

    if (!url) {

        throw new AppError(
            ERROR_CODES.URL_NOT_FOUND,
            "URL not found.",
            HTTP_STATUS.NOT_FOUND
        );

    }

    if (url.user.toString() !== userId) {

        throw new AppError(
            ERROR_CODES.FORBIDDEN,
            "You are not allowed to update this URL.",
            HTTP_STATUS.FORBIDDEN
        );

    }

    const updatedUrl =
        await urlRepository.updateUrl(
            urlId,
            updatedData
        );

    return updatedUrl;
};


// Delete URL
export const deleteUrl = async (
    urlId,
    userId
) => {

    const url =
        await urlRepository.findById(urlId);

    if (!url) {

        throw new AppError(
            ERROR_CODES.URL_NOT_FOUND,
            "URL not found.",
            HTTP_STATUS.NOT_FOUND
        );

    }

    if (url.user.toString() !== userId) {

        throw new AppError(
            ERROR_CODES.FORBIDDEN,
            "You are not allowed to delete this URL.",
            HTTP_STATUS.FORBIDDEN
        );

    }

    await urlRepository.deleteUrl(urlId);

    return;
};