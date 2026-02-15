import { RegistrationFormData } from "../types/signup_form_data";
import { ValidationErrorCode } from "../validation/error_codes";

//ADD DEFUALT ERROR MESSAGE FALLBACK?


type FieldName = keyof RegistrationFormData;

type FieldErrorMessages = {
    [K in FieldName]?: Partial<Record<ValidationErrorCode, string>>
}

export const FieldErrorMessages: FieldErrorMessages = {
    name: {
        REQUIRED: "Name is required",
        INVALID_FORMAT: "Name contains invalid characters.",
    },
    email: {
        REQUIRED: "E-mail is required.",
        INVALID_EMAIL: "Enter a valid email address.",
    }
}

