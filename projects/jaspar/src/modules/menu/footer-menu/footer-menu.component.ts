import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent extends Themeable {

  parents: IMenu[] = [];

  children: IMenu[] = [];

  constructor(public readonly appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.parents = <IMenu[]>this.itemList.filter(item => !item.parentId && ['1', '2'].indexOf(item._id) < 0);
    this.children = <IMenu[]>this.itemList[1].children;
    console.log(this);

  }

}
