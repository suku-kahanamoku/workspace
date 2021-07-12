import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NotificationService } from './notification.service';
import { RTRIM, TRIM } from '../utils/modify-string.functions';
import { IS_DEFINED, IS_NUMERIC, IS_OBJECT } from '../utils/check-basic.functions';
import { ITERATE, STRINGIFY } from '../utils/modify-object.functions';

/**
 * Service pro komunikaci s endpointama
 *
 * @export
 * @class HttpService
 */
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    /**
     * Creates an instance of HttpService.
     * @param {HttpClient} _http
     * @param {MpAuthService} _auth
     * @memberof HttpService
     */
    constructor(
        protected _http: HttpClient,
        protected _notification: NotificationService
    ) { }

    /**
     * Libovolny get bez hlavicek
     *
     * @param {string} url
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    get(url: string, options?: any): Observable<any> {
        return this._http.get(TRIM(TRIM(url, '&'), '/'), options)
            .pipe(filter(data => IS_DEFINED(data)));
    }

    /**
     * Post kamkoliv
     *
     * @param {string} url
     * @param {*} params
     * @param {*} [options={}]
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    post(url: string, params: any, options: any = {}): Observable<any> {
        return this._http.post(TRIM(TRIM(url, '&'), '/'), params, this.getHttpHeaders(options)).pipe(
            tap((data: any) => this._notification.set(data._notifications)),
        );
    }

    /**
     * Put kamkoliv
     *
     * @param {string} url
     * @param {*} params
     * @param {*} [options={}]
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    put(url: string, params: any, options: any = {}): Observable<any> {
        return this._http.put(TRIM(TRIM(url, '&'), '/'), params, this.getHttpHeaders(options)).pipe(
            tap((data: any) => this._notification.set(data._notifications)),
        );
    }

    /**
     * Patch kamkoliv
     *
     * @param {string} url
     * @param {*} params
     * @param {string} etag
     * @param {*} [options={}]
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    patch(url: string, params: any, etag: string, options: any = {}): Observable<any> {
        options = { ...{ 'If-Match': etag }, ...options };
        return this._http.patch(TRIM(TRIM(url, '&'), '/'), params, this.getHttpHeaders(options)).pipe(
            tap((data: any) => this._notification.set(data._notifications)),
        );
    }

    /**
     * Delete kamkoliv
     *
     * @param {string} url
     * @param {*} [options={}]
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    delete(url: string, options: any = {}): Observable<any> {
        return this._http.delete(TRIM(TRIM(url, '&'), '/'), this.getHttpHeaders(options)).pipe(
            tap((data: any) => this._notification.set(data._notifications)),
        );
    }

    /**
     * Query dotaz na server nebo kamkoliv
     * - zpracuje zadane url a vrati jeji vysledek
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     * @memberof HttpService
     */
    load(url: string, options?: any): Observable<any> {
        return this.get(url).pipe(
            tap((data: any) => this._notification.set(data._notifications)),
        );
    }

    /* =================================================================================================== */

    /**
     * Vytvori parametru napr. where, sort, ...
     *
     * @param {*} [params={}]
     * @param {string} [url='']
     * @returns {string}
     * @memberof HttpService
     */
    createParams(params: any = {}, url: string = ''): string {
        url = RTRIM(url, '/');
        if (params) {
            const where = this._generateWhere(params);
            if (where) url += this.getMarker(url) + `where={${where}}`;
            //
            const filter = this._generateFilters(params);
            if (filter) url += this.getMarker(url) + filter;
            //
            const pagination = this._generatePagination(params);
            if (pagination) url += this.getMarker(url) + pagination;
        }
        return TRIM(TRIM(url, '&'), '?');
    }

    /**
     * Vytvori parametry napr. sort, projection, fakctory, ...
     *
     * @protected
     * @param {*} [params={}]
     * @returns {string}
     * @memberof HttpService
     */
    protected _generateFilters(params: any = {}): string {
        const filters: string[] = [];
        ITERATE(params, (value: any, key: any) => {
            if (IS_DEFINED(value) && IS_DEFINED(key)) {
                switch (key) {
                    case 'sortAttrs':
                        filters.push(this._createSortParams(params));
                        break;
                    case 'includeParent':
                        filters.push(key + '=' + (+value));
                        break;
                    case 'projection':
                        if (Object.keys(value).length) filters.push(key + '=' + STRINGIFY(value));
                        break;
                    case 'factory':
                        if (value.length) filters.push(key + `=[${value}]`);
                        break;
                }
            }
        });
        return filters.join('&');
    }

    /**
     * Vytvori strankovaci parametry
     *
     * @protected
     * @param {*} [params={}]
     * @returns {string}
     * @memberof HttpService
     */
    protected _generatePagination(params: any = {}): string {
        const filters = [];
        // je zaple strankovani, tak posle na backend dotaz s filtraci
        if (params.enablePaging) {
            filters.push('page=' + params.page);
            filters.push('max_results=' + params.itemsPerPage);
        }
        // neni zaple strankovani, posle se jen max_results
        else if (params.maxItems) {
            filters.push('max_results=' + params.maxItems);
        }
        return filters.join('&');
    }

    /**
     * Vytvori where parametry
     *
     * @protected
     * @param {*} [params={}]
     * @returns {string}
     * @memberof HttpService
     */
    protected _generateWhere(params: any = {}): string {
        const query: string[] = [];
        ITERATE(params, (item: any, key: any) => {
            // TODO - kontrola na filter jen prozatimni, nez se vyresi co s tim
            if (IS_DEFINED(item) && IS_DEFINED(key) && key !== 'filter') {
                // napr. params.maxLevel => "maxLevel": 5
                if (['maxLevel'].indexOf(key) >= 0) {
                    query.push(`"${key}":${item}`);
                }
                // {condition:$in,value:hodnota}
                else if (item.hasOwnProperty('condition') && item.hasOwnProperty('value')) {
                    let value;
                    switch (item.condition) {
                        // {condition:$lt,value:50}
                        case '$gt':
                        case '$lt':
                        case '$gte':
                        case '$lte':
                            value = `"${item.condition}":${this._getValue(item.value)}`;
                            break;
                        // {condition:$or,value:[{condition:$lt,value:50},{condition:$gte,value:10}]}
                        case '$or':
                        case '$and':
                        case '$not':
                        case '$nor':
                            value = `"${item.condition}":[{${this._generateWhere(item.value)}}]`;
                            break;
                        // {condition:$ne,value:'aaa'}
                        case '$ne':
                        case '$regex':
                            if (item.options)
                                value = `"${key}":{"${item.condition}":"${item.value}", "$options": "${item.options}"}`;
                            else
                                value = `"${key}":{"${item.condition}":"${item.value}"}`;
                            break;
                        // ostatni
                        default:
                            // {condition:$in,value:['a','b','c']}
                            if (Array.isArray(item.value))
                                value = `"${key}":{"${item.condition}":["${item.value.join('","')}"]}`;
                            // {condition:$eq,value:'aaa'}
                            else
                                value = `"${key}":${this._getValue(item.value, item.type)}`;
                            break;
                    }
                    // nakonec hodnotu vlozi do pole
                    if (value) query.push(value);
                }
                //
                else if ((Array.isArray(item) && item.length) || (IS_OBJECT(item) && Object.keys(item).length)) {
                    const value = this._generateWhere(item);
                    if (value) {
                        if (IS_NUMERIC(key))
                            query.push(`${value}`);
                        else
                            query.push(`"${key}":{${value}}`);
                    }
                }
            }
        });
        return query.length ? query.filter(item => IS_DEFINED(item)).join(',') : '';
    }

    /**
     * Vrati spravnou hodnotu, tzn. pokud je to retezec vrati v uvozovkach
     *
     * @protected
     * @param {(string | number)} value
     * @returns {(string | number)}
     * @memberof HttpService
     */
    protected _getValue(value: string | number, type?: string): string | number {
        if (type && type.toLocaleLowerCase().indexOf('string') >= 0) {
            return `"${value}"`;
        } else {
            return IS_NUMERIC(value) ? `${value}` : `"${value}"`;
        }
    }

    /**
     * Vytvori sort query pro url dotaz
     *
     * @protected
     * @param {*} [params={}]
     * @returns {string}
     * @memberof HttpService
     */
    protected _createSortParams(params: any = {}): string {
        let url = '';
        // prepise sort, pac se casem bude rusit viz vyse
        if (params.sortAttrs) {
            let sortAttrs = '';
            params.sortAttrs.map((item: any, index: any) => {
                sortAttrs += '(';
                sortAttrs += item.charAt(0) === '-'
                    // zaporny item - opacne razeni
                    ? `"${item.substr(1)}",-1`
                    // normalni razeni
                    : `"${item}",1`;
                sortAttrs += '),';
            });
            url += `sort=[${RTRIM(sortAttrs, ',')}]`;
        }
        return url;
    }

    /**
     * Vrati ? nebo & znacku
     *
     * @param {*} value
     * @returns string
     * @memberof HttpService
     */
    getMarker = (value: string): string => value.indexOf('?') < 0 ? '?' : '&'

    /**
     * Vrati hlavicku (request)
     *
     * @param {*} [params={}]
     * @returns
     * @memberof HttpService
     */
    getHttpHeaders(params: any = {}) {
        /* const token = this._localStorage.getItem(this._localStorage.CUSTOM_ITEMS.token)[0];
        if (token) {
            params['Content-Type'] = 'application/json';
            params['Authorization'] = `Bearer ${token}`;
        } */
        return {
            headers: new HttpHeaders(params)
        };
    }

}
