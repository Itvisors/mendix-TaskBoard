# TaskBoard
Create taskboards or similar lists with items, allowing the user to drag the items to reorder them and move the items between columns.

Wrapper around [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

# Features
- Flexible number of columns.
- Set your own content for the column header and the items.
- Block items from being dragged. 
- Clearly visible where you're dragging from and to.
- Configure where items can be moved to.
- Visual feedback on allowed drop targets.
- Automatically scroll the page where necessary.

An item can be blocked from being dragged, note that other items that are dragged in or to the same column still can cause the order to be changed.

# Limitations
- Unfortunately it is not yet possible for the widget to update the datasource item data directly. 

# Ordering columns and items

## Colums
The widget will render the columns in the order they appear in the datasource. Sorting on their name often will not be the desired result so you probably want to add a sequence number to the column and order on that.

## Items
The item entity must have a sequence number to store the item sequence after dragging the items. The item datasource must order the items on sequence number. Note that sequence numbers are unique within one column only.

# Usage
- Make sure you have some unique identifier on your column and item entities.
- Configure the column datasource.
- Configure the item datasource. Make sure the items are returned sorted on the sequence number.
- Configure the action to handle the drop. 
- Set the sequence numbers of the items using the passed JSON data. Check the sample project for an example of this logic.
- After handling the drop, clear the ID values and drop data on the context.

# Preventing flickering
Calling the drop action is asynchronous. In first versions of the widget, the dropped items would briefly be visible at the old position while the drop action (your microflow) was running. To fix this, the widget stores the ID of the source column in the context. The drop action **must** clear this value. For numeric IDs, zero is treated as empty. If the dragged from column ID is not cleared, the columns will still show as valid or invalid drop target.

# Page layout
The widget can handle scrolling the list during the drag, but only if the page uses a layout without scroll container. Regular layouts have a scroll container, preventing the widget from taking control of scrolling.

# CSS classes
The widget renders a div with class taskBoardContainer that contains the columns. This div will also have any classes set on the widget in Mendix.

By default cell values are centered.

## Classes used by the widget
| Class                         | Description |
|-------------------------------|-
| taskBoardContainer            | The div around the columns
| taskBoardContainerVertical    | For displaying items vertically, colums side by side
| taskBoardColumn               | One column
| taskBoardColumnVertical       | For displaying items vertically, colums side by side
| taskBoardItemList             | The item list in a container
| taskBoardItemListVertical     | For displaying items vertically, colums side by side
| taskBoardItem                 | One item
| columnDropStatusNone          | When no drag is active
| columnDropStatusAllowed       | Drag active, allowed to drop on this column
| columnDropStatusNotAllowed    | Drag active, not allowed to drop on this column
| taskBoardItemListDraggingOver | When dragging an item over the list
| taskBoardItemListDraggingFrom | The list the item came from, when dragging it over another column
| taskBoardItemDragging         | Additional styling for an item that is being dragged
| taskBoardItemDragDisabled     | Additional styling for an item that may not be dragged


# Sample project
Check out the sample project for a working task board.

# Issues, suggestions and feature requests
https://github.com/Itvisors/mendix-TaskBoard/issues

