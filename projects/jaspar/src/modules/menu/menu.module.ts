import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';


@NgModule({
  declarations: [
    MainMenuComponent,
    FooterMenuComponent
  ],
  entryComponents: [
    MainMenuComponent,
    FooterMenuComponent
  ],
  exports: [
    MainMenuComponent,
    FooterMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule,
    MenuModule
  ],
})
export class ProjectMenuModule { }
