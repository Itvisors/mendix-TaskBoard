import { Component, ReactNode, createElement } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { ValueStatus, ObjectItem } from "mendix";

import { TaskBoardContainerProps } from "../typings/TaskBoardProps";
import { Column } from "./components/Column";
import { ColumnData, ItemData, ColumnItemData, ColumnDropTargetStatus } from "./types/CustomTypes";

import "./ui/TaskBoard.css";

export default class TaskBoard extends Component<TaskBoardContainerProps> {
    private columnMendixDataMap = new Map<string, ObjectItem>();
    private itemMendixDataMap = new Map<string, ObjectItem>();
    private itemMap = new Map<string, ItemData>();
    private columnArray: ColumnData[] = [];
    private columnMap = new Map<string, ColumnData>();
    private columnIndexMap = new Map<string, number>();

    private COLUMN_ID_PREFIX = "col-";
    private ITEM_ID_PREFIX = "item-";

    readonly state = { dragStartColumnId: "" };

    onDragStart = (start: DragStart): void => {
        const dragStartColumn = this.columnMap.get(start.source.droppableId);
        this.setState({ dragStartColumnId: dragStartColumn?.columnId });
    };

    onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        // No destination, dropped elsewhere, so it is an invalid drop, ignore
        if (!destination) {
            return;
        }

        // If dropped at same position, no need to persist that change
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Retrieve the start and finish columns from the state
        const startIndex = this.columnIndexMap.get(source.droppableId);
        const finishIndex = this.columnIndexMap.get(destination.droppableId);
        if (startIndex === undefined || finishIndex === undefined) {
            return;
        }
        const start = this.columnArray[startIndex];
        const finish = this.columnArray[finishIndex];

        // Take the element from the start array
        start.itemKeyArray.splice(source.index, 1);

