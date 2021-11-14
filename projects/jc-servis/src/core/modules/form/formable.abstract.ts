import { Directive } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";

import { IFormField } from "./form-field/form-field.interface";
import { FormService } from "./form.service";
import { Loadable } from "../../abstracts/loadable.abstract";
import { IS_DEFINED } from "../../utils/check-basic.functions";
import { ITERATE, GET_VALUE } from "../../utils/modify-object.functions";
import { IItem } from "../../interfaces/item.interface";
import { AppService } from "../../services/app.service";


@Directive()
export abstract class Formable extends Loadable {

    /**
     * Pomocna promena, podle ktere se da urcit, zda probiha dotaz na backend
     *
     * @readonly
     * @type {Subscription}
     * @memberof Formable
     */
    get loading(): Subscription {
        return this._subscriptions.submit || this._subscriptions.load || { closed: true };
    }

    /**
     * Data pro ng formular
     *
     * @type {FormGroup}
     * @memberof Formable
     */
    readonly group: FormGroup = this.formService.formBuilder.group({});

    /**
     *
     *
     * @type {IFormField[]}
     * @memberof Formable
     */
    fields: IFormField[] = [];

    /**
     * Creates an instance of Formable.
     * @param {FormService} formService
     * @memberof Formable
     */
    constructor(
        public readonly appService: AppService,
        public readonly formService: FormService
    ) {
        super();
    }

    /**
     * Init
     *
     * @memberof Formable
     */
    ngOnInit(): void {
        if (this.config) {
            this.fields = Object.values(this.config.params.fields);
            this._initReactiveForm(this.config.params.fields, this.group);
            this.load(this.config);
        }
    }

    /**
     * Inicializuje fieldy, vytvori groupy a prida je do seznamu
     * Rekurzivni funkce
     *
     * @protected
     * @param {IFormField} fields
     * @param {FormGroup} group
     * @param {string} [path]
     * @memberof Formable
     */
    protected _initReactiveForm(fields: IFormField, group: FormGroup, path?: string): void {
        if (fields) {
            // inicializuji se vsechny fieldy a vlozi se do seznamu a do groupu
            ITERATE(fields, (field: IFormField, name: string) => {
                // pokud je to konecny field, inicializuje se
                if (field.type) {
                    // vlozi formControl do groupCotrol
                    group.addControl(name, this.formService.getFormControl(field, name));
                }
                // jinak se vytvori subgroup a v ni se nainicializuji fieldy
                else {
                    const subGroup = this.formService.formBuilder.group({});
                    group.addControl(name, subGroup);
                    // rekurze
                    this._initReactiveForm(field, subGroup, path ? `${path}.${name}` : name);
                }
            });
        }
    }

    /**
     * Odeslani formulare
     * Kazda zdedena komponenta urcuje sama jakym zpusobem bude odesilat formulare
     *
     * @abstract
     * @param {*} [values]
     * @memberof Formable
     */
    submit(successClbk = this._onSuccesSubmit, errorClbk = this._onErrorSubmit): void {
        // get a delete nemusi byt validni
        if (!this.group.invalid || ['get', 'delete'].indexOf(this.config.params.method) >= 0) {
            let subscriber;
            const fields = this.group.value;
            switch (this.config.params.method) {
                case 'POST':
                    subscriber = this.appService.http.post(this.config.params.submitUrl, fields);
                    break;

                case 'PUT':
                    subscriber = this.appService.http.put(this.config.params.submitUrl, fields);
                    break;

                case 'PATCH':
                    /* subscriber = this.appService.http.patch(this.config.params.submitUrl, fields, this.item._etag); */
                    break;

                case 'DELETE':
                    subscriber = this.appService.http.delete(this.config.params.submitUrl);
                    break;

                case 'GET':

                    break;
            }
            if (subscriber) {
                this._subscriptions.submit?.unsubscribe();
                this._subscriptions.submit = subscriber.subscribe(successClbk, errorClbk);
            }
        } else {
            this.appService.notification.load('form-invalid');
        }
    }

    /**
     * Udalosti po uspesnem odeslani formulare
     * Nelze pouzit customText komponentu, pac load probehne pozdeji nez otevreni snackbaru
     *
     * @protected
     * @param {*} data
     * @memberof Formable
     */
    protected _onSuccesSubmit(data: IItem[]): void {
        if (data) {

        }
    }

    /**
     * Zobrazi error hlasku
     * Nelze pouzit customText komponentu, pac load probehne pozdeji nez otevreni snackbaru
     *
     * @protected
     * @param {HttpErrorResponse} error
     * @param {*} [options]
     * @memberof Formable
     */
    protected _onErrorSubmit(error: HttpErrorResponse): void {
        if (error) {

        }
    }

    /**
     * Nastavi hodnoty jednotlivym fieldum
     *
     * @protected
     * @param {*} [data]
     * @memberof Formable
     */
    protected _setFieldsValue(data?: IItem[]): void {
        if (data) {
            // nastavi vsem fieldum hodnoty dle zadanych dat
            this.formService.getFormControls(this.group).map((formControl: AbstractControl) => {
                if (formControl) {
                    const field = <any>{};
                    const value = GET_VALUE(data, field.name, field.group);
                    formControl.patchValue(value);
                    if (IS_DEFINED(value) && value.toString().length)
                        formControl.markAsTouched({ onlySelf: true });
                }
            });
        }
    }

}
