import { Component } from '@angular/core';

import data from '../assets/data/data.json';
import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { CLONE } from 'projects/core/utils/modify-object.functions';
import { AppService } from 'projects/core/services/app.service';
import { routeAnimations } from 'projects/core/animations/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent extends Themeable {

  title = 'jaspar';

  constructor(
    public readonly appService: AppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.load()
  }

  load(): void {
    this._onLoad(CLONE(data.menu
      .filter((menu: any) => !menu.cs.visible))
      .map((menu: any) => ({ ...menu, ...menu.cs })));
  }

}
