import { ErrorCodes } from "./error_codes.js";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validateName, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators.js";
import { createValidFieldResult } from "./validation_types.js";
export function validateRegistrationForm(data) {
    const fields = {
        name: validateName(data.name),
        surname: validateName(data.surname),
        email: validateEmail(data.email),
        username: validateUsername(data.username),
        password: validatePassword(data.password),
        birthdate: validateBirthDate(data.birthdate),
        gender: validateSelect(data.gender),
        country_id: validateSelect(data.country_id),
        italian_municipality_id: createValidFieldResult(),
        street_address: validateText(data.street_address),
        house_number: validateText(data.house_number),
        cap: validateCAP(data.cap),
        locality: validateText(data.locality ?? '', { required: false }),
        additional_info: validateText(data.additional_info ?? '', { required: false }),
        credit: validateCredit(data.credit),
        currency: validateSelect(data.currency),
    };
    if (data.country_id === '1' && !validateRequired(data.italian_municipality_id).isValid) {
        fields.italian_municipality_id = { isValid: false, errorCode: ErrorCodes.MUNICIPALITY_REQUIRED };
    }
    ;
    const isValid = Object.values(fields).every(({ isValid, errorCode }) => isValid);
    return {
        isValid: isValid,
        fields: fields,
    };
}
