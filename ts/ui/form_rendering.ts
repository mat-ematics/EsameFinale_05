import { FieldValidationResult, FormFieldsValidationResult, FormValidationResult } from "../validation/validation_types.js";
import { FieldName } from "../types/registration_form_data.js";
import { getFieldErrorMessage } from "./form_errors.js";

export type FieldController = {
    element: HTMLElement,
    feedback: HTMLElement | null,
}

export type FormFieldsControllers = Record<FieldName, FieldController>;


export function bindForm(form: HTMLFormElement) : FormFieldsControllers {
    const map: FormFieldsControllers = {} as any;

    form.querySelectorAll<HTMLElement>("[name]").forEach(input => {
        const inputName = input.getAttribute("name") as FieldName;
        const feedback = form.querySelector(`[data-error-for="${inputName}"]`) as HTMLElement | null;

        map[inputName!] = {
            element: input,
            feedback: feedback,
        }
    });

    return map;
}

export function toggleValidityClasses(element: HTMLElement, isValid: boolean) {
    element.classList.toggle('is-valid', isValid);
    element.classList.toggle('is-invalid', !isValid);
}

export function retrieveErrorMessage(field: FieldName, fieldResult: FieldValidationResult) : string | undefined {
    return !fieldResult.isValid && fieldResult?.errorCode ?
            getFieldErrorMessage(field, fieldResult.errorCode) :
            undefined;
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
        feedback.style.visibility = isValid ? "hidden" : "visible"; 
    }
}

export function renderRegistrationField (
    formMap: FormFieldsControllers,
    field: FieldName,
    fieldResult: FieldValidationResult
) {
    const controller = formMap[field];
    if (!controller) return;

    const errorMessage = retrieveErrorMessage(field, fieldResult);

    renderField(controller, fieldResult.isValid, errorMessage);
}

export function renderMultipleRegistrationFields (
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

export function renderRegistrationForm(formMap: FormFieldsControllers, result: FormValidationResult) : boolean {
    renderMultipleRegistrationFields(formMap, result.fields);
    return result.isValid;
}