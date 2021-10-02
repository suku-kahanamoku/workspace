import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { SideMenuComponent } from './side-menu/side-menu.component';


@NgModule({
  declarations: [
    MainMenuComponent,
    FooterMenuComponent,
    SideMenuComponent,
  ],
  exports: [
    MainMenuComponent,
    FooterMenuComponent,
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule,
    MenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProjectMenuModule { }
