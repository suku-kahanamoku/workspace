import { Component } from '@angular/core';

import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
