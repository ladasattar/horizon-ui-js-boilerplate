import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    background: isOver ? "rgba(0, 0, 0, 0.1)" : "salmon",
    height: "100px",
    margin: "10px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}