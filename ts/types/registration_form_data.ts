/* --- CONSTANTS --- */
export const COUNTRY_ITALY_ID = '1';

/* --- TYPES --- */

export type gender = "male" | "female" | "other";
export type currency = "EUR" | "USD";

/* --- INTERFACES --- */

export interface RegistrationFormData {
    name: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    birthdate: string,
    gender: gender,
    country_id: string,
    italian_municipality_id?: string,
    street_address: string,
    house_number: string,
    cap: string,
    locality?: string,
    additional_info?: string,
    credit: string,
    currency: currency,
}

export function extractRegistrationFormData(form: HTMLFormElement): RegistrationFormData {
    const data = new FormData(form);

    return {
        name: data.get("name") as string,
        surname: data.get("surname") as string,
        email: data.get("email") as string,
        username: data.get("username") as string,
        password: data.get("password") as string,
        birthdate: data.get("birthdate") as string,
        gender: data.get("gender") as gender,
        country_id: data.get("country_id") as string,
        italian_municipality_id: data.get("italian_municipality_id") as string,
        street_address: data.get("street_address") as string,
        house_number: data.get("house_number") as string,
        cap: data.get("cap") as string,
        locality: data.get("locality") as string,
        additional_info: data.get("additional_info") as string,
        credit: data.get("credit") as string,
        currency: data.get("currency") as currency,
    }
}