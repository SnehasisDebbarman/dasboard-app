import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Todo from "./Todo/Todo";

const Hero = (props) => {
  const [active, setactive] = useState(null);
  const { handleLogout, setHasAccount } = props;

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
      <Todo handleLogout={handleLogout}></Todo>
    </div>
  );
};

export default Hero;
