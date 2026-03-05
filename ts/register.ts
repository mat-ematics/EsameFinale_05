/**
 * Registration Page Handler
 * 
 * This module manages the registration page and form lifecycle including:
 * - Form element binding and field mapping
 * - Real-time field validation on blur events
 * - Dynamic UI updates based on validation results
 * - Form submission and final validation
 */


/* --- IMPORTS --- */

import { validateRegistrationField, validateRegistrationForm } from "./validation/form_validator.js";
import { COUNTRY_ITALY_ID, extractRegistrationFormData, FieldName } from "./types/registration_form_data.js";
import { bindForm, renderMultipleRegistrationFields, renderRegistrationField, renderRegistrationForm } from "./ui/form_rendering.js";


/* --- ELEMENTS --- */

// Retrieve the main registration form element and bind all form fields
const registrationForm = document.getElementById('formRegister') as HTMLFormElement;
const registrationFormMap = bindForm(registrationForm);

// Retrieve country and municipality select elements
const selectCountry = document.getElementById('selectCountry') as HTMLSelectElement;
const selectItalianMunicipality = document.getElementById('selectItalianMunicipality') as HTMLSelectElement;


/* --- FORM VALIDATION --- */

/**
 * Country Selection Handler
 * 
 * When the user selects a country, the Italian municipality field is only enabled
 * if the selected country is Italy (COUNTRY_ITALY_ID). For other countries, the
 * municipality field is disabled since it's Italy-specific.
 */
selectCountry.addEventListener('input', () => {
    const value = selectCountry.value;
    selectItalianMunicipality.disabled = value !== COUNTRY_ITALY_ID;
});

/**
 * Real-Time Field Validation Handler
 * 
 * Attaches a blur event listener to each form field. When a user leaves a field:
 * 1. Extract current form data
 * 2. Validate the specific field
 * 3. If the field is 'country_id', also validate the dependent 'italian_municipality_id' field
 * 4. Update the UI to display any validation errors or success states
 */
Object.entries(registrationFormMap).forEach(([field, controller]) => {
    controller.element.addEventListener("blur", () => {
        const data = extractRegistrationFormData(registrationForm);

        const fieldResult = validateRegistrationField(field as FieldName, data);

        // Handle country field specially since it affects the municipality field validity
        if (field === 'country_id') {
            const municipalityResult = validateRegistrationField(
                "italian_municipality_id",
                data
            );

            console.log(municipalityResult)

            // Render multiple fields to update both country and municipality validation states
            renderMultipleRegistrationFields(registrationFormMap, {
                [field]: validateRegistrationField(field, data),
                italian_municipality_id: municipalityResult,
            })
        } else {
            // For other fields, render only the current field
            renderRegistrationField(registrationFormMap, field as FieldName, fieldResult);
        }
    })
})

/**
 * Form Submission Handler
 * 
 * When the user attempts to submit the form:
 * 1. Prevent default form submission behavior
 * 2. Extract all form data
 * 3. Validate the entire form (all fields at once)
 * 4. Render validation errors or success messages for all fields
 * 5. If validation passes, prepare to send the form data (implementation needed)
 */
registrationForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = extractRegistrationFormData(registrationForm);
    const result = validateRegistrationForm(data);
    renderRegistrationForm(registrationFormMap, result);

    if (result.isValid) {
        /* Send Form - TODO: Implement form submission logic (e.g., API call) */
    }
});


/* --- DYNAMIC PAGE UPDATE --- */

/**
 * Date Input Handler
 * 
 * Updates the 'value' attribute of all date inputs whenever they change.
 * This ensures the form reflects the current selected date value for data extraction.
 */
document.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach(input => {
    input.addEventListener('change', () => {
        input.setAttribute('value', input.value);
    });
});
