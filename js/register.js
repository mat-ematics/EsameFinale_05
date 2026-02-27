import { validateRegistrationForm } from "./validation/form_validator.js";
import { extractRegistrationFormData } from "./types/registration_form_data.js";
import { bindForm, renderForm } from "./ui/form_rendering.js";
const registrationForm = document.getElementById('formRegister');
const registrationFormMap = bindForm(registrationForm);
registrationForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = extractRegistrationFormData(registrationForm);
    const result = validateRegistrationForm(data);
    renderForm(registrationFormMap, result);
    if (result.isValid) {
        /* Invio Form */
    }
});
