import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { MetaService } from './meta.service';
import { NotificationService } from './notification.service';
import { ITERATE } from '../utils/modify-object.functions';
import { HttpService } from './http.service';
import { ScrollService } from './scroll.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    protected _subscriptions: any = {};

    protected _lang = 'cs';

    tab$: Observable<Event> = fromEvent(document, 'visibilitychange');

    /**
     * Creates an instance of AppService.
     * @param {Router} router
     * @param {Location} location
     * @param {MetaService} meta
     * @param {NotificationService} notification
     * @param {HttpService} http
     * @param {ScrollService} scroll
     * @memberof AppService
     */
    constructor(
        public readonly router: Router,
        public readonly location: Location,
        public readonly meta: MetaService,
        public readonly notification: NotificationService,
        public readonly http: HttpService,
        public readonly scroll: ScrollService,
        public readonly translate: TranslateService
    ) {
        this.translate.setDefaultLang(this._lang);
        this._listenTab();
    }

    /**
     * Destroy - funkce ktera se spusti pred odstranenim daneho objektu
     *
     * @memberof AppService
     */
    ngOnDestroy(): void {
        ITERATE(this._subscriptions, (subscriber: Subscription) => {
            if (subscriber) subscriber.unsubscribe();
        });
    }

    /**
     * Odposlouchava prepinani tabu v prohlizeci
     *
     * @protected
     * @memberof AppService
     */
    protected _listenTab(): void {
        if (this._subscriptions.tab) this._subscriptions.tab.unsubscribe();
        this._subscriptions.tab = this.tab$.subscribe(data => {

        });
    }

    /* =================================================================================================== */

    /**
     * Vygeneruje libovony formular
     *
     * @param {*} attributes
     * @param {any[]} [params]
     * @returns {*}
     * @memberof AppService
     */
    generateForm(attributes: any, params?: any[]): any {
        const form = document.createElement('form');
        // vytvoreni atributu formularu
        ITERATE(attributes, (value: any, name: any) => form.setAttribute(name, value));
        if (!form.hasAttribute('method')) form.setAttribute('method', 'post');
        if (!form.hasAttribute('target')) form.setAttribute('target', '_blank');
        // vytvoreni jednotlivych fieldu
        if (params) {
            params.map(field => {
                const input = document.createElement('input');
                ITERATE(field, (value: any, name: any) => input.setAttribute(name, value));
                if (!input.hasAttribute('type')) input.setAttribute('type', 'hidden');
                form.append(input);
            });
        }
        // vlozi do body
        document.getElementsByTagName('body')[0].append(form);
        return form;
    }
}
