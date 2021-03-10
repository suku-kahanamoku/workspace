import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';


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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule,
    MenuModule,
    MDBBootstrapModule.forRoot()
  ],
})
export class ProjectMenuModule { }
