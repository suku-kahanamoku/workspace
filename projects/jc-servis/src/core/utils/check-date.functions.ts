/**
 * Kontrola na dny v mesici
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_DAY(value: any): boolean {
    return /0?[1-9]|[12][0-9]|3[01]/.test(value);
}

/**
 * Kontrola na mesice v roce
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_MONTH(value: any): boolean {
    return /0?[1-9]|1[0-2]/.test(value);
}

/**
 * Kontrola zda je dana hodnota rok
 * napr. 1900 - 2099
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_YEAR(value: any): boolean {
    return /(19|20)[0-9]{2}/.test(value);
}
