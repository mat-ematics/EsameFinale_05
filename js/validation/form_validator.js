import { ErrorCodes } from "./error_codes.js";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validateName, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators.js";
import { cerateValidFieldResult } from "./validation_types.js";
export function validateRegistrationForm(data) {
    const fields = {
        name: validateName(data.name),
        surname: validateName(data.surname),
        email: validateEmail(data.email),
        username: validateUsername(data.username),
        password: validatePassword(data.password),
        birthdate: validateBirthDate(data.birthdate),
        gender: validateSelect(data.gender),
        countryId: validateSelect(data.countryId),
        italianMunicipalityId: cerateValidFieldResult(),
        streetAddress: validateText(data.streetAddress),
        houseNumber: validateText(data.houseNumber),
        cap: validateCAP(data.cap),
        locality: validateText(data.locality ?? '', { required: false }),
        additionalInfo: validateText(data.additionalInfo ?? '', { required: false }),
        credit: validateCredit(data.credit),
        currency: validateSelect(data.currency),
    };
    if (data.countryId === '1' && !validateRequired(data.italianMunicipalityId).isValid) {
        fields.italianMunicipalityId = { isValid: false, errorCode: ErrorCodes.MUNICIPALITY_REQUIRED };
    }
    ;
    const isValid = Object.values(fields).every(({ isValid, errorCode }) => isValid);
    return {
        isValid: isValid,
        fields: fields,
    };
}
