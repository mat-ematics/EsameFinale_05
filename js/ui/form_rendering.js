import { getFieldErrorMessage } from "./form_errors.js";
export function toggleValidityClasses(element, isValid) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}
export function setFeedbackMessage(container, message) {
    container.textContent = message ?? "";
}
export function renderField(input, isValid, error) {
    const feedback = input.parentElement?.querySelector('.invalid-feedback');
    const message = isValid ? "" : error;
    toggleValidityClasses(input, isValid);
    if (feedback) {
        setFeedbackMessage(feedback, message);
    }
}
export function renderForm(form, result) {
    if (result.isValid) {
        return true;
    }
    Object.entries(result.fields).forEach(([field, fieldResult]) => {
        const element = form.elements.namedItem(field);
        const errorMessage = getFieldErrorMessage(field, fieldResult.errorCode);
        if (!element)
            return;
        if (element instanceof RadioNodeList) {
            element.forEach(radio => renderField(radio, fieldResult.isValid, errorMessage));
        }
        else {
            renderField(element, fieldResult.isValid, errorMessage);
        }
    });
    return false;
}
