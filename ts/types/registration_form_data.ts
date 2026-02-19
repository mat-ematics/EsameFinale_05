/* --- INTERFACES --- */

export interface RegistrationFormData {
    name: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    birthdate: string,
    gender: string,
    countryId: string,
    italianMunicipalityId?: number,
    streetAddress: string,
    houseNumber: string,
    cap: string,
    locality?: string,
    additionalInfo?: string,
    credit: string,
    currency: "EUR" | "USD",
}