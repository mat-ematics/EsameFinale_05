import { validateRegistrationForm } from "./validation/form_validator.js";
import { extractRegistrationFormData } from "./types/registration_form_data.js";
import { renderForm } from "./ui/form_rendering.js";
const registrationForm = document.getElementById('formRegister');
registrationForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = extractRegistrationFormData(registrationForm);
    const result = validateRegistrationForm(data);
    renderForm(registrationForm, result);
    if (result.isValid) {
        /* Invio Form */
    }
});
