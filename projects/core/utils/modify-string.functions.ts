
/**
 * Prevede vsechna pismena na velka
 *
 * @export
 * @param {string} value
 * @returns
 */
export function CAPITALIZE(value: string) {
    return value.trim().charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Dany text urizne na danem miste
 *
 * napr.
 * url = 'wdt.cz/aaa/bbb';
 * url = REMOVE_LAST_STRING(url, '/');
 * VYSTUP: wdt.cz/aaa
 *
 * @export
 * @param {string} value
 * @param {string} delimiter
 * @returns {string}
 */
export function REMOVE_LAST_STRING(value: string, delimiter: string, rmDelitimer: boolean = false): string {
    let key = value.lastIndexOf(delimiter);
    if (key >= 0) {
        if (!rmDelitimer) key++;
        // vrati vysledek
        return value.slice(0, key);
    }
    return value;
}

/**
 * Odstrani od konce bile znaky
 *
 * @export
 * @param {string} value
 * @param {string} [rmValue]
 * @returns {string}
 */
export function RTRIM(value: string, rmValue?: string): string {
    if (value && typeof value === 'string') {
        if (!rmValue) rmValue = "\s";
        // nova hodnota bez posledniho bileho znaku
        value = value.replace(new RegExp(`[${rmValue}]+$`), '');
    }
    return value;
}

/**
 * Odstrani ze zacatku bile znaky
 *
 * @export
 * @param {string} value
 * @param {string} [rmValue]
 * @returns {string}
 */
export function LTRIM(value: string, rmValue?: string): string {
    if (value && typeof value === 'string') {
        if (!rmValue) rmValue = "\s";
        // nova hodnota bez prvniho bileho znaku
        value = value.replace(new RegExp(`^[${rmValue}]+`), "");
    }
    return value;
}

/**
 * Odstrani na zacatku a na konci bile znaky
 *
 * @export
 * @param {string} value
 * @param {string} [rmValue=' ']
 * @returns {string}
 */
export function TRIM(value: string, rmValue: string = '\s'): string {
    return RTRIM(LTRIM(value, rmValue), rmValue);
}

/**
 * Zpracuje marky, tzn. vse co je v ${...}
 * napr. ${appService.auth.token}
 * Naprosto brutalni funkce, tak nesahat!!!
 *
 * @export
 * @param {string} value
 * @param {*} params
 * @returns {string}
 */
export function RESOLVE_MARKS(value: string, params: any): string {
    let result = value;
    if (value && params && typeof value === 'string') {
        const matches = result.match(/\${(.*?)}/ig);
        if (matches) {
            matches.map(match => {
                if (match) {
                    const replaceValue = match.replace(/\${|}/g, '').split('.')
                        .reduce((accum, curVal) => accum ? accum[curVal] : '', params);
                    // nahradi ${...} za hodnotu
                    result = result.replace(
                        match,
                        Array.isArray(replaceValue) ? `"${replaceValue.join('","')}"` : (replaceValue || '')
                    );
                }
            });
        }
    }
    return result;
}
