import React from "react";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  IconButton,
  CardContent,
  Paper,
} from "@mui/material";
import "./todo.css";
import { SignalCellularNull, TextFieldsOutlined } from "@mui/icons-material";
const axios = require("axios");

export default function Todo(props) {
  // const array1 = ["a", "b", "c"];
  const [value, setValue] = React.useState({
    name: "",
    text: "text",
    date: new Date().toString(),
  });
  const [text, setText] = useState("");
  const [array1, setArray1] = useState([value]);
  const [first, setfirst] = useState();
  const [id, setid] = useState(guidGenerator);

  function getId(){
    axios
      .get("https://www.uuidgenerator.net/api/version1")
      .then(function (response) {
        // handle success
        console.log(response);
        setid(response.data);
        //
      });
  }
  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

  const handleChange = (event) => {

    setText(event.target.value)
    setValue({
      name: id||guidGenerator,
      text: event.target.value,
      date: new Date()
        .toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .toString(),
    });
  };

  const handleClick = (event) => {
    getId()
    setArray1([...array1, value]);
    setText("")
  };

  // const listItems = array1.map((item) => (
  //   <div className="todo">
  //     <div>
  //       <h2 className="todoHeader">{item.name}</h2>
  //     </div>
  //     <div>
  //       <p className="todoBody">{item.text}</p>
  //     </div>
  //     <footer className="todoFooter">{item.date}</footer>
  //   </div>
  // ));

  return (
    <div>
      <div className="add-btn"></div>
    
    <div >
      
      <TextField
        id="todo"
        label="Todo"
        variant="outlined"
        onChange={handleChange}
        value={text}
      />
      <Button
        variant="contained"
        style={{ padding: "15px", marginLeft: "20px" }}
        onClick={handleClick}
        disabled={text.length===0?true:false}
       
      >
        <p>Submit</p>
      </Button>
      <h1 style={{ padding: "10px", fontSize: "2rem" }}>ToDos</h1>
      <div className="todoContainer flex-container">
        <>
          {array1.map((item) => (
            <div className="todo flex-items">
              <div >
                <h2 className="todoHeader">{item.name}</h2>
              </div>
              <div>
                <p className="todoBody">{item.text}</p>
              </div>
              <footer className="todoFooter">{item.date}</footer>
            </div>
          ))}
        </>
      </div>
    </div>
    </div>
  );
}
