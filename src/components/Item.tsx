import { Component, ReactNode, createElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ItemData } from "../types/CustomTypes";

export interface ItemProps {
    itemData: ItemData;
    index: number;
}

export class Item extends Component<ItemProps> {
    render(): ReactNode {
        const isDragDisabled = false;
        return (
            <Draggable
                draggableId={this.props.itemData.itemId}
                index={this.props.index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => {
                    let className = "taskBoardItem";
                    if (snapshot.isDragging) {
                        className += " taskBoardItemDragging";
                    }
                    if (this.props.itemData.isDragDisabled) {
                        className += " taskBoardItemDragDisabled";
                    }
                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={className}
                        >
                            <span>{this.props.itemData.itemId}</span>
                        </div>
                    );
                }}
            </Draggable>
        );
    }
}
