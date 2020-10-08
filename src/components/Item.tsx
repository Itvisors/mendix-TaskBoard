import { Component, ReactNode, createElement } from "react";
import { ItemData } from "../types/CustomTypes";

export interface ItemProps {
    data: ItemData;
}

export class Item extends Component<ItemProps> {
    render(): ReactNode {
        return (
            <div className="taskBoardItem">
                <span>{this.props.data.itemId}</span>
            </div>
        );
    }
}
