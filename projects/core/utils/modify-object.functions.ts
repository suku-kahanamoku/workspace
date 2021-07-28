import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IS_DEFINED, IS_OBJECT } from './check-basic.functions';
import { TRIM } from './modify-string.functions';

export const TRANSLATE_MODULE_CONFIG = {
    loader: {
        provide: TranslateLoader,
        useFactory: ((http: HttpClient) => new TranslateHttpLoader(http)),
        deps: [HttpClient]
    }
}

export function GET_ROUTES(menuList: any[], cmpList: any[], modules?: any, lang: string = 'cs'): any {
    return menuList.map(menu => {
        const result: any = { path: menu[lang].url };
        // loadChildren routa
        if (menu.module && modules && modules[menu.module]) {
            result.loadChildren = modules[menu.module];
        }
        // component routa
        else if (menu.cmp) {
            result.component = cmpList.find(cmp => cmp.name === menu.cmp);
        }
        else if (menu[lang].redirectTo) {
            result.redirectTo = menu[lang].redirectTo;
            result.pathMatch = 'full'
        }
        //
        return result;
    });
}

/**
 * Naklonuje dany objekt
 *
 * @export
 * @param {*} object
 * @returns
 */
export function CLONE(object: any): any {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (!IS_DEFINED(object) || typeof object !== 'object') return object;

    // Handle Date
    if (object instanceof Date) {
        copy = new Date();
        copy.setTime(object.getTime());
        return copy;
    }

    // Handle Array
    if (object instanceof Array) {
        copy = [];
        for (let i = 0, len = object.length; i < len; i++) {
            copy[i] = CLONE(object[i]);
        }
        return copy;
    }

    // Handle Object
    if (object instanceof Object) {
        copy = {};
        ITERATE(object, (value: any, attr: any) => copy[attr] = CLONE(value));
        return copy;
    }

    throw new Error('Unable to copy object! Its type isn\'t supported.');
}

/**
 * Dany objekt prevede na string
 *
 * @export
 * @param {*} object
 * @returns
 */
export function STRINGIFY(
    object: any,
    replacer?: (key: string, value: any) => any,
    space?: string | number
): string {
    return JSON.stringify(object, replacer, space);
}

/**
 * Dane pole zamicha
 *
 * @export
 * @param {[any]} value
 */
export function SHUFFLE(value: any[]): void {
    for (let i = value.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [value[i], value[j]] = [value[j], value[i]];
    }
}

/**
 * Z daneho pole vybere nahodnou hodnotu
 *
 * @export
 * @param {any[]} value
 * @returns {*}
 */
export function RANDOM(value: any[]): any {
    return value[Math.floor(Math.random() * value.length)];
}

/**
 * Nalezne prunik
 *
 * @export
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {string[]}
 */
export function INTERSECTION(arr1: string[], arr2: string[]): string[] {
    return arr1.filter(value => arr2.indexOf(value) >= 0);
}

/**
 * Nalezne rozdil
 *
 * @export
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {string[]}
 */
export function DIFFERENCE(arr1: string[], arr2: string[]): string[] {
    return arr1.filter(value => arr2.indexOf(value) < 0);
}

/**
 * Iteruje objekt
 *
 * @export
 * @param {*} obj
 * @param {*} [callback=(value, key, index: number = 0) => undefined]
 * @returns {void}
 */
export function ITERATE(
    obj: any,
    callback: Function
): void {
    if (obj && (IS_OBJECT(obj) || Array.isArray(obj))) {
        let index = 0;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (callback(obj[key], key, index) === 'stop') return;
                // navysi index
                index++;
            }
        }
    }
}

/**
 * Vrati hodnotu z viceurovnoveho objektu
 * data: {
 *  params: {
 *   fields: {
 *    firstname: 'Jan'
 *   }
 *  }
 * }
 * GET_VALUE(data, 'firstname', 'params#fields', '#')
 *
 * @export
 * @param {*} data
 * @param {string} name
 * @param {string} [path]
 * @param {string} [delimiter='.']
 * @returns {*}
 */
export function GET_VALUE(data: any, name: string, path?: string, delimiter: string = '.'): any {
    let value;
    if (data && IS_DEFINED(name)) {
        if (path) {
            value = path.split(delimiter)
                .reduce((accum, curr) => accum && accum[curr] ? accum[curr] : accum, data) || {};
            value = value[name];
        } else {
            if (IS_DEFINED(data[name])) value = data[name];
        }
    }
    return IS_DEFINED(value) && TRIM(value.toString()).length
        ? value : undefined;
}

/**
 * Vytvori novy objekt dle zadanych parametru
 * data: {
 *  params: {
 *   fields: {
 *    firstname: 'Jan'
 *   }
 *  }
 * }
 * COPY_BY_PARAMS(data, 'params.fields.firstname')
 *
 * @export
 * @param {*} data
 * @param {string[]} params
 * @returns {*}
 */
export function COPY_BY_PARAMS(data: any, params: string[]): any {
    if (params && params.length) {
        const result = {};
        params.map(param => {
            let val = data;
            const name = param.split('.').slice(-1)[0];
            param.split('.').reduce((accum: any, curr: any) => {
                // vytvori atribut
                accum[curr] = accum[curr] || {};
                // zapamatuje si uroven
                val = val[curr] || {};
                // pokud je nakonci vlozi posledni hodnotu z urovne
                if (curr === name) accum[curr] = CLONE(val);
                // vrati aktualni uroven
                return accum[curr];
            }, result);
        });
        return result;
    }
}