/**
 * Kontrola zda dana hodnota je postovni smerovaci cislo
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_POSTAL_CODE(value: any): boolean {
    return /^[0-9\s]{5,6}$/.test(value);
}

/**
 * Kontrola na ulici s cislem popisnym
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_STREET_NAME(value: any): boolean {
    return (/^[^!@#$%^&*_\+=|`~"']+$/.test(value)) && (value || '').length >= 2
}

/**
 * Kontrola mesta
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_CITY(value: string): boolean {
    return (/^[^!@#$%^&*_\+=|`~"']+$/.test(value)) && (value || '').length >= 2
}
