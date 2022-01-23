import React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  IconButton,
  CardContent,
  Paper,
} from "@mui/material";
import { TextFieldsOutlined } from "@mui/icons-material";

export default function Todo() {
   // const array1 = ["a", "b", "c"];
  const [value, setValue] = React.useState("Controlled");
  const [array1, setArray1] = useState(["temp"]);
  
    // localStorage.setItem("todo",array1)
    // if(localStorage.getItem("todo")!==undefined){
    //     console.log( typeof(localStorage.getItem("todo")))
       
    // }
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
      //const a=array1.push(value);
    setArray1([...array1,value])
  };
  
  const listItems = array1.map((item) => (
    <Paper elevation={3} style={{margin:"10px", backgroundColor:"blueviolet" }}>
      <CardContent>{item}</CardContent>
    </Paper>
  ));

  return (
    <div>
      <TextField
        id="todo"
        label="Todo"
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        style={{ padding: "15px", marginLeft: "20px" }}
        onClick={handleClick}
      >
        Submit
      </Button>
      <h2 style={{ padding: "10px" }}>Lorem ipsum</h2>
      <div>
          {listItems}
      </div>
    </div>
  );
}
