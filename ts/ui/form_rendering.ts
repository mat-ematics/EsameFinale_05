/**
 * Form Rendering Module
 * 
 * Handles DOM manipulation and UI updates for the registration form.
 * Manages field validation states, error messages, and visual feedback.
 */


/* --- IMPORTS --- */

import { FieldValidationResult, FormFieldsValidationResult, FormValidationResult } from "../validation/validation_types.js";
import { FieldName } from "../types/registration_form_data.js";
import { getFieldErrorMessage } from "./form_errors.js";


/* --- TYPES & INTERFACES --- */

/**
 * Field Controller
 * 
 * Represents the DOM elements associated with a single form field.
 * 
 * @property element - The input element (HTMLInputElement, HTMLSelectElement, etc.)
 * @property feedback - The error message display element (null if not present)
 */
export type FieldController = {
    element: HTMLElement,
    feedback: HTMLElement | null,
}

/**
 * Form Fields Controllers
 * 
 * A map of all form fields to their corresponding FieldController objects.
 * Allows quick access to field elements and error feedback elements by field name.
 */
export type FormFieldsControllers = Record<FieldName, FieldController>;


/* --- FUNCTIONS --- */

/**
 * Bind Form
 * 
 * Scans the form for all input elements and creates a FieldController for each.
 * Locates corresponding error feedback elements using the data-error-for attribute.
 * 
 * @param form - The HTML form element to bind
 * @returns A FormFieldsControllers map of all field controllers
 */
export function bindForm(form: HTMLFormElement): FormFieldsControllers {
    const map: FormFieldsControllers = {} as any;

    // Iterate through all form elements with a name attribute
    form.querySelectorAll<HTMLElement>("[name]").forEach(input => {
        const inputName = input.getAttribute("name") as FieldName;
        // Find the corresponding error feedback element
        const feedback = form.querySelector(`[data-error-for="${inputName}"]`) as HTMLElement | null;

        map[inputName!] = {
            element: input,
            feedback: feedback,
        }
    });

    return map;
}

/**
 * Toggle Validity Classes
 * 
 * Toggles CSS classes on a form element to visually indicate validation state.
 * Applies 'is-valid' class for valid state and 'is-invalid' for invalid state.
 * 
 * @param element - The element to update
 * @param isValid - The validation state (true = valid, false = invalid)
 */
export function toggleValidityClasses(element: HTMLElement, isValid: boolean) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}

/**
 * Retrieve Error Message
 * 
 * Gets the user-friendly error message for a validation failure.
 * Returns undefined if the field is valid.
 * 
 * @param field - The field name
 * @param fieldResult - The validation result containing the error code
 * @returns The error message string, or undefined if field is valid
 */
export function retrieveErrorMessage(field: FieldName, fieldResult: FieldValidationResult): string | undefined {
    return !fieldResult.isValid && fieldResult?.errorCode ?
            getFieldErrorMessage(field, fieldResult.errorCode) :
            undefined;
}

/**
 * Render Field
 * 
 * Updates a field's visual state based on validation result.
 * Applies validity classes and displays/hides error messages.
 * 
 * @param fieldController - The field and feedback elements to update
 * @param isValid - Whether the field passed validation
 * @param error - Optional error message to display
 */
export function renderField(
    fieldController: FieldController,
    isValid: boolean,
    error?: string,
) {
    const feedback = fieldController.feedback;
    const message = isValid ? "" : error ?? "";

    toggleValidityClasses(fieldController.element, isValid);

    if (feedback) {
        feedback.textContent = message ?? '';
        // Hide feedback for valid fields, show for invalid
        feedback.style.visibility = isValid ? "hidden" : "visible";
    }
}

/**
 * Render Registration Field
 * 
 * Renders a single registration form field based on its validation result.
 * Retrieves the appropriate error message and updates the field's visual state.
 * 
 * @param formMap - The form fields controller map
 * @param field - The field name to render
 * @param fieldResult - The validation result for the field
 */
export function renderRegistrationField(
    formMap: FormFieldsControllers,
    field: FieldName,
    fieldResult: FieldValidationResult
) {
    const controller = formMap[field];
    if (!controller) return;

    const errorMessage = retrieveErrorMessage(field, fieldResult);

    renderField(controller, fieldResult.isValid, errorMessage);
}

/**
 * Render Multiple Registration Fields
 * 
 * Renders multiple form fields at once.
 * Useful for updating related fields or the entire form in a single operation.
 * 
 * @param formMap - The form fields controller map
 * @param fieldsResult - Partial validation results for multiple fields
 */
export function renderMultipleRegistrationFields(
    formMap: FormFieldsControllers,
    fieldsResult: Partial<FormFieldsValidationResult>,
) {
    Object.entries(fieldsResult).forEach(([field, fieldResult]) => {
        renderRegistrationField(
            formMap,
            field as FieldName,
            fieldResult,
        )
    });
}

/**
 * Render Registration Form
 * 
 * Renders the entire form based on complete validation results.
 * Updates all fields with their validation states and error messages.
 * 
 * @param formMap - The form fields controller map
 * @param result - The complete form validation result
 * @returns The overall form validity (true if all fields are valid)
 */
export function renderRegistrationForm(formMap: FormFieldsControllers, result: FormValidationResult): boolean {
    renderMultipleRegistrationFields(formMap, result.fields);
    return result.isValid;
}