        if (start.columnId === finish.columnId) {
            // Moving within the same column
            start.itemKeyArray.splice(destination.index, 0, draggableId);
            this.processDropResult(draggableId, start);
        } else {
            // Moving from one column to another
            finish.itemKeyArray.splice(destination.index, 0, draggableId);
            this.processDropResult(draggableId, finish);
        }
    };

    processDropResult(itemId: string, columnData: ColumnData): void {
        const { columnIdAttr, itemSeqNbrAttr, droppedOnColumnIdAttr, onDropAction } = this.props;

        // Set the sequence number on every item linked to the column.
        columnData.itemKeyArray.forEach((itemKey, index) => {
            const itemMendixObject = this.itemMendixDataMap.get(itemKey);
            if (itemMendixObject) {
                const seqNbr = index + 1;
                itemSeqNbrAttr(itemMendixObject).setTextValue("" + seqNbr);
            }
        });

        // Set the dropped column ID value on the context.
        // As we use prefixes on the IDs to make sure they are strings, get the actual value from the Mendix object
        const columnMendixObject = this.columnMendixDataMap.get(columnData.columnId);
        if (columnMendixObject) {
            const columnIdValue = columnIdAttr(columnMendixObject);
            droppedOnColumnIdAttr.setTextValue("" + columnIdValue.value);
        }

        // Call the action on the dropped item
        const droppedItemMendixObject = this.itemMendixDataMap.get(itemId);
        if (droppedItemMendixObject && onDropAction) {
            const onDropActionForObject = onDropAction(droppedItemMendixObject);
            if (onDropActionForObject.canExecute) {
                onDropActionForObject.execute();
            }
        }
        this.setState({ dragStartColumnId: null });
    }

    render(): ReactNode {
        console.info("render");
        const isVertical = true; // set from widget property
        const { columnWidgets, itemWidgets } = this.props;
        this.getData();
        let className = "taskBoardContainer " + this.props.class;
        if (isVertical) {
            className += " taskBoardContainerVertical";
        }
        return (
            <DragDropContext /* onDragStart={this.onDragStart} */ onDragEnd={this.onDragEnd}>
                <div className={className}>
                    {this.columnArray.map(columnData => {
                        return (
                            <Column
                                key={columnData.columnId}
                                columnData={columnData}
                                columnMendixObject={this.columnMendixDataMap.get(columnData.columnId)}
                                items={this.getItems(columnData)}
                                columnDropStatus={this.getColumnDropTargetStatus(columnData)}
                                isVertical={isVertical}
                                columnWidgets={columnWidgets}
                                itemWidgets={itemWidgets}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        );
    }

    getItems(columnData: ColumnData): ColumnItemData[] {
        const items: ColumnItemData[] = [];
        // A simple itemKeyArray.map() will not work with TypeScript because it complains about possible undefined values.
        // So a bit more old school
        for (const itemKey of columnData.itemKeyArray) {
            const itemData = this.itemMap.get(itemKey);
            const itemMendixObject = this.itemMendixDataMap.get(itemKey);
            if (itemData && itemMendixObject) {
                items.push({
                    itemData,
                    itemMendixObject
                });
            }
        }
        return items;
    }

    getColumnDropTargetStatus(columnData: ColumnData): ColumnDropTargetStatus {
        const { dragStartColumnId } = this.state;

        // Currently dragging? Then the value is set.
        if (!dragStartColumnId) {
            return "None";
        }

        // Always allow drop on the same column
        if (columnData.columnId === dragStartColumnId) {
            return "Allowed";
        }

        const dragStartColumn = this.columnMap.get(dragStartColumnId);
        if (!dragStartColumn) {
            // This should never happen but we need to tackle the situation.
            console.error("TaskBoard: Column definition not found for drag start column ID " + dragStartColumnId);
            return "NotAllowed";
        }

        if (dragStartColumn.allowedDropColumnKeyArray.length === 0) {
            return "Allowed";
        }

        if (
            dragStartColumn.allowedDropColumnKeyArray.findIndex(allowedDropColumnId => {
                return allowedDropColumnId === columnData.columnId;
            }) >= 0
        ) {
            return "Allowed";
        } else {
            return "NotAllowed";
        }
    }

    getData(): void {
        const { itemDatasource, columnDatasource } = this.props;

        if (itemDatasource.status !== ValueStatus.Available || columnDatasource.status !== ValueStatus.Available) {
            return;
        }

        this.columnMendixDataMap.clear();
        this.itemMendixDataMap.clear();
        this.itemMap.clear();
        this.columnArray = [];
        this.columnIndexMap.clear();

        this.getColumnData();
        this.getItemData();
    }

    getColumnData(): void {
        const { columnDatasource, columnIdAttr, allowedDropColumnsAttr } = this.props;

        if (!columnDatasource.items) {
            return;
        }

        // We need a column array as well as a column map. So write the column data object to an array and a map.
        this.columnArray = columnDatasource.items.map(columnObject => {
            const columnId = this.COLUMN_ID_PREFIX + columnIdAttr(columnObject).value;

            // Save Mendix object to map for easy access.
            this.columnMendixDataMap.set(columnId, columnObject);

            // Create column data object;
            const columnData: ColumnData = {
                columnId,
                itemKeyArray: [],
                allowedDropColumnKeyArray: []
            };

            // Drop allowed on specific columns only?
            const allowedDropColumnsAttrValue = allowedDropColumnsAttr(columnObject).value;
            if (allowedDropColumnsAttrValue) {
                const allowedDropColumnIds = allowedDropColumnsAttrValue.split("|");
                for (const allowedDropColumnId of allowedDropColumnIds) {
                    columnData.allowedDropColumnKeyArray.push(this.COLUMN_ID_PREFIX + allowedDropColumnId);
                }
            }

            // Save it in the map too.
            this.columnMap.set(columnId, columnData);

            return columnData;
        });

        // Build map of key to array index.
        this.columnArray.forEach((columnData, index) => {
            this.columnIndexMap.set(columnData.columnId, index);
        });
    }

    getItemData(): void {
        const { itemDatasource, itemIdAttr, linkedToColumnIdAttr, itemIsDragDisabledAttr } = this.props;

        if (!itemDatasource.items) {
            return;
        }

        for (const itemObject of itemDatasource.items) {
            const itemId = this.ITEM_ID_PREFIX + itemIdAttr(itemObject).value;

            // Save Mendix object to map for easy access.
            this.itemMendixDataMap.set(itemId, itemObject);

            // Create item data object
            const itemData: ItemData = {
                itemId,
                isDragDisabled: itemIsDragDisabledAttr ? itemIsDragDisabledAttr(itemObject).value : false
            };

            // Save it in the map
            this.itemMap.set(itemId, itemData);

            // If item is linked to a column, add item id to column item key array.
            const linkedToColumnIdAttrValue = linkedToColumnIdAttr(itemObject).value;
            if (linkedToColumnIdAttrValue) {
                const columnId = this.COLUMN_ID_PREFIX + linkedToColumnIdAttrValue;
                const columnData = this.columnMap.get(columnId);
                if (columnData) {
                    columnData.itemKeyArray.push(itemId);
                }
            }
        }
    }
}
