import { Component, ReactNode, createElement } from "react";
import { ColumnData } from "../types/CustomTypes";
import { Item } from "./Item";

export interface ColumnProps {
    data: ColumnData;
}

export class Column extends Component<ColumnProps> {
    render(): ReactNode {
        return (
            <div className="taskBoardColumn taskBoardColumnVertical">
                <span>{this.props.data.columnId}</span>
                <div className="taskBoardItemList taskBoardItemListVertical">
                    {this.props.data.itemArray.map(itemData => {
                        return <Item key={itemData.itemId} data={itemData} />;
                    })}
                </div>
            </div>
        );
    }
}
