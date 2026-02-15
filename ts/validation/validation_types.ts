import { RegistrationFormData } from "../types/signup_form_data";
import { ValidationErrorCode } from "./error_codes";

export interface FieldValidationResult {
    isValid: boolean,
    errorCode: ValidationErrorCode | null,
}

export const validFieldResult: FieldValidationResult = {
    isValid: true,
    errorCode: null,
} as const;

export interface FormValidationResult {
    isValid: boolean,
    fields: {
        [K in keyof RegistrationFormData]?: FieldValidationResult;
    }
}