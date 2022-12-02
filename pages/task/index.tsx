import { Box, Card, Flex, Group, NavLink, Paper, ScrollArea, Title } from "@mantine/core";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable, DroppableProvidedProps, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" }
];

const columnsFromBackend = {
  ["1"]: {
    name: "Requested",
    items: itemsFromBackend
  },
  ["2"]: {
    name: "To do",
    items: []
  },
  ["3"]: {
    name: "In Progress",
    items: []
  },
  ["4"]: {
    name: "Review",
    items: []
  },
  ["5"]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  console.log(JSON.stringify(columns, null, 2))

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};



export default function MyTask() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return <>
    <Flex h={100 + "vh"}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return <Box h={100 + "%"} key={columnId} p={"xs"}>
            <Title order={4}>{column.name}</Title>
            <Droppable droppableId={columnId} key={columnId} >
              {(provided, snapshot) => <Paper
                withBorder
                // bg={"gray.1"}
                p={"xs"}
                h={100 + "%"}
                w={300}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {column.items.map((item, index) =>
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {
                      (provided, snapshot) =>
                        <Box
                          mb={"xs"}
                          bg={"gray.0"}
                          p={"xs"}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </Box>}
                  </Draggable>
                )}
                {provided.placeholder}
              </Paper>}
            </Droppable>
          </Box>
        })}
      </DragDropContext>
    </Flex>
  </>
}
