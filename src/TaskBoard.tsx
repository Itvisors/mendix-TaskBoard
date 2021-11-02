import { Component, ReactNode, createElement } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { EditableValue, ValueStatus, ObjectItem } from "mendix";

import { TaskBoardContainerProps } from "../typings/TaskBoardProps";
import { Column } from "./components/Column";
import { ColumnData, ItemData, ColumnItemData, ColumnDropTargetStatus, DropDataItem } from "./types/CustomTypes";

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

    onDragStart = (start: DragStart): void => {
        const { draggedFromColumnIdAttr } = this.props;
        // Set the column ID on the Mendix attribute, remove the prefix.
        draggedFromColumnIdAttr.setTextValue(start.source.droppableId.substr(this.COLUMN_ID_PREFIX.length));
    };

    onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        // console.info("onDragEnd dragged id " + draggableId);

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
        const { droppedItemIdAttr, droppedOnColumnIdAttr, dropDataAttr, onDropAction } = this.props;

        // Set the sequence number on every item linked to the column. Take out the item ID prefix.
        const dropData: DropDataItem[] = [];
        columnData.itemKeyArray.forEach((itemKey, index) => {
            const seqNbr = index + 1;
            dropData.push({
                itemId: "" + itemKey.substr(this.ITEM_ID_PREFIX.length),
                seqNbr
            });
        });
        // Set the drop data on the context.
        dropDataAttr.setValue(JSON.stringify(dropData));

        // Set the dropped column ID value on the context. Take out the prefix.
        droppedOnColumnIdAttr.setTextValue(columnData.columnId.substr(this.COLUMN_ID_PREFIX.length));

        // Set the dropped item ID value on the context. Take out the prefix.
        droppedItemIdAttr.setTextValue(itemId.substr(this.ITEM_ID_PREFIX.length));

        // Call the action
        if (onDropAction) {
            // console.info("onDragEnd run onDropAction");
            if (onDropAction.canExecute) {
                onDropAction.execute();
            }
        }
    }

    render(): ReactNode {
        // console.info("TaskBoard.render");
        // Check whether event properties are writable. Common mistake to place the widget in a readonly dataview.
        if (
            this.isAttributeReadOnly("droppedItemIdAttr", this.props.droppedItemIdAttr) ||
            this.isAttributeReadOnly("droppedOnColumnIdAttr", this.props.droppedOnColumnIdAttr) ||
            this.isAttributeReadOnly("dropDataAttr", this.props.dropDataAttr)
        ) {
            return null;
        }
        const isVertical = true; // set from widget property
        const { columnWidgets, itemWidgets } = this.props;
        this.getData();
        let className = "taskBoardContainer " + this.props.class;
        if (isVertical) {
            className += " taskBoardContainerVertical";
        }
        return (
            <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
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
        const { draggedFromColumnIdAttr } = this.props;

        // Currently dragging? Then the value is set. For numeric IDs, treat zero as not set
        if (!draggedFromColumnIdAttr.value || "" + draggedFromColumnIdAttr.value === "0") {
            return "None";
        }

        const draggedFromColumnId = this.COLUMN_ID_PREFIX + draggedFromColumnIdAttr.value;

        // Always allow drop on the same column
        if (columnData.columnId === draggedFromColumnId) {
            return "Allowed";
        }

        const dragStartColumn = this.columnMap.get(draggedFromColumnId);
        if (!dragStartColumn) {
            // This should never happen but we need to tackle the situation.
            console.error("TaskBoard: Column definition not found for drag start column ID " + draggedFromColumnId);
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
        const { itemDatasource, columnDatasource, onDropAction } = this.props;

        if (itemDatasource.status !== ValueStatus.Available || columnDatasource.status !== ValueStatus.Available) {
            // console.info("TaskBoard.getData(): No data available (yet)");
            return;
        }

        // Do not load new data while drop action is executing because datasource has not yet been refreshed.
        if (onDropAction && onDropAction.isExecuting) {
            // console.info("TaskBoard.getData(): The on drop action still running, skip reload of the data");
            return;
        }

        if (!this.checkItemSequence()) {
            // console.info("TaskBoard.getData(): The items are not (yet) returned in the right sequence");
            return;
        }
        // console.info("TaskBoard.getData(): Reload of the data");

        this.columnMendixDataMap.clear();
        this.itemMendixDataMap.clear();
        this.itemMap.clear();
        this.columnArray = [];
        this.columnIndexMap.clear();

        this.getColumnData();
        this.getItemData();
    }

    checkItemSequence(): boolean {
        const { itemDatasource, itemSeqNbrAttr } = this.props;

        if (!itemDatasource.items) {
            return false;
        }

        let checkSeqNbr = 0;
        let result = true;
        // The datasource can be out of sequence after a drop. If the sequence numbers are out of order, skip loading the data.
        // Note that multiple items can have the same sequence number if they are in different columns.
        for (const itemObject of itemDatasource.items) {
            const seqNbr = Number(itemSeqNbrAttr.get(itemObject).value);
            if (seqNbr >= checkSeqNbr) {
                checkSeqNbr = seqNbr;
                // console.info("TaskBoard.checkItemSequence: SeqNbr " + seqNbr + " in sequence");
            } else {
                result = false;
                // console.info("TaskBoard.checkItemSequence: SeqNbr " + seqNbr + " out of sequence");
            }
        }
        return result;
    }

    getColumnData(): void {
        const { columnDatasource, columnIdAttr, allowedDropColumnsAttr } = this.props;

        if (!columnDatasource.items) {
            return;
        }

        // We need a column array as well as a column map. So write the column data object to an array and a map.
        this.columnArray = columnDatasource.items.map(columnObject => {
            const columnId = this.COLUMN_ID_PREFIX + columnIdAttr.get(columnObject).value;

            // Save Mendix object to map for easy access.
            this.columnMendixDataMap.set(columnId, columnObject);

            // Create column data object;
            const columnData: ColumnData = {
                columnId,
                itemKeyArray: [],
                allowedDropColumnKeyArray: []
            };

            // Drop allowed on specific columns only?
            const allowedDropColumnsAttrValue = allowedDropColumnsAttr.get(columnObject).value;
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
        const { itemDatasource, itemIdAttr, itemSeqNbrAttr, linkedToColumnIdAttr, itemIsDragDisabledAttr } = this.props;

        if (!itemDatasource.items) {
            return;
        }

        for (const itemObject of itemDatasource.items) {
            const itemId = this.ITEM_ID_PREFIX + itemIdAttr.get(itemObject).value;

            // Save Mendix object to map for easy access.
            this.itemMendixDataMap.set(itemId, itemObject);

            // Create item data object
            const itemData: ItemData = {
                itemId,
                seqNbr: Number(itemSeqNbrAttr.get(itemObject).value),
                isDragDisabled: itemIsDragDisabledAttr ? itemIsDragDisabledAttr.get(itemObject).value : false
            };

            // Save it in the map
            this.itemMap.set(itemId, itemData);

            // If item is linked to a column, add item id to column item key array.
            const linkedToColumnIdAttrValue = linkedToColumnIdAttr.get(itemObject).value;
            if (linkedToColumnIdAttrValue) {
                const columnId = this.COLUMN_ID_PREFIX + linkedToColumnIdAttrValue;
                const columnData = this.columnMap.get(columnId);
                if (columnData) {
                    columnData.itemKeyArray.push(itemId);
                }
            }
        }
    }

    isAttributeReadOnly(propName: string, prop: EditableValue): boolean {
        if (!prop) {
            return false;
        }
        if (prop.status !== "available") {
            return false;
        }
        if (prop.readOnly) {
            console.warn("NativeDraggableList: Property " + propName + " is readonly");
        }
        return prop.readOnly;
    }
}
