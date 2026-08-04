import { Url } from "../models/url.model.js";

// Create a new short URL
export const createUrl = async (urlData) => {
    return await Url.create(urlData);
};

// Find URL by its short code
export const findByShortCode = async (shortCode) => {
    return await Url.findOne({
        shortCode,
        isActive: true,
    });
};

// Find URL by MongoDB _id
export const findById = async (urlId) => {
    return await Url.findById(urlId);
};

// Get all URLs created by a user
export const findByUserId = async (userId) => {
    return await Url.find({ user: userId })
        .sort({ createdAt: -1 });
};

// Update URL
export const updateUrl = async (urlId, updatedData) => {
    return await Url.findByIdAndUpdate(
        urlId,
        updatedData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

// Delete URL permanently
export const deleteUrl = async (urlId) => {
    return await Url.findByIdAndDelete(urlId);
};


// Increment click count by 1
export const incrementClicks = async (shortCode) => {
    return await Url.findOneAndUpdate(
        {
            shortCode,
            isActive: true,
        },
        {
            $inc: {
                clicks: 1,
            },
        },
        {
            returnDocument: "after",
        }
    );
};