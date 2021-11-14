import { AbstractControl, ValidationErrors } from '@angular/forms';

import { IS_CZECH_PHONE_NUMBER } from './check-phone.functions';
import { IS_POSTAL_CODE, IS_STREET_NAME, IS_CITY } from './check-address.functions';
import { TRIM } from './modify-string.functions';
import { IS_CORRECT_PASSWORD, IS_EMAIL, IS_NAME, IS_TIN, IS_VATID } from './check-profile.functions';
import { IS_NUMERIC } from './check-basic.functions';

/**
 * Validace emailu
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_EMAIL(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_EMAIL(value)) errors['email'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace nazvu
 *
 * @export
 * @param {AbstractControl} control
 * @returns {(ValidationErrors | undefined)}
 */
export function VALIDATE_NAME(control: AbstractControl): ValidationErrors | undefined {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_NAME(value)) errors['name'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace tel. cisla
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_PHONE_NUMBER(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_NUMERIC(value)) errors['numeric'] = false;
    if (!IS_CZECH_PHONE_NUMBER(value)) errors['phone'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace hesla
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_PASSWORD(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_CORRECT_PASSWORD(value)) errors['password'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace opakovaneho hesla
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_PASSWORD_REPEAT(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    const password = control?.parent?.get('password');
    if (password && password.value !== value) errors['passwordRepeat'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace IC fyzicke osoby
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_TIN(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_TIN(value)) errors['tin'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace DIC pravnicke firmy
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_VATID(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_VATID(value)) errors['vatid'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace psc
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_ZIP(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_POSTAL_CODE(value)) errors['zip'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace ulice s cislem popisnym
 *
 * @export
 * @param {AbstractControl} control
 * @returns
 */
export function VALIDATE_STREET(control: AbstractControl) {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_STREET_NAME(value)) errors['street'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace mesta
 *
 * @export
 * @param {AbstractControl} control
 * @returns {(ValidationErrors | undefined)}
 */
export function VALIDATE_CITY(control: AbstractControl): ValidationErrors | undefined {
    const value = TRIM(control.value);
    const errors: any = {};
    if (!IS_CITY(value)) errors['city'] = false;
    return Object.keys(errors).length ? errors : undefined;
}

/**
 * Validace regularniho vyrazu
 *
 * @export
 * @param {AbstractControl} control
 * @param {string} rule
 * @returns {(ValidationErrors | undefined)}
 */
export function VALIDATE_PATTERN(control: AbstractControl, rule: string): ValidationErrors | undefined {
    const value = TRIM(control.value);
    const errors: any = {};
    const regex = new RegExp(rule);
    if (!regex.test(value)) errors['pattern'] = false;
    return Object.keys(errors).length ? errors : undefined;
}
