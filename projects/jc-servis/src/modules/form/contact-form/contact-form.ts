import { Component } from '@angular/core';
import { IConfig } from 'projects/core/interfaces/config.interface';

import data from '../../../assets/data/data.json';
import { Formable } from 'projects/core/modules/form/formable.abstract';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactFormComponent extends Formable {

  ngOnInit(): void {
    this.config = <IConfig>{
      params: {
        fields: data.contactForm
      }
    }
    super.ngOnInit();
  }

}
