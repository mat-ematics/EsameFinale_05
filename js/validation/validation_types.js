//Immutable One-off Object
export const validFieldResult = {
    isValid: true,
    errorCode: null,
};
//Mutable ValidFieldResult Object Factory
export const createValidFieldResult = (overrides) => ({
    ...validFieldResult,
    ...overrides,
});
