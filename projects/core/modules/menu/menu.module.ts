import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { MdMenuComponent } from './md-menu/md-menu.component';
import { TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';


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
        MatMenuModule,
        MatIconModule,
        MatBadgeModule,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
        RouterModule,
        MatMenuModule,
        MatIconModule,
        MatBadgeModule,
    ]
})
export class MenuModule { }
