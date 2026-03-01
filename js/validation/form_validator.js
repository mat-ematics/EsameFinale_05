import { COUNTRY_ITALY_ID } from "../types/registration_form_data.js";
import { ErrorCodes } from "./error_codes.js";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validateName, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators.js";
import { createValidFieldResult } from "./validation_types.js";
const fieldValidatorsMap = {
    name: (data) => validateName(data.name),
    surname: (data) => validateName(data.surname),
    email: (data) => validateEmail(data.email),
    username: (data) => validateUsername(data.username),
    password: (data) => validatePassword(data.password),
    birthdate: (data) => validateBirthDate(data.birthdate),
    gender: (data) => validateSelect(data.gender),
    country_id: (data) => validateSelect(data.country_id),
    italian_municipality_id: () => createValidFieldResult(),
    street_address: (data) => validateText(data.street_address),
    house_number: (data) => validateText(data.house_number),
    cap: (data) => validateCAP(data.cap),
    locality: (data) => validateText(data.locality ?? '', { required: false }),
    additional_info: (data) => validateText(data.additional_info ?? '', { required: false }),
    credit: (data) => validateCredit(data.credit),
    currency: (data) => validateSelect(data.currency),
};
export function validateRegistrationField(field, data) {
    const baseResult = fieldValidatorsMap[field](data);
    if (field === 'italian_municipality_id' &&
        data.country_id === COUNTRY_ITALY_ID &&
        !validateRequired(data.italian_municipality_id).isValid) {
        return {
            isValid: false,
            errorCode: ErrorCodes.MUNICIPALITY_REQUIRED
        };
    }
    return baseResult;
}
export function validateRegistrationForm(data) {
    const fields = {};
    Object.keys(fieldValidatorsMap).forEach(field => {
        fields[field] = validateRegistrationField(field, data);
    });
    const isValid = Object.values(fields).every(({ isValid, errorCode }) => isValid);
    return {
        isValid: isValid,
        fields: fields,
    };
}
