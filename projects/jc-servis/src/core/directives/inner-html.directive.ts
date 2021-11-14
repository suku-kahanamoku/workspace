import { Directive, Input, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IS_ABSOLUTE_URL, IS_FILE_URL, IS_NATIVE_LINK } from '../utils/check-url.functions';

/**
 * Direktiva pro praci s innerHTML atributem
 *
 * @export
 * @class InnerHtmlDirective
 */
@Directive({
    selector: '*[innerHTML]',
})
export class InnerHtmlDirective {

    /**
     * Nativni innerHTML, pokud se zmeni aktualizuji se zobrazovana data
     *
     * @protected
     * @memberof InnerHtmlDirective
     */
    @HostBinding('innerHTML')
    protected _innerHtml: any;

    /**
     * Nastaveni innerHTML
     *
     * @memberof InnerHtmlDirective
     */
    @Input('innerHTML')
    set innerHtml(value: string) {
        this._innerHtml = this._domSanitizer.bypassSecurityTrustHtml(value);
    }

    /**
     * Udalosti pri kliku na celou direktivu
     * Zkontroluje zda ma atribut HREF => spusti navigaci
     *
     * @param {*} event
     * @memberof InnerHtmlDirective
     */
    @HostListener('click', ['$event'])
    onClick(event: any) {
        const href = event.target.attributes['href'];
        if (href) {
            const url = href.value;
            if (!IS_ABSOLUTE_URL(url) && !IS_FILE_URL(url) && !IS_NATIVE_LINK(url)) {
                // pokud je navigace zavola preventDefault
                if (event) event.preventDefault();
                // navigace na dane url
                /* this._appService.navigate(url); */
            }
        }
    }

    /**
     * Creates an instance of InnerHtmlDirective.
     * @param {DomSanitizer} _domSanitizer
     * @memberof InnerHtmlDirective
     */
    constructor(protected _domSanitizer: DomSanitizer) { }

}
