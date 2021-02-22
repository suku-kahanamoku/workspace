import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ITERATE } from '../utils/modify-object.functions';
import { IS_DEFINED, IS_OBJECT_ID } from '../utils/check-basic.functions';
import { Configurable } from '../abstracts/configurable.abstract';

/**
 *
 *
 * @export
 * @class NotificationService
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    /**
     * Subscription - pripojena komunikace s backendem, appkou, ...
     *
     * @protected
     * @type {*}
     * @memberof NotificationService
     */
    protected _subscriptions: any = {};

    /**
     * Fronta s texty, komponenty nebo sablonami
     *
     * @protected
     * @type {INotification[]}
     * @memberof NotificationService
     */
    protected _queue: INotification[] = [];
    readonly snackbar: any;
    readonly alert: any;

    /**
     * Creates an instance of NotificationService.
     * 
     * @param {HttpClient} _http
     * @param {*} snackbar
     * @param {*} alert
     * @memberof NotificationService
     */
    constructor(
        protected _http: HttpClient
    ) {
        this._startNextRequest()
    }

    /**
     * Destroy
     *
     * @memberof NotificationService
     */
    ngOnDestroy(): void {
        ITERATE(this._subscriptions, (subscriber: Subscription) => {
            if (subscriber) subscriber.unsubscribe();
        });
    }

    /**
     * Nacte data z notification
     *
     * @param {string} idSyscode
     * @param {Function} [callback]
     * @memberof NotificationService
     */
    load(idSyscode: string, callback?: Function): void {
        if (idSyscode) {
            let url = '/_/v1/NotificationService';
            if (IS_OBJECT_ID(idSyscode)) {
                url += `/${idSyscode}`;
            } else {
                url += `?where={"_syscode":"${idSyscode}"}`;
            }
            if (this._subscriptions[idSyscode]) this._subscriptions[idSyscode].unsubscribe();
            this._subscriptions[idSyscode] = this._http.get(url)
                .pipe(
                    filter(data => IS_DEFINED(data))
                )
                .subscribe(data => {
                    this.set(data);
                    if (callback) callback(data);
                });
        }
    }

    /**
     * Nastavi notifikace pro zobrazeni
     *
     * @param {*} notifications
     * @param {*} [options]
     * @memberof NotificationService
     */
    set(notifications: any): void {
        if (notifications) {
            if (Array.isArray(notifications))
                notifications.map(item => this.add(item.rawData, item.params, item.vtype, item.state));
            else
                this.add(notifications.rawData, notifications.params, notifications.vtype, notifications.state);
        }
    }

    /**
     * Vlozi do fronty a spusti frontu
     *
     * @param {(Configurable | TemplateRef<any> | string)} data
     * @param {*} [options={}]
     * @param {('snackbar' | 'alert')} [type]
     * @param {('success' | 'info' | 'warning' | 'danger')} [state]
     * @memberof NotificationService
     */
    add(
        data: Configurable | TemplateRef<any> | string,
        options: any = {},
        type?: 'snackbar' | 'alert',
        state?: 'success' | 'info' | 'warning' | 'danger'
    ): void {
        if (data)
            this._queue.push(
                <INotification>{ data: data, options: options, type: type, state: state }
            );
        // spusti frontu
        this._startNextRequest();
    }

    /**
     * Spusti snackbar
     *
     * @param {(Configurable | TemplateRef<any> | string)} data
     * @param {*} [options={}]
     * @param {('success' | 'info' | 'warning' | 'danger')} [state='info']
     * @memberof NotificationService
     */
    openSnackbar(
        data: Configurable | TemplateRef<any> | string,
        options: any = {},
        state: 'success' | 'info' | 'warning' | 'danger' = 'info'
    ): void {
        options = { ...{ duration: 4000 }, ...options };
        // otevre z daneho stringu
        if (typeof data === 'string') {
            /* const cmp = NotificationComponent;
            cmp.prototype.text = data;
            cmp.prototype.state = state;
            this.snackbar.openFromComponent(cmp, options); */
        }
        // otevre z dane sablony
        else if (data instanceof TemplateRef) {
            this.snackbar.openFromTemplate(data, options);
        }
        // otevre z dane komponenty
        else {
            this.snackbar.openFromComponent(<any>data, options);
        }
        // po kazdem zavreni se znovu spusti fronta
        if (this._subscriptions.afterCloseSnack) this._subscriptions.afterCloseSnack.unsubscribe();
        this._subscriptions.afterCloseSnack = this.snackbar._openedSnackBarRef && this.snackbar._openedSnackBarRef.afterDismissed()
            .subscribe(this._startNextRequest.bind(this));
    }

    /**
     * Zavre snackbar
     *
     * @memberof NotificationService
     */
    closeSnackbar(): void {
        if (this.snackbar._openedSnackBarRef) {
            this.snackbar._openedSnackBarRef.dismiss();
        }
    }

    /**
     * Otevre alert
     *
     * @param {*} data
     * @param {MatBottomSheetConfig} [options={}]
     * @param {('success' | 'info' | 'warning' | 'danger')} [type='danger']
     * @memberof NotificationService
     */
    openAlert(
        data: any,
        options: any = {},
        state: 'success' | 'info' | 'warning' | 'danger' = 'danger'
    ): void {
        if (typeof data === 'string') {
            /* const cmp = NotificationComponent;
            cmp.prototype.text = data;
            cmp.prototype.state = state;
            this.alert.open(cmp, options); */
        } else {
            this.alert.open(data, options);
        }
        // po kazdem zavreni se znovu spusti fronta
        if (this._subscriptions.aflterCloseAlert) this._subscriptions.aflterCloseAlert.unsubscribe();
        this._subscriptions.aflterCloseAlert = this.alert._openedBottomSheetRef && this.alert._openedBottomSheetRef.afterDismissed()
            .subscribe(this._startNextRequest.bind(this));
    }

    /**
     * Zavre alert
     *
     * @param {*} [data]
     * @memberof NotificationService
     */
    closeAlert(data?: any): void {
        if (this.alert._openedBottomSheetRef) {
            this.alert._openedBottomSheetRef.dismiss(data);
        }
    }

    /**
     * Otevre notifikaci a odebere z fronty
     *
     * @protected
     * @param {INotification} notification
     * @memberof NotificationService
     */
    protected _execute(notification: INotification): void {
        switch (notification.type) {
            case 'alert':
                if (!this.alert._openedBottomSheetRef) {
                    this.openAlert(notification.data, notification.options, notification.state);
                    this._queue.shift();
                }
                break;

            default:
                if (!this.snackbar._openedSnackBarRef) {
                    this.openSnackbar(notification.data, notification.options, notification.state);
                    this._queue.shift();
                }
                break;
        }
    }

    /**
     * Spusti dalsi notifikaci z fronty
     *
     * @protected
     * @memberof NotificationService
     */
    protected _startNextRequest(): void {
        if (this._queue.length > 0) this._execute(this._queue[0]);
    }

}

/**
 * Interface pro notifikaci
 *
 * @interface INotification
 */
interface INotification {
    data: Configurable | TemplateRef<any> | string;
    options?: any;
    type: 'snackbar' | 'alert';
    state: 'success' | 'info' | 'warning' | 'danger';
}
