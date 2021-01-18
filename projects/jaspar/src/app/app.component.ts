import { Component } from '@angular/core';

import data from '../assets/data/data.json';
import { IConfig } from 'projects/core/interfaces/config.interface';
import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { CLONE } from 'projects/core/utils/modify-object.functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Themeable {

  title = 'jaspar';

  itemList: IMenu[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.config = <any>{ params: {} }
    this.load()
  }

  load(): void {
    this.itemList = CLONE(data.menu.filter(menu => !menu.redirectTo));
    this._onLoad(this.itemList);
    console.log(this.itemList)
  }

}
