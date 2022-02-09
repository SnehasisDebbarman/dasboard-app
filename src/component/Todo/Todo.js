import React from "react";
import { useState, useEffect } from "react";
import { Button, IconButton, Paper, Checkbox, InputBase } from "@mui/material";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import iconCheck from "../../images/icon-check.svg";
import "./todo.css";
import "./todo.scss";
import { pink } from "@mui/material/colors";
// import { styled } from "@mui/material/styles";
// import DraggableList from "react-draggable-lists";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

import firebaseApp from "../../firebaseApp";
import { async } from "@firebase/util";
const GradientCheckIcon = () => {
  return (
    <img
      src={iconCheck}
      style={{
        height: "auto",
        width: "auto",
        background: "linear-gradient(hsl(192, 100%, 67%) , hsl(280, 87%, 65%))",
        border: "2px solid white",
        borderRadius: "50%",
        padding: "5px",
      }}
    />
  );
};
const CheckIcon = () => {
  return (
    <div>
      <svg
        style={{
          height: "auto",
          width: "auto",
          background: "transparent",
          borderRadius: "55%",
          border: "2px solid white",
          padding: "5px",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="9"
      >
        <path
          fill="none"
          stroke="transparent"
          strokeWidth="2"
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
      {/* <img src={iconCheck} /> */}
    </div>
  );
};
const CheckIconDark = () => {
  return (
    <div>
      <svg
        style={{
          height: "auto",
          width: "auto",
          background: "transparent",
          borderRadius: "55%",
          border: "2px solid grey",
          padding: "5px",
          "input:hover ~ &": {
            backgroundColor: "red",
          },
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="9"
      >
        <path
          fill="none"
          stroke="transparent"
          strokeWidth="2"
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
    </div>
  );
};

export default function Todo({ handleLogout }) {
  // const array1 = ["a", "b", "c"];
  const [DarkMode, setDarkMode] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [InputValue, setInputValue] = useState("");
  const [dummy, setdummy] = useState("");
  const [ActiveTodo, setActiveTodo] = useState(false);
  const [CompletedTodo, setCompletedTodo] = useState(false);
  const desauratedBlue = "hsl(235, 24%, 19%)";
  const listItems = ["Entertainment"];
  //firestore
  const db = getFirestore();
  useEffect(() => {
    getTodos();
  }, [dummy]);

  //update
  async function updateTodo(id, status, item) {
    let st;
    status ? (st = "completed") : (st = "active");
    await setDoc(doc(db, "todos", id), {
      id: id,
      item: item,
      status: st,
    });
  }

  async function saveTodo(input) {
    //const saveToFirebase = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        id: uuid(),
        item: input,
        status: "active",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getTodos() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const saveFirebaseTodos = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      let s = [doc.id, doc.data()];
      saveFirebaseTodos.push(s);
    });
    setTodos(saveFirebaseTodos);
    console.log(Todos);
  }

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      saveTodo(e.target.value);
      //listItems.push(e.target.value);
      setInputValue("");
      setdummy(e.target.value);
      // put the login here
    }
  };

  const ListItemContainer = ({ uid, todoItem, todoStatus }) => {
    return (
      <div style={{ borderTop: "0.1px solid grey" }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          style={
            !DarkMode
              ? {
                  background: desauratedBlue,
                  color: "white",
                }
              : {
                  background: "white",
                  color: desauratedBlue,
                }
          }
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <Checkbox
              icon={DarkMode ? <CheckIconDark /> : <CheckIcon />}
              checkedIcon={<GradientCheckIcon />}
              style={!DarkMode ? { color: "white" } : { color: desauratedBlue }}
              onChange={(e) => updateTodo(uid, e.target.checked, todoItem)}
            />
          </IconButton>
          <div
            float="left"
            // className={DarkMode ? "textfield textfield-dark" : "textfield"}
            style={
              !DarkMode
                ? {
                    background: desauratedBlue,
                    color: "white",
                    width: "100%",
                  }
                : {
                    background: "white",
                    color: desauratedBlue,
                    width: "100%",
                  }
            }
          >
            {todoStatus === "completed" ? (
              <div style={{ textDecoration: "line-through", color: "gray" }}>
                {todoItem}
              </div>
            ) : (
              <div>{todoItem}</div>
            )}
          </div>
        </Paper>
      </div>
    );
  };

  return (
    <div className={DarkMode ? "todo-body bg-dark" : "todo-body bg-light"}>
      <nav>
        <div>
          <Button
            style={{ float: "right" }}
            color="inherit"
            onClick={handleLogout}
          >
            <p>Logout</p>
          </Button>
        </div>
      </nav>
      <main>
        <div className="todo-nav">
          <h1>TODO</h1>
          <Button onClick={() => setDarkMode(!DarkMode)}>
            {" "}
            {DarkMode ? <img src={moon}></img> : <img src={sun}></img>}
          </Button>
        </div>
        <div>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88%",
              marginLeft: "35px",
            }}
            style={
              !DarkMode
                ? { background: desauratedBlue, color: "white" }
                : { background: "white", color: desauratedBlue }
            }
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <Checkbox
                icon={DarkMode ? <CheckIconDark /> : <CheckIcon />}
                disabled
                sx={{
                  color: pink[800],
                  "&.Mui-hover": {
                    color: pink,
                  },
                }}
                style={
                  !DarkMode
                    ? {
                        color: "white",
                      }
                    : {
                        color: desauratedBlue,
                      }
                }
              />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              style={
                !DarkMode
                  ? {
                      background: desauratedBlue,
                      color: "white",
                      fontFamily: "'Josefin Sans', 'sans-serif'",
                    }
                  : {
                      background: "white",
                      color: desauratedBlue,
                      fontFamily: "'Josefin Sans', 'sans-serif'",
                    }
              }
              onChange={(e) => setInputValue(e.target.value)}
              value={InputValue}
              onKeyDown={keyPress}
            />
          </Paper>
        </div>
        <div
          className={
            DarkMode ? "todo-container" : "todo-container todo-container-dark"
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {Todos.map((todo) => {
              //console.log(uid);
              if (ActiveTodo && !CompletedTodo) {
                if (todo[1].status === "active") {
                  return (
                    <ListItemContainer
                      key={todo[1].id}
                      todoItem={todo[1].item}
                      todoStatus={todo[1].status}
                      uid={todo[0]}
                    />
                  );
                }
              } else if (!ActiveTodo && CompletedTodo) {
                if (todo[1].status === "completed") {
                  return (
                    <ListItemContainer
                      key={todo[1].id}
                      todoItem={todo[1].item}
                      todoStatus={todo[1].status}
                      uid={todo[0]}
                    />
                  );
                }
              } else {
                return (
                  <ListItemContainer
                    key={todo[1].id}
                    uid={todo[0]}
                    todoItem={todo[1].item}
                    todoStatus={todo[1].status}
                  />
                );
              }
            })}
          </div>

          <div
            className={
              !DarkMode
                ? "todo-control-btn todo-control-btn-dark"
                : "todo-control-btn"
            }
          >
            <div>
              {Todos.length == 1
                ? Todos.length + " item left"
                : Todos.length + " items left"}{" "}
            </div>
            <div className="todo-states">
              <div
                className={
                  !ActiveTodo && !CompletedTodo
                    ? "todo-state active-btn"
                    : "todo-state"
                }
                id="all-todo"
                onClick={() => {
                  setActiveTodo(false);
                  setCompletedTodo(false);
                }}
              >
                All
              </div>
              <div
                className={
                  ActiveTodo && !CompletedTodo
                    ? "todo-state active-btn"
                    : "todo-state"
                }
                id="active-todo"
                onClick={() => {
                  setActiveTodo(true);
                  setCompletedTodo(false);
                }}
              >
                Active
              </div>
              <div
                className={
                  !ActiveTodo && CompletedTodo
                    ? "todo-state active-btn"
                    : "todo-state"
                }
                id="completed-todo"
                onClick={() => {
                  setActiveTodo(false);
                  setCompletedTodo(true);
                }}
              >
                Completed
              </div>
            </div>
            <div>Clear Completed</div>
          </div>
        </div>
      </main>
    </div>
  );
}
