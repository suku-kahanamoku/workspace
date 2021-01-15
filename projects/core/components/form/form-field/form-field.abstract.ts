import { OnInit, Input, Output, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { AppService } from 'projects/core/services/app.service';
import { IS_EQUAL } from 'projects/core/utils/check-basic.functions';
import { ITERATE } from 'projects/core/utils/modify-object.functions';
import { ReplaySubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormService } from '../form.service';
import { IFormField } from './form-field.interface';

/**
 * Abstrakce pro form field
 *
 * @export
 * @abstract
 * @class FormFieldAbstract
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
export abstract class FormFieldAbstract implements OnInit, OnDestroy {

  /**
   * Subscription - pripojena komunikace s backendem, appkou, ...
   *
   * @protected
   * @type {*}
   * @memberof FormFieldAbstract
   */
  protected _subscriptions: any = {};

  /**
   * Servis, spolecna data, store
   *
   * @readonly
   * @type {AppService}
   * @memberof FormFieldAbstract
   */
  get appService(): AppService {
    return this.formService.appService;
  };

  /**
   * Form tag, napr. input, textarea, ...
   *
   * @type {ElementRef}
   * @memberof FormFieldAbstract
   */
  /**
   * Form tag, napr. input, textarea, ...
   *
   * @type {ElementRef}
   * @memberof FormFieldAbstract
   */

  @ViewChild('formElement')
  formElement!: ElementRef;

  /**
   * FormGroup
   *
   * @type {FormGroup}
   * @memberof FormFieldAbstract
   */
  @Input() group: FormGroup = this.formService.formBuilder.group({});

  /**
   * Field config
   *
   * @type {IFormField}
   * @memberof FormFieldAbstract
   */

  @Input()
  field!: IFormField;

  /**
   * Dynamicka hodnota
   *
   * @private
   * @type {ReplaySubject<any>}
   * @memberof FormFieldAbstract
   */
  private _value$: ReplaySubject<any> = new ReplaySubject();

  /**
   * Hodnota, ktera se muze vlozit do AbstractControl.value
   *
   * @param {*} value
   * @memberof FormFieldAbstract
   */
  @Input() set value(value: any) {
    if (typeof value !== 'undefined') this._value$.next(value);
  }

  /**
   * Disablovani fieldu
   *
   * @param {boolean} value
   * @memberof FormFieldAbstract
   */
  @Input() set disabled(value: boolean) {
    if (this.formControl && this.formControl.disabled !== value) {
      this.field.disabled = value;
      if (value)
        this.formControl.disable();
      else
        this.formControl.enable();
    }
  }

  /**
   * Required
   *
   * @memberof FormFieldAbstract
   */
  @Input() set required(value: boolean) {
    if (this.field) this.field.required = value;
  }

  /**
   * Readonly
   *
   * @type {boolean}
   * @memberof FormFieldAbstract
   */
  @Input() set readonly(value: boolean) {
    if (this.field) this.field.readonly = value;
  }

  /**
   * Label
   *
   * @memberof FormFieldAbstract
   */
  @Input() set label(value: string) {
    if (this.field) this.field.label = value;
  }

  /**
   * Placeholder
   *
   * @memberof FormFieldAbstract
   */
  @Input() set placeholder(value: string) {
    if (this.field) this.field.placeholder = value;
  }

  /**
   * Ikona
   * napr. {value: lock, position: suffix | prefix}
   *
   * @type {object}
   * @memberof FormFieldAbstract
   */
  @Input() icon: any = {};

  /**
   * Html class
   *
   * @type {string}
   * @memberof FormFieldAbstract
   */
  @Input() class: string = '';

  /**
   * Html id
   *
   * @type {string}
   * @memberof FormFieldAbstract
   */
  @Input() id: string = '';

  /**
   * Hint
   *
   * @type {string}
   * @memberof FormFieldAbstract
   */
  @Input() hint: string = '';

  /**
   * EventEmitter pro zmenu hodnot
   *
   * @memberof FormFieldAbstract
   */
  @Output() valueChanges: EventEmitter<AbstractControl> = new EventEmitter();

  /**
   * EventEmitter pro automaticke vyplnovani
   *
   * @type {EventEmitter<AbstractControl>}
   * @memberof FormFieldAbstract
   */
  @Output() onAutofill: EventEmitter<AbstractControl> = new EventEmitter();

  /**
   * EventEmitter na blur (deaktivace fieldu)
   *
   * @type {EventEmitter<AbstractControl>}
   * @memberof FormFieldAbstract
   */
  @Output() blur: EventEmitter<AbstractControl> = new EventEmitter();

  /**
   * Zabezpeceni nekonecne smycky
   *
   * @protected
   * @type {boolean}
   * @memberof FormFieldAbstract
   */

  protected _blurred!: boolean;

  /**
   * Reactive field
   *
   * @type {AbstractControl}
   * @memberof FormFieldAbstract
   */
  formControl!: AbstractControl;

  /**
   * Creates an instance of FormFieldAbstract.
   * @param {FormService} formService
   * @memberof FormFieldAbstract
   */
  constructor(protected formService: FormService) { }

  /**
   * Init
   *
   * @memberof FormFieldAbstract
   */
  ngOnInit(): void {
    if (this.field) {
      // nastavi id
      this.id = this.id || (this.field.path || this.field.name || '').replace(/\./g, '_');
      // inicializuje formControl
      this._initFormControl(this.field);
    }
  }

  /**
   * Destroy - funkce ktera se spusti pred odstranenim daneho objektu
   *
   * @memberof FormFieldAbstract
   */
  ngOnDestroy(): void {
    ITERATE(this._subscriptions, (subscriber: Subscription) => {
      if (subscriber) subscriber.unsubscribe();
    });
    if (this.formControl) {
      this.formControl.clearValidators();
      this.formControl.clearAsyncValidators();
      this.formControl.updateValueAndValidity();
    }
  }

  /**
   * Nainicializuje formControl
   *
   * @protected
   * @param {IFormField} field
   * @memberof FormFieldAbstract
   */
  protected _initFormControl(field: IFormField): void {
    if (field) {
      this.formControl = <AbstractControl>this.group.get(field.path || field.name || '');
      // pokud neexistuje vytvori novy
      if (!this.formControl) {
        this.formControl = this.formService.getFormControl(field);
        this.group.addControl(field.name, this.formControl);
      }
      // odposlouchava zmeny hodnot ve formControl
      if (this._subscriptions.valueChanges) this._subscriptions.valueChanges.unsubscribe();
      this._subscriptions.valueChanges = this.formControl.valueChanges
        .pipe(debounceTime(400))
        .subscribe(value => this._onValueChange(value));
      // odposlouchava zmeny dynamickych hodnot
      if (this._subscriptions._value) this._subscriptions._value.unsubscribe();
      this._subscriptions._value = this._value$.subscribe(value => this.formControl.patchValue(value));
    }
  }

  /**
   * Udalosti po zmene hodnoty
   *
   * @protected
   * @param {*} value
   * @memberof FormFieldAbstract
   */
  protected _onValueChange(value: any): void {
    if (!IS_EQUAL(this.field.value, value)) {
      if (typeof value !== 'undefined') {
        this._blurred = false;
        this.field.value = value;
        // pokud ma field autofilled, emituje se onAutofill
        if (this.formElement && this.formElement.nativeElement.className.indexOf('autofilled') >= 0)
          this.onAutofill.emit(this.formControl);
      }
      // signal ven, ze se zmenila hodnota
      this.valueChanges.emit(this.formControl);
    }
  }

  /**
   * Udalosti na blur
   *
   * @memberof FormFieldAbstract
   */
  onBlur(): void {
    if (!this._blurred) {
      this.blur.emit(this.formControl);
      this._blurred = true;
    }
  }

  /**
   * Vrati chybovou hlasku
   * Je pouzit zkraceny zapis => naschval, nerozsirovat "{}" !!!
   *
   * @param {*} error
   * @returns {string}
   * @memberof FormFieldAbstract
   */
  getErrorMessage = (error: any): string => {
    console.log(error)
    return '';
  }

}
