import { getFieldErrorMessage } from "./form_errors.js";
export function toggleValidityClasses(element, isValid) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}
export function renderField(fieldController, isValid, error) {
    const feedback = fieldController.feedback;
    const message = isValid ? "" : error ?? "";
    toggleValidityClasses(fieldController.element, isValid);
    if (feedback) {
        feedback.textContent = message ?? '';
        feedback.style.display = isValid ? "none" : "initial";
    }
}
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
export function renderForm(formMap, result) {
    Object.entries(result.fields).forEach(([field, fieldResult]) => {
        const controller = formMap[field];
        if (!controller)
            return;
        const errorMessage = !fieldResult.isValid && fieldResult?.errorCode ?
            getFieldErrorMessage(field, fieldResult.errorCode) :
            undefined;
        if (field === 'credit') {
            console.log(controller);
            console.log(errorMessage);
        }
        renderField(controller, fieldResult.isValid, errorMessage);
    });
    return result.isValid;
}
