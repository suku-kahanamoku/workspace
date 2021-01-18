import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MdMenuComponent } from './md-menu/md-menu.component';


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
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class MenuModule { }
