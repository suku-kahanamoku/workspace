import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss']
})
export class MainMenuComponent extends Themeable {

  @Input() drawer: any;

  constructor(public readonly appService: AppService) {
    super();
  }

  ngOnInit(): void { }

}
