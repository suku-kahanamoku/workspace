import { Component, Input } from '@angular/core';

import { IMenu } from 'projects/core/interfaces/menu.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Input() menus: IMenu[] = [];

  @Input() treeControl: any;

  @Input() isExpandable: any;

}
