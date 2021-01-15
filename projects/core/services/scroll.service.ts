import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

type Target = Document | Element;

/**
 * Service pro praci se scrolovanim
 *
 * @export
 * @class ScrollService
 */
@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    /**
     * Nascroluje k danemu elementu, podle hashe
     *
     * @memberof ScrollService
     */
    scrollToHash(): void {
        if (document.location.hash) this.scrollTo(decodeURI(document.location.hash));
    }

    /**
     * Nascroluje k danemu elementu
     *
     * @param {(string | HTMLElement)} element
     * @param {number} [duration=500]
     * @param {number} [offset=0]
     * @returns {Observable<any>}
     * @memberof ScrollService
     */
    scrollTo(element: string | HTMLElement, duration: number = 400, offset: number = 0): Observable<any> {
        const subject: Subject<any> = new Subject<any>();
        if (typeof element === 'string') {
            const el = document.querySelector(element as string);
            this._scrollToElement(el as HTMLElement, duration, offset, subject);
        } else if (element instanceof HTMLElement) {
            this._scrollToElement(element, duration, offset, subject);
        } else {
            subject.error('Nelze najit element');
        }
        return subject;
    }

    /**
     * Vrati pozici
     *
     * @param {Target} [node=document]
     * @returns {IScroller}
     * @memberof ScrollService
     */
    getScroll(node: Target = document, unit = '%'): IScroller {
        if (unit === '%') {
            const offset: IAxis = <IAxis>{
                x: this._getCurrentScrollX(document) / Math.max(this._getMaxScrollX(document), 1),
                y: this._getCurrentScrollY(document) / Math.max(this._getMaxScrollY(document), 1)
            };
            offset.x = Math.min(Math.max(offset.x, 0), 1) * 100;
            offset.y = Math.min(Math.max(offset.y, 0), 1) * 100;
            //
            const position: IAxis = <IAxis>{
                x: this._getCurrentScrollX(node) / Math.max(this._getMaxScrollX(node), 1),
                y: this._getCurrentScrollY(node) / Math.max(this._getMaxScrollY(node), 1)
            };
            position.x = Math.min(Math.max(position.x, 0), 1) * 100;
            position.y = Math.min(Math.max(position.y, 0), 1) * 100;
            //
            return <IScroller>{ offset: offset, position: position };
        } else {
            return <IScroller>{
                offset: <IAxis>{
                    x: this._getCurrentScrollX(document),
                    y: this._getCurrentScrollY(document)
                },
                position: <IAxis>{
                    x: this._getCurrentScrollX(node),
                    y: this._getCurrentScrollY(node)
                }
            };
        }
    }

    /**
     * Observer pro scroll
     *
     * @param {Target} [node=document]
     * @returns {Observable<number>}
     * @memberof ScrollService
     */
    getScrollAsStream(node: Target = document, unit = '%'): Observable<IScroller> {

        let stream;

        if (node instanceof Document) {

            stream = fromEvent(window, 'scroll').pipe(
                map((event: any): IScroller => this.getScroll(node, unit))
            );

        } else {

            stream = fromEvent(node, 'scroll').pipe(
                map((event: any): IScroller => this.getScroll(node, unit))
            );

        }

        return stream;

    }

    /**
     * Nascroluje k danemu elementu
     *
     * @private
     * @param {HTMLElement} el
     * @param {number} duration
     * @param {number} offset
     * @param {*} subject
     * @returns
     * @memberof ScrollService
     */
    private _scrollToElement(el: HTMLElement, duration: number, offset: number, subject: any) {
        if (el) {
            const viewportOffset = el.getBoundingClientRect();
            const offsetTop = viewportOffset.top + window.pageYOffset;
            this._doScrolling(offsetTop + offset, duration, subject);
        } else {
            subject.error('Nelze najit element');
        }
        return subject;
    }

    /**
     * Vrati aktualni pozici
     * - v ose Y
     *
     * @private
     * @param {Target} node
     * @returns {number}
     * @memberof ScrollService
     */
    private _getCurrentScrollY(node: Target): number {
        if (node instanceof Document)
            return (window.pageYOffset);
        else
            return (node.scrollTop);
    }

    /**
     * Vrati aktualni pozici
     * - v ose X
     *
     * @private
     * @param {Target} node
     * @returns {number}
     * @memberof ScrollService
     */
    private _getCurrentScrollX(node: Target): number {
        if (node instanceof Document)
            return (window.pageXOffset);
        else
            return (node.scrollLeft);
    }


    /**
     * Vrati maximalni moznou pozici, kam lze nascrolova
     * - v ose Y
     *
     * @private
     * @param {Target} node
     * @returns {number}
     * @memberof ScrollService
     */
    private _getMaxScrollY(node: Target): number {
        if (node instanceof Document) {

            const scrollHeight = Math.max(
                node.body.scrollHeight,
                node.body.offsetHeight,
                node.body.clientHeight,
                node.documentElement.scrollHeight,
                node.documentElement.offsetHeight,
                node.documentElement.clientHeight
            );

            const clientHeight = node.documentElement.clientHeight;

            return (scrollHeight - clientHeight);

        } else {

            return (node.scrollHeight - node.clientHeight);

        }
    }

    /**
     * Vrati maximalni moznou pozici, kam lze nascrolova
     * - v ose X
     *
     * @private
     * @param {Target} node
     * @returns {number}
     * @memberof ScrollService
     */
    private _getMaxScrollX(node: Target): number {
        if (node instanceof Document) {

            const scrollWidth = Math.max(
                node.body.scrollWidth,
                node.body.offsetWidth,
                node.body.clientWidth,
                node.documentElement.scrollWidth,
                node.documentElement.offsetWidth,
                node.documentElement.clientWidth
            );

            const clientWidth = node.documentElement.clientWidth;

            return (scrollWidth - clientWidth);

        } else {

            return (node.scrollWidth - node.clientWidth);

        }
    }

    /**
     * Nascroluje na danou pozici
     *
     * @private
     * @param {number} elementY
     * @param {number} duration
     * @param {Subject<any>} subject
     * @memberof ScrollService
     */
    private _doScrolling(elementY: number, duration: number, subject: Subject<any>) {
        const startingY = window.pageYOffset;
        const diff = elementY - startingY;
        let start: number;

        window.requestAnimationFrame(function step(timestamp) {
            start = (!start) ? timestamp : start;

            const time = timestamp - start;
            const percent = Math.min(time / duration, 1);

            window.scrollTo(0, startingY + diff * percent);

            if (time < duration) {
                window.requestAnimationFrame(step);
                subject.complete();
            } else {
                subject.complete();
            }
        });
    }

}

/**
 * Interface pro scroller
 *
 * @export
 * @interface IScroller
 */
export interface IScroller {

    /**
     * V jake ose se scrolluje
     *
     * @type {IAxis}
     * @memberof IScroller
     */
    offset: IAxis;

    /**
     * Na jake pozici se nachazi levy horni roh
     *
     * @type {IAxis}
     * @memberof IScroller
     */
    position: IAxis;
}

/**
 * Interface pro axis
 *
 * @export
 * @interface IAxis
 */
export interface IAxis {

    /**
     * Osa X
     *
     * @type {number}
     * @memberof IAxis
     */
    x: number;

    /**
     * Osa Y
     *
     * @type {number}
     * @memberof IAxis
     */
    y: number;
}
