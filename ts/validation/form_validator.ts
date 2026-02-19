import { RegistrationFormData } from "../types/registration_form_data";
import { ErrorCodes } from "./error_codes";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators";
import { cerateValidFieldResult, FieldValidationResult, FormFieldsValidationResult, FormValidationResult } from "./validation_types";


export function validateRegistrationForm(data: RegistrationFormData) : FormValidationResult {

    const fields: FormFieldsValidationResult = {
        name: validateText(data.name, {minlength: 3}),
        surname: validateText(data.surname, {minlength: 3}),
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
        credit: validateCredit(data.credit),
        currency: validateSelect(data.currency),
    }

    if (data.countryId === '1' && !validateRequired(data.italianMunicipalityId).isValid) {
        fields.italianMunicipalityId = {isValid: false, errorCode: ErrorCodes.MUNICIPALITY_REQUIRED}
    };

    const isValid =  Object.values(fields).every(({isValid, errorCode}) => isValid);

    return {
        isValid: isValid,
        fields: fields,
    }
}