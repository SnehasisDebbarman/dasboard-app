import * as React from "react";
import { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import Todo from "./Todo/Todo";
const axios = require("axios");

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const Hero = (props) => {
  const [active, setactive] = useState(null);
  const { handleLogout, setHasAccount } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // useEffect(() => {
  //   axios
  //     .get("https://mocki.io/v1/c9a08268-1827-4c70-8497-8b6f2d928a3b")
  //     .then(function (response) {
  //       // handle success
  //       console.log(response.data);
  //       setactive(response.data);
  //       //
  //     });
  // }, []);


  //https://mocki.io/v1/c9a08268-1827-4c70-8497-8b6f2d928a3b
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <p> Mail Me</p>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              <p> Logout</p>
            </Button>
          </Toolbar>
        </AppBar>
        
        <Box
          style={{
            padding: "3rem",
            backgroundColor: "white",
            minHeight: "100vh",
            height: "auto",
            overflow: "visible",
            width: "100vw",
          }}
        >
          <Toolbar />
          <Todo todos={active} />
        </Box>
      </Box>
    </div>
  );
};

export default Hero;
