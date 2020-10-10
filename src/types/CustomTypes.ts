export interface ItemData {
    itemId: string;
    isDragDisabled?: boolean;
}

export interface ColumnData {
    columnId: string;
    itemKeyArray: string[];
}

export interface TaskBoardData {
    itemMap: Map<string, ItemData>;
    columnArray: ColumnData[];
    columnIndexMap: Map<string, number>;
}
