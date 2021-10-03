import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTreeModule } from '@angular/material/tree';

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
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatTreeModule,
    ],
    imports: [
        CommonModule,
        TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatTreeModule,
    ]
})
export class MenuModule { }
