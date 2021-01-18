import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import data from '../assets/data/data.json';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuModule } from 'projects/core/modules/menu/menu.module';

const GET_ROUTES = (menuList: any[], cmpList: any[]): any => menuList.map(menu => {
  const result: any = { path: menu.path };
  // component routa
  if (menu.cmp) {
    result.component = cmpList.find(tmpCmp => tmpCmp.name === menu.cmp);
  }
  // loadChildren routa
  else if (menu.module) {
    switch (menu.module) {
      case 'HomeModule':
        result.loadChildren = () => import('./home/home.module').then(m => m.HomeModule);
        break;
      case 'BookkeepingModule':
        result.loadChildren = () => import('./bookkeeping/bookkeeping.module').then(m => m.BookkeepingModule);
        break;
      case 'ArchivModule':
        result.loadChildren = () => import('./archiv/archiv.module').then(m => m.ArchivModule);
        break;
      case 'ForeignLanguageModule':
        result.loadChildren = () => import('./foreign-language/foreign-language.module').then(m => m.ForeignLanguageModule);
        break;
      case 'ContactModule':
        result.loadChildren = () => import('./contact/contact.module').then(m => m.ContactModule);
        break;
      case 'BlogModule':
        result.loadChildren = () => import('./blog/blog.module').then(m => m.BlogModule);
        break;
    }
  }
  else if (menu.redirectTo) {
    result.redirectTo = menu.redirectTo;
    result.pathMatch = 'full'
  }
  //
  return result;
});

const CMP_LIST = [
  AppComponent,
  PageNotFoundComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    BrowserModule,
    RouterModule.forRoot(GET_ROUTES(data.menu.filter(menu => !menu.parentId), CMP_LIST)),
    BrowserAnimationsModule,
    MatSidenavModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
