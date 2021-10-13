import { Directive, Input, HostBinding, OnInit } from '@angular/core';

/**
 * Direktiva pro praci s iframe src atributem
 *
 * @export
 * @class EmbedSrcDirective
 */
@Directive({
    selector: '*[bg-img]',
})
export class BgImgSrcDirective {

    @HostBinding('style.background-image') protected _src?: string;

    @Input('bg-img') set src(url: string) {
        this._src = `url(${url})`;
    }

    @Input('bg-size') @HostBinding('style.background-size') size?: string = 'cover';

}
