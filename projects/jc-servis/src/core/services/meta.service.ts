import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ITERATE } from '../utils/modify-object.functions';

/**
 * Service, ktera obsluhuje html > head > meta tagy
 *
 * @export
 * @class MetaService
 * @implements {OnDestroy}
 */
@Injectable({
    providedIn: 'root'
})
export class MetaService implements OnDestroy {

    /**
     * Subscription - pripojena komunikace s backendem, appkou, ...
     *
     * @protected
     * @type {*}
     * @memberof MetaService
     */
    protected _subscriptions: any = {};

    /**
     * Creates an instance of MetaService.
     * @param {Meta} _metaService
     * @param {Title} _titleService
     * @memberof MetaService
     */
    constructor(
        protected _metaService: Meta,
        protected _titleService: Title
    ) { }

    /**
     * Destroy - funkce ktera se spusti pred odstranenim daneho objektu
     *
     * @memberof MetaService
     */
    ngOnDestroy(): void {
        ITERATE(this._subscriptions, (subscriber: Subscription) => subscriber.unsubscribe());
    }

    /**
     * Upravi vsechny meta tagy
     *
     * @param {*} attrs
     * @memberof MetaService
     */
    updateMeta(attrs: any): void {
        try {
            // vytvori standartni metatagy
            ITERATE(attrs, (content: string, key: string) => {
                if (typeof content === 'string' && content.trim())
                    this._metaService.updateTag({ name: key, content: content });
            });
            this._updateOpenGraph(attrs['openGraph']);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Upravi title
     *
     * @param {string} title
     * @memberof MetaService
     */
    updateTitle(title: string): void {
        try {
            this._titleService.setTitle(title);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Vytvori open graph tagy
     *
     * @protected
     * @param {IPageConfig} pageConfig
     * @memberof MetaService
     */
    protected _updateOpenGraph(attrs: any): void {
        this._resetOpenGraph();
        if (attrs) {
            if (attrs['og_active'] && attrs.og_active) {
                // odstrani se active, pac uz se vi, ze se ma og zapnout a v nizsim cyklu by se kontroloval jeji vyskyt
                delete attrs.og_active;
                ITERATE(attrs, (value: any, prop: any) => {
                    // hodnota se validuje
                    value = typeof value === 'string' ? value.trim() : value;
                    if (value && prop !== 'imageType' && prop !== 'imageHeight' && prop !== 'imageWidth') {
                        switch (prop) {

                            case 'url':
                                this._metaService.updateTag({ property: 'og:url', content: value });
                                this._metaService.updateTag({ property: 'og:type', content: 'website' });
                                break;

                            case 'fb_app_id':
                                this._metaService.updateTag({ property: 'fb:app_id', content: value });
                                break;

                            case 'image':
                                this._metaService.updateTag({ property: 'og:image', content: value });
                                if (attrs['imageType'])
                                    this._metaService.updateTag({ property: 'og:image:type', content: attrs.imageType });
                                if (attrs['imageHeight'])
                                    this._metaService.updateTag({ property: 'og:image:height', content: attrs.imageHeight });
                                if (attrs['imageWidth'])
                                    this._metaService.updateTag({ property: 'og:image:width', content: attrs.imageWidth });
                                break;

                            default:
                                this._metaService.updateTag({ property: 'og:' + prop, content: value });
                                break;

                        }
                    }
                });
            }
        }
    }

    /**
     * Zrusi vsechny openGraph tagy
     *
     * @protected
     * @memberof MetaService
     */
    protected _resetOpenGraph() {
        const ogList = this._metaService.getTags('property^="og:"');
        for (const meta of ogList) {
            this._metaService.removeTagElement(meta);
        }
    }

}
