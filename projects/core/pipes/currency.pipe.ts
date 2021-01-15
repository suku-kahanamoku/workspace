import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

/**
 * Vytvori soucet
 *
 * @export
 * @class MpSumPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'currency', pure: true })
export class MpCurrencyPipe implements PipeTransform {

    /**
     * Creates an instance of MpCurrencyPipe.
     * @param {CurrencyPipe} _currencyPipe
     * @memberof MpCurrencyPipe
     */
    constructor(protected _currencyPipe: CurrencyPipe) { }

    /**
     * Transform metoda
     *
     * @param {*} value
     * @param {string} [currencyCode]
     * @param {('code' | 'symbol' | 'symbol-narrow' | string | boolean)} [display]
     * @param {('calculate' | 'custom' | string)} [digitsInfo]
     * @param {string} [locale]
     * @returns {(string | null)}
     * @memberof MpCurrencyPipe
     */
    transform(
        value: any,
        currencyCode?: string,
        display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
        digitsInfo: 'calculate' | 'default' | string = 'default',
        locale?: string
    ): string | null {
        // musi se to upravit, pac u celeho cisla js nativne pridava .000000001
        value = +(+value).toFixed(8);
        // uprava digits info
        switch (digitsInfo) {
            case 'default':
                digitsInfo = this._hasFraction(value) ? '0.2-2' : '0.0-0';
                break;

            case 'calculate':
                if (this._hasFraction(value)) {
                    if (value < 10) digitsInfo = '0.2-2';
                    else if (value < 100) digitsInfo = '0.1-1';
                    else if (value >= 100) digitsInfo = '0.0-0';
                } else {
                    digitsInfo = '0.0-0';
                }
                break;
        }
        return this._currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
    }

    /**
     * Kontrola zda hodnota ma desetinne cislo
     *
     * @protected
     * @memberof MpCurrencyPipe
     */
    protected _hasFraction = (value: number): boolean => value % 1 > 0

}