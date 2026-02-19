import { RegistrationFormData } from "../types/registration_form_data";
import { ValidationErrorCode } from "./error_codes";

//Immutable One-off Object
export const validFieldResult: FieldValidationResult = {
    isValid: true,
    errorCode: null,
} as const satisfies FieldValidationResult;

//Mutable ValidFieldResult Object Factory
export const cerateValidFieldResult = (
    overrides?: Partial<FieldValidationResult>
): FieldValidationResult => ({ //() for object instead of function body
    ...validFieldResult,
    ...overrides,
})

export interface FieldValidationResult {
    isValid: boolean,
    errorCode: ValidationErrorCode | null,
}

export type FormFieldsValidationResult = {
    [K in keyof RegistrationFormData]: FieldValidationResult;
}

export interface FormValidationResult {
    isValid: boolean,
    fields: FormFieldsValidationResult,
}