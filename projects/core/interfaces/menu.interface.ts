import { IItem } from "./item.interface";

export interface IMenu extends IItem {
    cmp?: string;
    module?: string;
    redirectTo?: string;
    url: string;
    parentId?: string;
}