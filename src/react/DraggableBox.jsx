import { memo, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Box } from "./Box.jsx";
import { ItemTypes } from "./ItemTypes.jsx";
import { Button } from "@/components/ui/button";

function getStyles(left, top, isDragging, zIndex) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    zIndex,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}

export const DraggableBox = memo(function DraggableBox(props) {
  const { id, title, left, top, children, zIndex } = props;
  const [trueZ, setTrueZ] = useState(zIndex);
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title, trueZ },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging, trueZ)}
      role="DraggableBox"
    >
      <Button onClick={() => setTrueZ(trueZ + 1)}>+</Button>
      <Button disabled={trueZ === 1} onClick={() => setTrueZ(trueZ - 1)}>
        -
      </Button>
      <Box title={title}>{children}</Box>
    </div>
  );
});
