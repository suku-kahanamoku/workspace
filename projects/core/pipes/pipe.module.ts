import { NgModule } from '@angular/core';

import { MpCurrencyPipe } from './currency.pipe';

/**
 * Objekt s metadaty, vetsinou slouzi pro pretezovani modulu
 * 
 * @export
 * @constant Component
 */
export const METADATA = {
    declarations: [
        MpCurrencyPipe
    ],
    exports: [
        MpCurrencyPipe
    ]
};

/**
 * Modul pro sharovane direktivy
 *
 * @export
 * @class ShareDirectiveModule
 */
@NgModule(METADATA)
export class PipeModule { }
