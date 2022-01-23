import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent } from "@mui/material";
//icon
const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    setHasAccount,
    error,
    setError,
    hasAccount,
  } = props;
  return (
    <div className="outDiv " >
      <div className="card" transition-style="in:circle:bottom-right">
        <div className="inner-card">
        {hasAccount ? 
          <h2 className="heading">Login</h2>:
          <h2 className="heading">Register</h2>
          }
          <CardContent>
            <div className="text">Username</div>
            <TextField
              style={{
                margin: "10px",
                width: "30rem",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              variant="outlined"
            />
            <br />
            <div className="text">Password</div>
            <TextField
              style={{
                margin: "10px",
                width: "30rem",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              variant="outlined"
            />
            <br />
            <p className="text-error">{error}</p>
            <br />
            <div style={{ margin: "10px",justifyContent:'center',display:'flex',flexDirection:'column' }}>
              {hasAccount ? (
                <>
                  <Button variant="contained" onClick={handleLogin} style={{backgroundColor:"#8b3582"}} >
                    Sign In
                  </Button>
                  <br />
                  <p>
                    Don't have account?{" "}
                    <span onClick={(e) => setHasAccount(false)}>Sign UP</span>
                  </p>
                </>
              ) : (
                <>
                  <Button variant="contained" onClick={handleSignUp} style={{backgroundColor:"#8b3582"}} >
                    Sign UP
                  </Button>
                  <br />
                  <p >
                    Have a Account ?
                    <span onClick={(e) => setHasAccount(true)}>Sign In</span>
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};
export default Login;
