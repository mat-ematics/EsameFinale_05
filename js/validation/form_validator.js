/**
 * Form Validator Module
 *
 * This module handles all validation logic for the registration form, including:
 * - Individual field validation using specialized validators
 * - Conditional validation rules (e.g., municipality required only for Italy)
 * - Complete form validation across all fields
 * - Mapping fields to their corresponding validator functions
 */
/* --- IMPORTS --- */
import { COUNTRY_ITALY_ID } from "../types/registration_form_data.js";
import { ErrorCodes } from "./error_codes.js";
import { validateBirthDate, validateCAP, validateCredit, validateEmail, validateName, validatePassword, validateRequired, validateSelect, validateText, validateUsername } from "./field_validators.js";
import { createValidFieldResult } from "./validation_types.js";
/* --- CONSTANTS --- */
/**
 * Field Validators Map
 *
 * Maps each form field name to its corresponding validation function.
 * This creates a clear, centralized definition of how each field should be validated.
 * Italian_municipality_id is handled specially in validateRegistrationField() due to
 * its conditional requirement (only required when country is Italy).
 */
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
/* --- FUNCTIONS --- */
/**
 * Validate Registration Field
 *
 * Validates a single form field with support for conditional validation rules.
 *
 * Special handling:
 * - The italian_municipality_id field is only required when the selected country is Italy.
 *   This function checks both the country_id and applies the appropriate validation rule.
 *
 * @param field - The name of the field to validate
 * @param data - The complete registration form data (needed for cross-field validation)
 * @returns A FieldValidationResult containing the validation status and error code (if any)
 */
export function validateRegistrationField(field, data) {
    //Base result of the Validation of the Field based on the Validator Map
    const baseResult = fieldValidatorsMap[field](data);
    // Special case: italian_municipality_id is conditionally required
    // It's only required if the user selected Italy as their country
    if (field === 'italian_municipality_id' &&
        data.country_id === COUNTRY_ITALY_ID &&
        !validateRequired(data.italian_municipality_id).isValid) {
        //Error if not satisfied
        return {
            isValid: false,
            errorCode: ErrorCodes.MUNICIPALITY_REQUIRED
        };
    }
    //Return Field Result
    return baseResult;
}
/**
 * Validate Registration Form
 *
 * Validates all form fields and returns a complete validation result.
 *
 * Process:
 * 1. Iterate through all fields in the fieldValidatorsMap
 * 2. Call validateRegistrationField() for each field to get individual validation results
 * 3. Compile all field results into a FormFieldsValidationResult object
 * 4. Determine overall form validity by checking if all fields are valid
 * 5. Return the complete validation result
 *
 * @param data - The complete registration form data to validate
 * @returns A FormValidationResult containing overall validity and individual field results
 */
export function validateRegistrationForm(data) {
    // Create an object to hold validation results for all fields
    const fields = {};
    // Validate each field and store its result
    Object.keys(fieldValidatorsMap).forEach(field => {
        fields[field] = validateRegistrationField(field, data);
    });
    // Determine if the entire form is valid by checking that all fields passed validation
    const isValid = Object.values(fields).every(({ isValid }) => isValid);
    // Return the complete validation result
    return {
        isValid: isValid,
        fields: fields,
    };
}
