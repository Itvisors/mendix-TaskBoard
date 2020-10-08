export interface ItemData {
    itemId: string;
}

export interface ColumnData {
    columnId: string;
    itemArray: ItemData[];
}

export interface TaskBoardData {
    columnArray: ColumnData[];
}
