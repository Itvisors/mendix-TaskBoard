import { ObjectItem } from "mendix";

export interface ItemData {
    itemId: string;
    isDragDisabled?: boolean;
}

export interface ColumnData {
    columnId: string;
    itemKeyArray: string[];
}

export interface ColumnItemData {
    itemData: ItemData;
    itemMendixObject: ObjectItem;
}
