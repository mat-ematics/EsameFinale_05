/* --- TYPES --- */

export type ValidationErrorCode = 
    | "REQUIRED"
    | "INVALID_EMAIL"
    | "INVALID_PASSWORD"
    | "INVALID_DATE"
    | "MUNICIPALITY_REQUIRED"
    | "INVALID_CAP"
    | "INVALID_CREDIT"


/* --- INTERFACES --- */

export interface RegistrationFormData {
    name: string
    surname: string
    email: string
    username: string
    password: string
    birthdate: string
    gender: string
    countryId: string
    italianMunicipalityId?: number
    streetAddress: string
    houseNumber: string
    cap: string
    locality?: string
    additionalInfo?: string
    credit: string
    currency: "EUR" | "USD"
}

export interface FieldValidationResult {
    isValid: boolean,
    errorCode?: ValidationErrorCode,
}

export interface FormValidationResult {
    isValid: boolean,
    fields: {
        [K in keyof RegistrationFormData]?: FieldValidationResult
    }
}