import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";

import { IFormField } from "./form-field/form-field.interface";
import { FormService } from "./form.service";
import { Loadable } from "projects/core/abstracts/loadable.abstract";
import { IConfig } from "projects/core/interfaces/config.interface";
import { AppService } from "projects/core/services/app.service";
import { IS_DEFINED } from "projects/core/utils/check-basic.functions";
import { ITERATE, GET_VALUE } from "projects/core/utils/modify-object.functions";


/**
 * Abstrakce pro formulare
 *
 * @export
 * @abstract
 * @class MpForm
 * @extends {MpItemComponent}
 */
export abstract class MpForm extends Loadable {

    /**
     * Servis, spolecna data, store
     *
     * @readonly
     * @type {AppService}
     * @memberof MpForm
     */
    get appService(): AppService {
        return this.formService.appService;
    };

    /**
     * Pomocna promena, podle ktere se da urcit, zda probiha dotaz na backend
     *
     * @readonly
     * @type {Subscription}
     * @memberof MpForm
     */
    get loading(): Subscription {
        return this._subscriptions.submit || this._subscriptions.load || { closed: true };
    }

    /**
     * Data pro ng formular
     *
     * @type {FormGroup}
     * @memberof MpForm
     */
    readonly group: FormGroup = this.formService.formBuilder.group({});

    /**
     * Creates an instance of MpForm.
     * @param {FormService} formService
     * @memberof MpForm
     */
    constructor(
        public readonly formService: FormService
    ) {
        super();
    }

    /**
     * Init
     *
     * @memberof MpForm
     */
    ngOnInit(): void {
        if (this.config) {
            this.formService.errors = this.config.params.errors;
            this._initReactiveForm(this.config.params.fields, this.group);
            this.load(this.config.params.restUrl);
        }
    }

    /**
     * Na zaklade daneho configu nacte data z backendu a ulozi je do itemListu
     *
     * @param {IConfig} config
     * @param {boolean} [keepData]
     * @returns
     * @memberof MpForm
     */
    load(config: IConfig, successClbk = this._onLoad, errorClbk = this._onLoadError): void {
        if (config?.params?.restUrl) {
            if (this._subscriptions.load) this._subscriptions.load.unsubscribe();
            this._subscriptions.load = this.appService.http.load(config.params.restUrl)
                .subscribe(successClbk, errorClbk);
        }
    }

    /**
     * Udalosti po nacteni dat
     *
     * @protected
     * @param {IConfig} config
     * @param {any[]} [data]
     * @returns {void}
     * @memberof MpForm
     */
    protected _onLoad(data?: any[]): void {
        if (data) {
            this.itemList = data;
        }
    }

    /**
     * Chyby po nacteni
     *
     * @protected
     * @param {HttpErrorResponse} error
     * @memberof MpForm
     */
    protected _onLoadError(error: HttpErrorResponse): void {
        if (error) {
            console.log(error);
        }
    }

    /**
     * Inicializuje fieldy, vytvori groupy a prida je do seznamu
     * Rekurzivni funkce
     *
     * @protected
     * @param {*} fields
     * @param {FormGroup} group
     * @param {string} path
     * @param {FormGroup} root
     * @param {IFormField[]} [allFields]
     * @memberof MpForm
     */
    protected _initReactiveForm(fields: any, group: FormGroup, path?: string): void {
        if (fields) {
            // inicializuji se vsechny fieldy a vlozi se do seznamu a do groupu
            ITERATE(fields, (field: IFormField, name: string) => {
                // pokud je to konecny field, inicializuje se
                if (field.type) {
                    // vlozi formControl do groupCotrol
                    group.addControl(name, this.formService.getFormControl(field));
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
     * @memberof MpForm
     */
    submit(successClbk = this._onSuccesSubmit, errorClbk = this._onErrorSubmit): void {
        // get a delete nemusi byt validni
        if (!this.group.invalid || ['get', 'delete'].indexOf(this.config.params.method) >= 0) {
            let subscriber;
            const fields = this.group.value;
            switch (this.config.params.method) {
                case 'post':
                    subscriber = this.appService.http.post(this.config.params.submitUrl, fields);
                    break;

                case 'put':
                    subscriber = this.appService.http.put(this.config.params.submitUrl, fields);
                    break;

                case 'patch':
                    /* subscriber = this.appService.http.patch(this.config.params.submitUrl, fields, this.item._etag); */
                    break;

                case 'delete':
                    subscriber = this.appService.http.delete(this.config.params.submitUrl);
                    break;

                case 'get':

                    break;
            }
            if (subscriber) {
                if (this._subscriptions.submit) this._subscriptions.submit.unsubscribe();
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
     * @memberof MpForm
     */
    protected _onSuccesSubmit(data: any): void {
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
     * @memberof MpForm
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
     * @memberof MpForm
     */
    protected _setFieldsValue(data?: any): void {
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
