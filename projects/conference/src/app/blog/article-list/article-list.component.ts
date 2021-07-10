import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
