import { FormValidationResult } from "../validation/validation_types.js";
import { FieldName, getFieldErrorMessage } from "./form_errors.js";

export type FieldController = {
    element: HTMLElement,
    feedback: HTMLElement | null,
}

export type FormFieldsControllers = Record<string, FieldController>;

export function toggleValidityClasses(element: HTMLElement, isValid: boolean) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}


export function renderField (
    fieldController: FieldController,
    isValid: boolean,
    error?: string,
) {
    const feedback = fieldController.feedback;
    const message = isValid ? "" : error ?? ""; 

    toggleValidityClasses(fieldController.element, isValid);
    
    if (feedback) {
        feedback.textContent = message ?? '';
        feedback.style.display = isValid ? "none" : "initial"; 
    }
}

export function bindForm(form: HTMLFormElement) : FormFieldsControllers {
    const map: FormFieldsControllers = {}

    form.querySelectorAll<HTMLElement>("[name]").forEach(input => {
        const inputName = input.getAttribute("name");
        const feedback = form.querySelector(`[data-error-for="${inputName}"]`) as HTMLElement | null;

        map[inputName!] = {
            element: input,
            feedback: feedback,
        }
    });

    return map;
}

export function renderForm(formMap: FormFieldsControllers, result: FormValidationResult) {

    Object.entries(result.fields).forEach(([field, fieldResult]) => {
        const controller = formMap[field];
        if (!controller) return;

        const errorMessage = !fieldResult.isValid && fieldResult?.errorCode ?
            getFieldErrorMessage(field as FieldName, fieldResult.errorCode) :
            undefined;

        if (field === 'credit') {
            console.log(controller);
            console.log(errorMessage);
        }
        
        renderField(controller, fieldResult.isValid, errorMessage);
    });

    return result.isValid;
}