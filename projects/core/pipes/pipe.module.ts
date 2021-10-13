import { NgModule } from '@angular/core';

import { MpCurrencyPipe } from './currency.pipe';

@NgModule({
    declarations: [
        MpCurrencyPipe
    ],
    exports: [
        MpCurrencyPipe
    ]
})
export class PipeModule { }
