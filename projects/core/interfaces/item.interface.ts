export interface IItem {
    _id: string;
    syscode?: string;
    params?: any;
    visible?: boolean
}

/**
 * Interface pro treeItem
 *
 * @export
 * @interface ITreeItem
 * @extends {IItem}
 */
export interface ITreeItem extends IItem {

    /**
     * Id primeho rodice
     *
     * @type {string}
     * @memberof ITreeItem
     */
    parentId?: string;

    /**
     * Potomci
     *
     * @type {ITreeItem[]}
     * @memberof ITreeItem
     */
    children?: ITreeItem[];

    /**
     * Priznak zda je item aktivni
     *
     * @type {boolean}
     * @memberof ITreeItem
     */
    isActive?: boolean;

}