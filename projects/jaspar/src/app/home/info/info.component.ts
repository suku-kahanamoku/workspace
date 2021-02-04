import { Component } from '@angular/core';

import data from '../../../assets/data/data.json';
import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends Themeable {

  data = data;

  constructor() {
    super()
  }

  ngOnInit(): void {
    
  }

  load(config: IConfig): void {

  }

}
