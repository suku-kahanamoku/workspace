import { NgModule } from '@angular/core';

import { EmbedSrcDirective } from './embed-src.directive';
import { InnerHtmlDirective } from './inner-html.directive';

/**
 * Objekt s metadaty, vetsinou slouzi pro pretezovani modulu
 * 
 * @export
 * @constant Component
 */
export const METADATA = {
    declarations: [
        InnerHtmlDirective,
        EmbedSrcDirective,
    ],
    exports: [
        InnerHtmlDirective,
        EmbedSrcDirective,
    ]
};

/**
 * Modul pro sharovane direktivy
 *
 * @export
 * @class ShareDirectiveModule
 */
@NgModule(METADATA)
export class DirectiveModule { }
