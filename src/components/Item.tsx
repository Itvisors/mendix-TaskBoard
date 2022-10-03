import { ReactElement, createElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ColumnItemData } from "../types/CustomTypes";
import { ListWidgetValue } from "mendix";

export interface ItemProps {
    columnItemData: ColumnItemData;
    index: number;
    itemWidgets: ListWidgetValue;
}

export function Item({ columnItemData, index, itemWidgets }: ItemProps): ReactElement {
    return (
        <Draggable
            draggableId={columnItemData.itemData.itemId}
            index={index}
            isDragDisabled={columnItemData.itemData.isDragDisabled}
        >
            {(provided, snapshot) => {
                let className = "taskBoardItem";
                if (snapshot.isDragging) {
                    className += " taskBoardItemDragging";
                }
                if (columnItemData.itemData.isDragDisabled) {
                    className += " taskBoardItemDragDisabled";
                }
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={className}
                        data-itemid={columnItemData.itemData.itemId}
                    >
                        {itemWidgets.get(columnItemData.itemMendixObject)}
                    </div>
                );
            }}
        </Draggable>
    );
}
