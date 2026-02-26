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
    countryId: string,
    italianMunicipalityId?: string,
    streetAddress: string,
    houseNumber: string,
    cap: string,
    locality?: string,
    additionalInfo?: string,
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
        countryId: data.get("country_id") as string,
        italianMunicipalityId: data.get("italian_municipality_id") as string,
        streetAddress: data.get("street_address") as string,
        houseNumber: data.get("house_number") as string,
        cap: data.get("cap") as string,
        locality: data.get("locality") as string,
        additionalInfo: data.get("additional_info") as string,
        credit: data.get("credit") as string,
        currency: data.get("currency") as currency,
    }
}