import crypto from "crypto";


// Characters allowed in the short code.
// Base62 = A-Z + a-z + 0-9
const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Default length of generated short code.
const DEFAULT_CODE_LENGTH = 6;

// Generates a random Base62 short code.
export const generateShortCode = (
    length = DEFAULT_CODE_LENGTH
) => {
    
    const randomBytes = crypto.randomBytes(length);
    let shortCode = "";
    for (let i = 0; i < length; i++) {

        shortCode +=
            CHARACTERS[
                randomBytes[i] % CHARACTERS.length
            ];
    }

    return shortCode;
};