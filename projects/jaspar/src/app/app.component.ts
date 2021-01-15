import { Component } from '@angular/core';

import { Configurable } from 'projects/core/abstracts/configurable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Configurable {

  config: IConfig;

  title = 'jaspar';

  constructor() {
    super();
    this.config = {};
  }

}
