/**
 * Validation Types Module
 *
 * This module defines TypeScript types and interfaces for form validation results,
 * including:
 * - Individual field validation results with error codes
 * - Complete form validation results for all fields
 * - Factory functions for creating validation result objects
 */
/* --- CONSTANTS --- */
/**
 * Immutable Valid Field Result
 *
 * A constant that represents a successful field validation (no errors).
 * Used as the base template for creating valid field results.
 * Marked as `const` to prevent accidental modifications.
 */
export const validFieldResult = {
    isValid: true,
    errorCode: null,
};
/* --- FUNCTIONS --- */
/**
 * Create Valid Field Result Factory Function
 *
 * Creates a new valid field validation result with optional property overrides.
 * Useful for creating variations of the base valid result without modifying the
 * immutable `validFieldResult` constant.
 *
 * @param overrides - Partial object to override default properties
 * @returns A new FieldValidationResult object with applied overrides
 */
export const createValidFieldResult = (overrides) => ({
    ...validFieldResult,
    ...overrides,
});
