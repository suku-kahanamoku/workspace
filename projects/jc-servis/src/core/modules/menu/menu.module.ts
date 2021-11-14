import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';

import { MdMenuComponent } from './md-menu/md-menu.component';
import { TRANSLATE_MODULE_CONFIG } from '../../utils/modify-object.functions';
import { SharedModule } from '../shared.module';


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
    exports: [
        MdMenuComponent,
        SharedModule,
        MatMenuModule,
        MatTreeModule,
    ],
    imports: [
        TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
        SharedModule,
        MatMenuModule,
        MatTreeModule,
    ]
})
export class MenuModule { }
