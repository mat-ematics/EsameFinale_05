import { ValidationErrorCode } from "./error_codes";

export interface FieldValidationResult {
    isValid: boolean,
    errorCode: ValidationErrorCode | null,
}

export const validFieldResult: FieldValidationResult = {
    isValid: true,
    errorCode: null,
} as const;
