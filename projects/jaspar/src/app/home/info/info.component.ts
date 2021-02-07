import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { AppService } from 'projects/core/services/app.service';
import data from '../../../assets/data/reference.json';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this._onLoad(<any>data.reference);
  }

}
