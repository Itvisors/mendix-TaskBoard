import { ReactElement, createElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnData, ColumnDropTargetStatus, ColumnItemData } from "../types/CustomTypes";
import { Item } from "./Item";
import { ListWidgetValue, ObjectItem } from "mendix";

export interface ColumnProps {
    columnData: ColumnData;
    columnMendixObject: ObjectItem | undefined;
    items: ColumnItemData[];
    columnDropStatus: ColumnDropTargetStatus;
    isVertical: boolean;
    columnWidgets: ListWidgetValue;
    itemWidgets: ListWidgetValue;
}

export function Column(props: ColumnProps): ReactElement {
    const { columnMendixObject } = props;
    let columnClassName = "taskBoardColumn + columnDropStatus" + props.columnDropStatus;
    if (props.isVertical) {
        columnClassName += " taskBoardColumnVertical";
    }
    return (
        <div className={columnClassName} data-columnid={props.columnData.columnId}>
            <div className="taskBoardColumnHeader">
                {columnMendixObject && props.columnWidgets.get(columnMendixObject)}
            </div>
            <Droppable droppableId={props.columnData.columnId} isDropDisabled={props.columnDropStatus === "NotAllowed"}>
                {(provided, snapshot) => {
                    let itemListClassName = "taskBoardItemList";
                    if (props.isVertical) {
                        itemListClassName += " taskBoardItemListVertical";
                    }
                    if (snapshot.isDraggingOver) {
                        itemListClassName += " taskBoardItemListDraggingOver";
                    } else if (snapshot.draggingFromThisWith) {
                        itemListClassName += " taskBoardItemListDraggingFrom";
                    }
                    return (
                        <div className={itemListClassName} ref={provided.innerRef} {...provided.droppableProps}>
                            {props.items.map((columnItemData, index) => {
                                return (
                                    <Item
                                        key={columnItemData.itemData.itemId}
                                        columnItemData={columnItemData}
                                        index={index}
                                        itemWidgets={props.itemWidgets}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
}
