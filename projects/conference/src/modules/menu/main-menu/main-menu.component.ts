import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent extends Themeable {

  @Input() drawer: any;

  constructor(public readonly appService: AppService) {
    super();
  }

  ngOnInit(): void { }

}
