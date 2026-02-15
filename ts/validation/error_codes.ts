/* --- OBJECTS --- */

export const ErrorCodes = {
    REQUIRED: "REQUIRED",
    INVALID_FORMAT: "INVALID_FORMAT",
    INVALID_EMAIL: "INVALID_EMAIL",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    INVALID_DATE: "INVALID_DATE",
    INVALID_CAP: "INVALID_CAP",
    INVALID_CREDIT: "INVALID_CREDIT",
    MUNICIPALITY_REQUIRED: "MUNICIPALITY_REQUIRED",
} as const;

/* --- TYPES --- */

export type ValidationErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];