import { NgModule } from '@angular/core';
import { BgImgSrcDirective } from './bg-img-src.directive';

import { EmbedSrcDirective } from './embed-src.directive';
import { ImgSrcDirective } from './img-src.directive';
import { InnerHtmlDirective } from './inner-html.directive';

@NgModule({
    declarations: [
        InnerHtmlDirective,
        EmbedSrcDirective,
        ImgSrcDirective,
        BgImgSrcDirective,
    ],
    exports: [
        InnerHtmlDirective,
        EmbedSrcDirective,
        ImgSrcDirective,
        BgImgSrcDirective,
    ]
})
export class DirectiveModule { }
