/**
 * Registration Form Data Module
 *
 * Defines the data structure for the registration form, including:
 * - Form field types and unions
 * - The complete RegistrationFormData interface
 * - Utility function to extract form data from DOM
 * - Country and currency constants
 */
/* --- CONSTANTS --- */
/**
 * Country Italy ID Constant
 *
 * The identifier used to represent Italy in the country select field.
 * Used to determine when the Italian municipality field should be required.
 */
export const COUNTRY_ITALY_ID = '1';
/* --- FUNCTIONS --- */
/**
 * Extract Registration Form Data
 *
 * Extracts all form field values from an HTML form element and converts them
 * into a RegistrationFormData object.
 *
 * Process:
 * 1. Create a FormData object from the form
 * 2. Extract each field value using the field name
 * 3. Cast values to appropriate types
 * 4. Handle optional fields with fallback to empty strings
 * 5. Return the typed RegistrationFormData object
 *
 * @param form - The HTML form element to extract data from
 * @returns A RegistrationFormData object with all form values
 */
export function extractRegistrationFormData(form) {
    const data = new FormData(form);
    return {
        name: data.get("name"),
        surname: data.get("surname"),
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"),
        birthdate: data.get("birthdate"),
        gender: data.get("gender"),
        country_id: data.get("country_id"),
        // Optional field with fallback to empty string
        italian_municipality_id: data.get("italian_municipality_id") ?? '',
        street_address: data.get("street_address"),
        house_number: data.get("house_number"),
        cap: data.get("cap"),
        // Optional fields
        locality: data.get("locality"),
        additional_info: data.get("additional_info"),
        credit: data.get("credit"),
        currency: data.get("currency"),
    };
}
