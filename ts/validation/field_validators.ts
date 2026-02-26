import { FieldValidationResult, validFieldResult } from "./validation_types.js";
import { CAPPattern, emailPattern, getAge, isEmpty, namePattern, passwordPattern, safeTrim, usernamePattern } from "../utils/helpers.js";
import { ErrorCodes, ValidationErrorCode } from "./error_codes.js";

export const VALIDATION_RULES = {
    name: {
        minLength: 3,
    },
    username: {
        minLength: 3,
        maxLength: 32,
    },
} as const;

export function validateRequired(value: unknown) : FieldValidationResult {
    return isEmpty(String(value)) ? {isValid: false, errorCode: ErrorCodes.REQUIRED} : validFieldResult
}

export function validateText(
        text: string, 
        options?: Partial<{
            required: boolean,
            minlength: number,
            maxlength: number,
            pattern: RegExp,
            formatErrorCode: ValidationErrorCode,
        }>
    ) : FieldValidationResult {

        const value = safeTrim(text);
        const required = options?.required ?? true;
        const formatErrorCode = options?.formatErrorCode ?? ErrorCodes.INVALID_FORMAT;

        if (required && isEmpty(value)) {
            return {isValid: false, errorCode: ErrorCodes.REQUIRED}
        }

        if (options?.minlength !== undefined && value.length < options.minlength) {
            return {isValid: false, errorCode: ErrorCodes.TOO_SHORT}
        }

        if (options?.maxlength !== undefined && value.length > options.maxlength) {
            return {isValid: false, errorCode: ErrorCodes.TOO_LONG}
        }

        if (options?.pattern !== undefined && !options.pattern.test(value)) {
            return {isValid: false, errorCode: formatErrorCode}
        }

        return validFieldResult
}

export const validateName = (name: string) : FieldValidationResult => {
    return validateText(name, {minlength: VALIDATION_RULES.name.minLength, pattern: namePattern})
}

export const validateEmail = (email: string) : FieldValidationResult => {
    return validateText(email, {pattern: emailPattern, formatErrorCode: ErrorCodes.INVALID_EMAIL});
}

export const validateUsername = (username: string) : FieldValidationResult => {
    return validateText(username, {
        minlength: VALIDATION_RULES.username.minLength,
        maxlength: VALIDATION_RULES.username.maxLength,
        pattern: usernamePattern,
        formatErrorCode: ErrorCodes.INVALID_USERNAME
    });
}

export const validatePassword = (password: string) : FieldValidationResult => {
    return validateText(password, {pattern: passwordPattern, formatErrorCode: ErrorCodes.INVALID_PASSWORD});
}

export function validateBirthDate(date: string | Date) : FieldValidationResult {

    if (isEmpty(String(date))) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    if (getAge(date) < 18) {
        return {isValid: false, errorCode: ErrorCodes.DATE_TOO_YOUNG}
    }

    return validFieldResult;
}
export function validateSelect(value: string) : FieldValidationResult {
    return isEmpty(value) ? {isValid: false, errorCode: ErrorCodes.REQUIRED} : validFieldResult
}

export const validateCAP = (cap: string | number) : FieldValidationResult => {
    return validateText(String(cap), {pattern: CAPPattern, formatErrorCode: ErrorCodes.INVALID_CAP});
}

export function validateCredit(credit: string | number) : FieldValidationResult {
    if (isEmpty(String(credit))) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    credit = Number(credit);

    if (Number.isNaN(credit) || credit <= 0) {
        return {isValid: false, errorCode: ErrorCodes.INVALID_CREDIT}
    }
    
    return validFieldResult;
}