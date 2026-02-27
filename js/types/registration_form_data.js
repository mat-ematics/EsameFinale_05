/* --- CONSTANTS --- */
export const COUNTRY_ITALY_ID = '1';
export function extractRegistrationFormData(form) {
    const data = new FormData(form);
    return {
        name: data.get("name"),
        surname: data.get("surname"),
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"),
        birthdate: data.get("birthdate"),
        gender: data.get("gender"),
        country_id: data.get("country_id"),
        italian_municipality_id: data.get("italian_municipality_id"),
        street_address: data.get("street_address"),
        house_number: data.get("house_number"),
        cap: data.get("cap"),
        locality: data.get("locality"),
        additional_info: data.get("additional_info"),
        credit: data.get("credit"),
        currency: data.get("currency"),
    };
}
