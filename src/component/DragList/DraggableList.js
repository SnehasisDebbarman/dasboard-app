import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./draglist.scss";

export default function DraggableList1({ todos }) {
  const db = getFirestore();
  const [Todos, setTodos] = useState([]);
  useEffect(() => {
    //getData();
  }, []);

  useEffect(() => {
    let s = [];
    for (let td of todos) {
      s.push(td[1]);
    }
    // updateTodoArray(s);
    setTodos(s);
  }, [todos]);

  // async function updateTodoArray(arr) {
  //   await setDoc(doc(db, "todoarray"), {
  //     id: "todoarray",
  //     array: arr,
  //   });
  // }

  // async function getData() {
  //   const docRef = doc(db, "todoarray");
  //   const docSnap = await getDoc(docRef);
  //   if (!docSnap.exists()) {
  //     const docref = doc(collection(db, "todoarray"));
  //     await addDoc(docref, []);
  //     // await addDoc(doc(db, "todoarray", "todoarray"), {
  //     //   arr: [],
  //     // });
  //   } else {
  //     console.log(docSnap.data());
  //   }
  // }

  console.log("Todos", todos);
  function handleOnDragEnd(result) {
    const items = Array.from(Todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  }
  return (
    <div style={{ width: "100%", minHeight: "200px", background: "white" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Todos.map((todo, index) => {
                return (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="characters-thumb">
                          {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                        </div>
                        <p>{todo.item}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
