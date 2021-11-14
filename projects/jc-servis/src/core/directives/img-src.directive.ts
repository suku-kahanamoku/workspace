import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Direktiva pro praci s iframe src atributem
 *
 * @export
 * @class EmbedSrcDirective
 */
@Directive({
    selector: 'img[src]',
})
export class ImgSrcDirective implements OnInit {

    @Input('src') @HostBinding('src') src?: string;

    @Input('alt') @HostBinding('alt') alt?: string;

    constructor(
        protected _domSanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.alt = this.src && !this.alt ? this.src : this.alt;
    }

}
