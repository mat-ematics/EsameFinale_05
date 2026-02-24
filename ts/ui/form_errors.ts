import { RegistrationFormData } from "../types/registration_form_data";
import { ValidationErrorCode } from "../validation/error_codes";

//ADD DEFUALT ERROR MESSAGE FALLBACK?


type FieldName = keyof RegistrationFormData;

type FieldErrorMessages = {
    [K in FieldName]?: Partial<Record<ValidationErrorCode, string>>
}

export const FieldErrorMessages: FieldErrorMessages = {
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
    countryId: {
        REQUIRED: "Select a country",
    },
    italianMunicipalityId: {
        MUNICIPALITY_REQUIRED: "Select a municipality",
    },
    streetAddress: {
        REQUIRED: "Street address is required",
    },
    houseNumber: {
        REQUIRED: "House number is required",
    },
    cap: {
        REQUIRED: "CAP is required",
        INVALID_CAP: "CAP must be 5 digits",
    },
    locality: {}, //optional
    additionalInfo: {}, //optional
    credit: {
        REQUIRED: "Credit is required",
        INVALID_CREDIT: "Credit must be a positive amount",
    },
    currency: {
        REQUIRED: "Currency is required",
    }
} as const;

