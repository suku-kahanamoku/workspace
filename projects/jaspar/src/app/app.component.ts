import { Component } from '@angular/core';

import data from '../assets/data/data.json';
import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Loadable {

  title = 'jaspar';

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.itemList = data.menu;
    console.log(this.itemList)
  }

  load(config: IConfig): void {

  }

}
