import { Component } from '@angular/core';

import * as data from '../assets/data/menu';
import { Configurable } from 'projects/core/abstracts/configurable.abstract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Configurable {

  title = 'jaspar';

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(data)
  }

}
