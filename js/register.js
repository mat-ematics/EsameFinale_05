import { validateRegistrationForm } from "./validation/form_validator.js";
import { COUNTRY_ITALY_ID, extractRegistrationFormData } from "./types/registration_form_data.js";
import { bindForm, renderForm } from "./ui/form_rendering.js";
const registrationForm = document.getElementById('formRegister');
const registrationFormMap = bindForm(registrationForm);
const selectCountry = document.getElementById('selectCountry');
const selectItalianMunicipality = document.getElementById('selectItalianMunicipality');
selectCountry.addEventListener('input', () => {
    const value = selectCountry.value;
    selectItalianMunicipality.disabled = value !== COUNTRY_ITALY_ID;
});
registrationForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = extractRegistrationFormData(registrationForm);
    const result = validateRegistrationForm(data);
    renderForm(registrationFormMap, result);
    if (result.isValid) {
        /* Send Form */
    }
});
