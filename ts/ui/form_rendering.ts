import { FormValidationResult } from "../validation/validation_types";
import { getFieldErrorMessage } from "./form_errors";

export function toggleValidityClasses(element: HTMLElement, isValid: boolean) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}

export function setFeedbackMessage(container: HTMLElement, message?: string) {
    container.textContent = message ?? "";
}

export function renderField (
    input: HTMLElement,
    isValid: boolean,
    error?: string,
) {
    const feedback = input.parentElement?.querySelector('.invalid-feedback');
    const message = isValid ? "" : error; 

    toggleValidityClasses(input, isValid);
    
    if (feedback) {
        setFeedbackMessage(feedback as HTMLElement, message);
    }
}

export function renderForm(form: HTMLFormElement, result: FormValidationResult) {

    if (result.isValid) {
        return true;
    }

    Object.entries(result.fields).forEach(([field, fieldResult]) => {
        const element = form.elements.namedItem(field);
        const errorMessage = getFieldErrorMessage(field, fieldResult.errorCode);
        
        if (!element) return;
        
        if (element instanceof RadioNodeList) {
            element.forEach(radio => renderField(radio, fieldResult.isValid, errorMessage));
        } else {
            renderField(element as HTMLElement, fieldResult.isValid, errorMessage);
        }
    });

    return false;
}