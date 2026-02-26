//Immutable One-off Object
export const validFieldResult = {
    isValid: true,
    errorCode: null,
};
//Mutable ValidFieldResult Object Factory
export const cerateValidFieldResult = (overrides) => ({
    ...validFieldResult,
    ...overrides,
});
