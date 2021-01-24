import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { MenuModule } from 'projects/core/modules/menu/menu.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainMenuComponent,
    SideMenuComponent
  ],
  entryComponents: [
    MainMenuComponent,
    SideMenuComponent
  ],
  exports: [
    MainMenuComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule
  ],
})
export class ProjectMenuModule { }
