import { validateRegistrationField, validateRegistrationForm } from "./validation/form_validator.js";
import { COUNTRY_ITALY_ID, extractRegistrationFormData, FieldName } from "./types/registration_form_data.js";
import { bindForm, renderMultipleRegistrationFields, renderRegistrationField, renderRegistrationForm } from "./ui/form_rendering.js";

const registrationForm = document.getElementById('formRegister') as HTMLFormElement;
const registrationFormMap = bindForm(registrationForm);

const selectCountry = document.getElementById('selectCountry') as HTMLSelectElement;
const selectItalianMunicipality = document.getElementById('selectItalianMunicipality') as HTMLSelectElement;

/* Input Date Value Updater */
document.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach(input => {
    input.addEventListener('change', () => {
        input.setAttribute('value', input.value);
    });
});

selectCountry.addEventListener('input', () => {
    const value = selectCountry.value;
    selectItalianMunicipality.disabled = value !== COUNTRY_ITALY_ID;
});

Object.entries(registrationFormMap).forEach(([field, controller]) => {
    controller.element.addEventListener("blur", () => {
        const data = extractRegistrationFormData(registrationForm);

        const fieldResult = validateRegistrationField(field as FieldName, data);

        if (field === 'country_id') {
            const municipalityResult = validateRegistrationField(
                "italian_municipality_id",
                data
            );

            console.log(municipalityResult)

            renderMultipleRegistrationFields(registrationFormMap, {
                [field]: validateRegistrationField(field, data),
                italian_municipality_id: municipalityResult,
            })
        } else {
            renderRegistrationField(registrationFormMap, field as FieldName, fieldResult);
        }
    })
})

registrationForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = extractRegistrationFormData(registrationForm);
    const result = validateRegistrationForm(data);
    renderRegistrationForm(registrationFormMap, result);

    if (result.isValid) {
        /* Send Form */
    }
});