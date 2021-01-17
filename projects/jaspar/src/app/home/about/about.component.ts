import { Component } from '@angular/core';

import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
