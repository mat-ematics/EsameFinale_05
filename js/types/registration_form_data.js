/* --- TYPES --- */
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
        countryId: data.get("country_id"),
        italianMunicipalityId: data.get("italian_municipality_id") ?? undefined,
        streetAddress: data.get("street_address"),
        houseNumber: data.get("houseNumber"),
        cap: data.get("cap"),
        locality: data.get("locality") ?? undefined,
        additionalInfo: data.get("additional_info") ?? undefined,
        credit: data.get("credit"),
        currency: data.get("currency"),
    };
}
