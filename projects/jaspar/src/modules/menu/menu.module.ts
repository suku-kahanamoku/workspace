import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { HttpLoaderFactory } from '../../app/utils';


@NgModule({
  declarations: [
    MainMenuComponent,
    SideMenuComponent,
    FooterMenuComponent
  ],
  entryComponents: [
    MainMenuComponent,
    SideMenuComponent,
    FooterMenuComponent
  ],
  exports: [
    MainMenuComponent,
    SideMenuComponent,
    FooterMenuComponent
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
    MenuModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule
  ],
})
export class ProjectMenuModule { }
