import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MdMenuComponent } from './md-menu/md-menu.component';
import { HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';


/**
 * Modul se sharovanymi komponentami
 *
 * @export
 * @class ResponsiveModule
 */
@NgModule({
    declarations: [
        MdMenuComponent
    ],
    entryComponents: [
        MdMenuComponent
    ],
    exports: [
        MdMenuComponent
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule,
    ]
})
export class MenuModule { }
