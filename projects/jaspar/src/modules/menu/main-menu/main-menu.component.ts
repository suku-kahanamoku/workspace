import { Component, Input } from '@angular/core';

import { IMenu } from 'projects/core/interfaces/menu.interface';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent {

  @Input() menus: IMenu[] = [];

  @Input() drawer: any;

}
