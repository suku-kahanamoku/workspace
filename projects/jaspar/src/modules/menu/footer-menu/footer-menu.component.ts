import { Component, Input } from '@angular/core';

import { IMenu } from 'projects/core/interfaces/menu.interface';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent {

  @Input() menus: IMenu[] = [];

}
