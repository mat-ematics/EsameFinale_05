import { FieldValidationResult, validFieldResult } from "./validation_types";
import { emailPattern, getAge, isEmpty, passwordPattern } from "../utils/helpers";
import { ErrorCodes } from "./error_codes";


/* ALWAYS RETURN FieldValidationReturn */

export function validateRequired(value: unknown) : FieldValidationResult {
    return isEmpty(String(value)) ? {isValid: false, errorCode: ErrorCodes.REQUIRED} : validFieldResult
}

export function validateText(
        text: string, 
        options: Partial<{
            minlength: number,
            maxlength: number,
            pattern: RegExp,
            required: boolean,
        }>
    ) : FieldValidationResult {

        if (options?.required && !validateRequired(text).isValid) {
            return {isValid: false, errorCode: ErrorCodes.REQUIRED}
        }

        if (options?.minlength !== undefined && text.length < options.minlength) {
            return {isValid: false, errorCode: ErrorCodes.INVALID_FORMAT}
        }

        if (options?.maxlength !== undefined && text.length > options.maxlength) {
            return {isValid: false, errorCode: ErrorCodes.INVALID_FORMAT}
        }

        if (options?.pattern !== undefined && !options.pattern.test(text)) {
            return {isValid: false, errorCode: ErrorCodes.INVALID_FORMAT}
        }

        return validFieldResult
}

export function validateEmail(email: string) : FieldValidationResult {
    if (isEmpty(email)) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    return emailPattern.test(email) ? validFieldResult : {isValid: false, errorCode: ErrorCodes.INVALID_EMAIL} 
}

export function validatePassword(password: string) : FieldValidationResult {
    if (isEmpty(password)) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    return passwordPattern.test(password) ? validFieldResult : {isValid: false, errorCode: ErrorCodes.INVALID_PASSWORD} 
}

export function validateDate(date: string | Date) : FieldValidationResult {

    if (isEmpty(String(date))) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    if (getAge(date) < 18) {
        return {isValid: false, errorCode: 'INVALID_DATE'}
    }

    return validFieldResult;
}
export function validateSelect(value: string) : FieldValidationResult {
    return isEmpty(value) ? {isValid: false, errorCode: ErrorCodes.REQUIRED} : validFieldResult
}
export function validateCAP(cap: string | number) : FieldValidationResult {
    if (isEmpty(String(cap))) {
        return {isValid: false, errorCode: ErrorCodes.REQUIRED}
    }

    cap = Number(cap);

    if (!Number.isInteger(cap)) {
        return {isValid: false, errorCode: ErrorCodes.INVALID_CAP}
    }

    return validFieldResult;
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