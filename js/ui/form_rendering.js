import { getFieldErrorMessage } from "./form_errors.js";
export function bindForm(form) {
    const map = {};
    form.querySelectorAll("[name]").forEach(input => {
        const inputName = input.getAttribute("name");
        const feedback = form.querySelector(`[data-error-for="${inputName}"]`);
        map[inputName] = {
            element: input,
            feedback: feedback,
        };
    });
    return map;
}
export function toggleValidityClasses(element, isValid) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}
export function retrieveErrorMessage(field, fieldResult) {
    return !fieldResult.isValid && fieldResult?.errorCode ?
        getFieldErrorMessage(field, fieldResult.errorCode) :
        undefined;
}
export function renderField(fieldController, isValid, error) {
    const feedback = fieldController.feedback;
    const message = isValid ? "" : error ?? "";
    toggleValidityClasses(fieldController.element, isValid);
    if (feedback) {
        feedback.textContent = message ?? '';
        feedback.style.visibility = isValid ? "hidden" : "visible";
    }
}
export function renderRegistrationField(formMap, field, fieldResult) {
    const controller = formMap[field];
    if (!controller)
        return;
    const errorMessage = retrieveErrorMessage(field, fieldResult);
    renderField(controller, fieldResult.isValid, errorMessage);
}
export function renderMultipleRegistrationFields(formMap, fieldsResult) {
    Object.entries(fieldsResult).forEach(([field, fieldResult]) => {
        renderRegistrationField(formMap, field, fieldResult);
    });
}
export function renderRegistrationForm(formMap, result) {
    renderMultipleRegistrationFields(formMap, result.fields);
    return result.isValid;
}
