/**
 * Empty module file
 * Used as a placeholder when a real implementation is not available
 * or for testing purposes.
 * 
 * @example
 * // Import and use as a dependency mock
 * import emptyModule from './empty-module';
 */

// Using Record<never, never> for a truly empty object type
const emptyModule: Record<never, never> = Object.freeze({});

export default emptyModule;
