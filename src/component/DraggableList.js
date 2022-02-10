import DraggableList from "react-draggable-list";
import { useEffect, useRef, useState } from "react";

const data = Array(10)
  .fill(null)
  .map((item, index) => ({ id: index }));

const Item = ({ item, itemSelected, dragHandleProps }) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;

  return (
    <div
      className="disable-select"
      style={{
        border: "1px solid black",
        margin: "4px",
        padding: "10px",
        display: "flex",
        width: "50%",
        justifyContent: "space-around",
        background: "#fff",
        userSelect: "none",
      }}
    >
      {item.id}
      <div
        className="disable-select dragHandle"
        style={{
          fontWeight: "600",
          transform: "rotate(90deg)",
          width: "20px",
          height: "20px",
          backgroundColor: "black",
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          console.log("touchStart");
          e.target.style.backgroundColor = "blue";
          document.body.style.overflow = "hidden";
          onTouchStart(e);
        }}
        onMouseDown={(e) => {
          console.log("mouseDown");
          document.body.style.overflow = "hidden";
          onMouseDown(e);
        }}
        onTouchEnd={(e) => {
          e.target.style.backgroundColor = "black";
          document.body.style.overflow = "visible";
        }}
        onMouseUp={() => {
          document.body.style.overflow = "visible";
        }}
      ></div>
    </div>
  );
};

export default function DraggableList1(props) {
  const [list, setList] = useState();

  const containerRef = useRef();

  const _onListChange = (newList) => {
    setList(newList);
  };

  return (
    <div className="App">
      <div
        ref={containerRef}
        style={{ touchAction: "pan-y", background: "beige" }}
      >
        <DraggableList
          itemKey="id"
          template={Item}
          list={data}
          //   onMoveEnd={(newList) => _onListChange(newList)}
          container={() => containerRef.current}
        />
        {/* {list.map((item) => (
        <Item item={item} />
      ))} */}
      </div>
    </div>
  );
}
