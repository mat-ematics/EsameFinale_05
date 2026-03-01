import { COUNTRY_ITALY_ID, RegistrationFormData } from "../types/registration_form_data.js";
import { FieldName } from "../types/registration_form_data.js";
import { ErrorCodes } from "./error_codes.js";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validateName, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators.js";
import { createValidFieldResult, FieldValidationResult, FormFieldsValidationResult, FormValidationResult } from "./validation_types.js";

const fieldValidatorsMap = {
    name: (data: RegistrationFormData) => validateName(data.name),
    surname: (data: RegistrationFormData) => validateName(data.surname),
    email: (data: RegistrationFormData) => validateEmail(data.email),
    username: (data: RegistrationFormData) => validateUsername(data.username),
    password: (data: RegistrationFormData) => validatePassword(data.password),
    birthdate: (data: RegistrationFormData) => validateBirthDate(data.birthdate),
    gender: (data: RegistrationFormData) => validateSelect(data.gender),
    country_id: (data: RegistrationFormData) => validateSelect(data.country_id),
    italian_municipality_id: () => createValidFieldResult(),
    street_address: (data: RegistrationFormData) => validateText(data.street_address),
    house_number: (data: RegistrationFormData) => validateText(data.house_number),
    cap: (data: RegistrationFormData) => validateCAP(data.cap),
    locality: (data: RegistrationFormData) =>
        validateText(data.locality ?? '', { required: false }),
    additional_info: (data: RegistrationFormData) =>
        validateText(data.additional_info ?? '', { required: false }),
    credit: (data: RegistrationFormData) => validateCredit(data.credit),
    currency: (data: RegistrationFormData) => validateSelect(data.currency),
} as const;

export function validateRegistrationField (
    field: FieldName,
    data: RegistrationFormData
) : FieldValidationResult {
    const baseResult = fieldValidatorsMap[field](data);

    if (
        field === 'italian_municipality_id' &&
        data.country_id === COUNTRY_ITALY_ID &&
        !validateRequired(data.italian_municipality_id).isValid
    ) {
        return {
            isValid: false,
            errorCode: ErrorCodes.MUNICIPALITY_REQUIRED
        }
    }

    return baseResult;
}

export function validateRegistrationForm(data: RegistrationFormData) : FormValidationResult {

    const fields: FormFieldsValidationResult = {} as any;

    (Object.keys(fieldValidatorsMap) as Array<FieldName>).forEach(field => {
        fields[field] = validateRegistrationField(field, data);
    })

    const isValid =  Object.values(fields).every(({isValid, errorCode}) => isValid);

    return {
        isValid: isValid,
        fields: fields,
    }
}