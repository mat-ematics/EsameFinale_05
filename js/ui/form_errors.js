export const DEFAULT_ERROR_MESSAGE = 'Invalid Input';
export const FieldErrorMessagesMap = {
    name: {
        REQUIRED: "Name is required",
        TOO_SHORT: "Name should be at least 3 characters long",
        INVALID_FORMAT: "Name should contain only letters",
    },
    surname: {
        REQUIRED: "Surname is required",
        TOO_SHORT: "Surname should be at least 3 characters long",
        INVALID_FORMAT: "Surname should contain only letters",
    },
    email: {
        REQUIRED: "E-mail is required",
        INVALID_EMAIL: "Enter a valid email address",
        INVALID_FORMAT: "Email contains invalid characters",
    },
    username: {
        REQUIRED: "Username is required",
        TOO_SHORT: "Username should be at least 3 characters long",
        TOO_LONG: "Username should be at most 32 characters long",
        INVALID_USERNAME: "Username can contain only letters, numbers and underscores",
        INVALID_FORMAT: "Username contains invalid characters",
    },
    password: {
        REQUIRED: "Password is required",
        INVALID_PASSWORD: "Password is too weak Follow the instructions",
        INVALID_FORMAT: "Password contains invalid characters",
    },
    birthdate: {
        REQUIRED: "Birthdate is required",
        DATE_TOO_YOUNG: "Must be at least 18 years old",
        INVALID_FORMAT: "Date format is invalid",
    },
    gender: {
        REQUIRED: "Select a gender",
    },
    country_id: {
        REQUIRED: "Select a country",
    },
    italian_municipality_id: {
        MUNICIPALITY_REQUIRED: "Select a municipality",
    },
    street_address: {
        REQUIRED: "Street address is required",
    },
    house_number: {
        REQUIRED: "House number is required",
    },
    cap: {
        REQUIRED: "CAP is required",
        INVALID_CAP: "CAP must be 5 digits",
    },
    locality: {}, //optional
    additional_info: {}, //optional
    credit: {
        REQUIRED: "Credit is required",
        INVALID_CREDIT: "Credit must be a positive amount",
    },
    currency: {
        REQUIRED: "Currency is required",
    }
};
export function getFieldErrorMessage(field, errorCode) {
    return errorCode ? FieldErrorMessagesMap[field]?.[errorCode] ?? DEFAULT_ERROR_MESSAGE : DEFAULT_ERROR_MESSAGE;
}
