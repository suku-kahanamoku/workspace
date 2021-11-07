import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu';
import { FooterMenuComponent } from './footer-menu/footer-menu';
import { TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { SideMenuComponent } from './side-menu/side-menu';


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
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    MenuModule,
    MatToolbarModule,
    MatDividerModule,
  ],
})
export class ProjectMenuModule { }
