import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableBox } from "./DraggableBox.jsx";
import { ItemTypes } from "./ItemTypes.jsx";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.tsx";
import { CardBody, CardContainer, CardItem } from "./components/3dCard.tsx";
import { AuroraBackground } from "./components/AuroraBackground.tsx";

const styles = {
  width: "100vw",
  height: "100vh",
  border: "1px solid black",
  position: "relative",
};

export const Container = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState({
    a: {
      top: 20,
      left: 80,
      title: "3d card",
      zIndex: 1,
      children: (
        <CardContainer className="p-1 border-2 w-full">
          <CardBody>
            <CardItem translateZ={20}>test</CardItem>
            <CardItem translateZ={20}>testbody stuff</CardItem>
          </CardBody>
        </CardContainer>
      ),
    },
    b: {
      top: 180,
      left: 20,
      title: "aurora background",
      zIndex: 1,
      children: (
        <div className="w-screen h-screen">
          <AuroraBackground />
        </div>
      ),
    },
  });

  const moveBox = useCallback(
    (id, left, top, zIndex) => {
      const newZindex = zIndex + 1;
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
            zIndex: { $set: newZindex },
          },
        })
      );
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        let zIndex = item.zIndex + 1;
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }
        moveBox(item.id, left, top, zIndex);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  );
};
