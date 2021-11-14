import { Component } from '@angular/core';

import data from '../assets/data/data.json';
import { Themeable } from '../core/abstracts/themeable.abstract';
import { CLONE } from '../core/utils/modify-object.functions';
import { AppService } from '../core/services/app.service';
import { routeAnimations } from '../core/animations/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent extends Themeable {

  static title = 'AppComponent';

  title = 'fdsa';

  constructor(
    public readonly appService: AppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.load()
  }

  load(): void {
    this._onLoad(
      CLONE(
        data.menu
          .map((menu: any) => ({ ...menu, ...menu.cs }))
          .filter((menu: any) => menu.visible !== false)
      )
    );
  }

}
