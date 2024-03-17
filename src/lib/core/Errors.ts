/**
 * Class: Errors
 *
 * The Errors class manages a collection of validation errors.
 */
export default class Errors {
	/**
	 * The collection of errors.
	 * @public
	 */
	public errors: object;

	/**
	 * Constructor for the Errors class.
	 *
	 * @param {object} errors - The initial collection of errors.
	 */
	constructor(errors: object) {
		this.errors = errors;
	}

	/**
	 * Retrieves all the errors.
	 *
	 * @returns {string[]} - Returns array of all errors.
	 */
	all(): string[] {
		let errors = [];

		for (let key in this.errors) {
			if (this.errors.hasOwnProperty(key)) {
				errors = errors.concat(this.errors[key]);
			}
		}

		return errors;
	}

	/**
	 * Checks if there are any errors present.
	 *
	 * @returns {boolean} - Returns true if errors are present, otherwise returns false.
	 */
	any(): boolean {
		return Object.keys(this.errors).length === 0 ? false : true;
	}

	/**
	 * Retrieves the first error message for a given property.
	 *
	 * @param {string} property - The name of the property to retrieve the first error message for.
	 * @returns {string} - The first error message for the specified property.
	 */
	first(property: string): string {
		if (this.errors.hasOwnProperty(property)) {
			return this.errors[property][0];
		}

		return null;
	}

	/**
	 * Retrieves the error message for a given property.
	 *
	 * @param {string} property - The name of the property to retrieve the error message for.
	 * @returns {boolean} - The error message for the specified property.
	 */
	get(property: string): boolean {
		if (this.errors.hasOwnProperty(property)) {
			return this.errors[property];
		}

		return null;
	}

	/**
	 * Checks if errors contain messages for a specific property.
	 *
	 * @param {string} property - The name of the property to check for errors.
	 * @returns {boolean} - Returns true if errors contain messages for the specified property, otherwise returns false.
	 */
	has(property: string): boolean {
		return this.errors.hasOwnProperty(property);
	}

	/**
	 * Adds an error message for a specific property.
	 *
	 * @param {string} property - The name of the property to add the error message for.
	 * @param {string} message - The error message to be added.
	 */
	add(property: string, message: string): void {
		if (!this.errors.hasOwnProperty(property)) {
			this.errors[property] = [];
		}

		this.errors[property].push(message);
	}

	/**
	 * Clears error messages for a specific property or all properties if no property is provided.
	 *
	 * @param {string} [property] - Optional. The name of the property to clear error messages for.
	 */
	clear(property?: string): void {
		if (property && this.errors.hasOwnProperty(property)) {
			delete this.errors[property];

			return;
		}

		this.errors = {};
	}

	/**
	 * Set new error messages.
	 *
	 * @param {object} errors - The errors object to set.
	 */
	set(errors: object) {
		for (let key in errors) {
			if (errors.hasOwnProperty(key)) {
				const value = errors[key];

				this.errors[key] = Array.isArray(value) ? value : [value];
			}
		}
	}

	/**
	 * Get a generalized error message.
	 *
	 * @param {string} message - The default error message.
	 * @returns {string|null} The formatted error message.
	 */
	message(message = 'Something went wrong with your submission.'): string | null {
		if (Object.keys(this.errors).length === 0) {
			return null;
		}

		let count = 0;

		for (let key in this.errors) {
			if (this.errors.hasOwnProperty(key)) {
				count += this.errors[key].length;
			}

			if (count > 1) {
				message = this.errors[key][0];
			}
		}

		if (count === 1) {
			return message;
		}

		return `${message}. (and ${count - 1} more error${count > 2 ? 's' : ''})`;
	}
}
