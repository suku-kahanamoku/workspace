import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.html',
  styleUrls: ['./footer-menu.scss']
})
export class FooterMenuComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super();
  }

  ngOnInit(): void { }

}
