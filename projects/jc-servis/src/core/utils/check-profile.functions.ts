/**
 * Kontrola na spravnost emailove adresy
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_EMAIL(value: string): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

/**
 * Kontrola na spravnost hesla
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_CORRECT_PASSWORD(value: string): boolean {
    /* return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/.test(value); */
    return /[\S+]{5,}$/.test(value);
}

/**
 * Kontrola IC fyzicke osoby
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_TIN(value: string): boolean {
    try {
        let a = 0;
        value = value.length === 7 ? `0${value}` : value;
        if (value.length !== 8) throw 1;
        let b = value.split('');
        let c = 0;
        for (let i = 0; i < 7; i++) a += ((+b[i]) * (8 - i));
        a = a % 11;
        c = 11 - a;
        if (a == 1) c = 0;
        if (a == 0) c = 1;
        if (a == 10) c = 1;
        if ((+b[7]) != c) throw (1);
    }
    catch (e) {
        return false;
    }
    return true;
}

/**
 * Kontrola DIC firmy
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_VATID(value: string): boolean {
    try {
        let id = value.substr(0, 2).toUpperCase();
        value = value.substr(2);
        if (value.length < 8 || value.length > 11) throw 1;
        if ((id == 'CZ') || (id == 'SK')) {
            if (value.length == 8) return IS_TIN(value);
            throw 1;
        }
        return true;
    }
    catch (e) {
        return false;
    }
}

/**
 * Kontrola rodneho cisla
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_PERSON_NUM(value: string): boolean {
    try {
        if (value.length == 0) return true;
        if (value.length < 9) throw 1;
        var year = parseInt(value.substr(0, 2), 10);
        var month = parseInt(value.substr(2, 2), 10);
        var day = parseInt(value.substr(4, 2), 10);
        var evaluet = parseInt(value.substr(6, 3), 10);
        if ((value.length == 9) && (year < 54)) return true;
        var c = 0;
        if (value.length == 10) c = parseInt(value.substr(9, 1));
        var m = parseInt(value.substr(0, 9)) % 11;
        if (m == 10) m = 0;
        if (m != c) throw 1;
        year += (year < 54) ? 2000 : 1900;
        if ((month > 70) && (year > 2003)) month -= 70;
        else if (month > 50) month -= 50;
        else if ((month > 20) && (year > 2003)) month -= 20;
        var d = new Date();
        if ((year) > d.getFullYear()) throw 1;
        if (month == 0) throw 1;
        if (month > 12) throw 1;
        if (day == 0) throw 1;
        if (day > 31) throw 1;
    }
    catch (e) {
        return false;
    }
    return true;
}

/**
 * Kontrola jmena
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_NAME(value: string): boolean {
    return (/^[A-Za-z\u00C0-\u024F\u1E00-\u1EFF\s\-]+$/.test(value)) && (value || '').length >= 2
}
