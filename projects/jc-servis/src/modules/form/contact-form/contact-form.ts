import { Component } from '@angular/core';

import { Formable } from 'projects/core/modules/form/formable.abstract';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactFormComponent extends Formable {

}
