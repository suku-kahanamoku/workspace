import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import data from '../assets/data/data.json';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectMenuModule } from '../modules/menu/menu.module';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { FormBuilder } from '@angular/forms';

const MODULES = {
  HomeModule: () => import('./home/home.module').then(m => m.HomeModule),
  ContactModule: () => import('./contact/contact.module').then(m => m.ContactModule),
  AboutUsModule: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
  ReferenceModule: () => import('./reference/blog.module').then(m => m.ReferenceModule),
  ServiceModule: () => import('./service/service.module').then(m => m.ServiceModule),
}

const CMP_LIST = [
  AppComponent,
  PageNotFoundComponent
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(GET_ROUTES(data.menu.filter(menu => !menu.parentId), CMP_LIST, MODULES)),
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
    MatSidenavModule,
    ProjectMenuModule,
  ],
  providers: [
      FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
