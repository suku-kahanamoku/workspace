import { Directive, Input, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Direktiva pro praci s iframe src atributem
 *
 * @export
 * @class EmbedSrcDirective
 */
@Directive({
    selector: 'iframe[src], embed[src]',
})
export class EmbedSrcDirective {

    /**
     * Src atribut v elementu
     *
     * @protected
     * @memberof EmbedSrcDirective
     */
    @HostBinding('src')
    protected _src: any;

    /**
     * Nastaveni src atributu
     *
     * @memberof EmbedSrcDirective
     */
    @Input('src')
    set src(value: string) {
        this._src = this._domSanitizer.bypassSecurityTrustResourceUrl(value);
    }

    /**
     * Creates an instance of EmbedSrcDirective.
     * @param {AppService} _appService
     * @param {DomSanitizer} _domSanitizer
     * @memberof EmbedSrcDirective
     */
    constructor(
        protected _domSanitizer: DomSanitizer
    ) { }

}
