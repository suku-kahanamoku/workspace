import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.html',
  styleUrls: ['./side-menu.scss']
})
export class SideMenuComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super();
  }

  ngOnInit(): void { }

}
