import { Component, ReactNode, createElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ColumnItemData } from "../types/CustomTypes";
import { ListWidgetValue } from "mendix";

export interface ItemProps {
    columnItemData: ColumnItemData;
    index: number;
    itemWidgets: ListWidgetValue;
}

export class Item extends Component<ItemProps> {
    render(): ReactNode {
        const { columnItemData } = this.props;
        return (
            <Draggable
                draggableId={columnItemData.itemData.itemId}
                index={this.props.index}
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
                            {this.props.itemWidgets(columnItemData.itemMendixObject)}
                        </div>
                    );
                }}
            </Draggable>
        );
    }
}
