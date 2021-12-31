import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button,Card,CardContent } from '@mui/material';
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
  }= props;
  return (
    <Box sx={{ minWidth: "250px",padding:'20px' }}>
    <Card variant='outlined' style={{margin:'auto'}}>
      
     <CardContent>
      <TextField
      style={{margin:'10px'}}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
        label="username" variant="outlined"
      />
      <br/>
      
      <TextField
      style={{margin:'10px'}}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoFocus
        label="password" variant="outlined"
      />
      <br/>
      <p>{error}</p>
      <br/>
      <div  style={{margin:'10px'}}>
        {hasAccount ? (
          <>
            <Button variant="contained" onClick={handleLogin}>Sign In</Button>
            <br/>
            <p>
              Don't have account? <span  onClick={e=>setHasAccount(false)}>Sign UP</span>
            </p>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleSignUp}>Sign UP</Button>
            <br/>
            <p>
              Have a Account ?<span onClick={e=>setHasAccount(true)}>Sign In</span>
            </p>
          </>
        )}
      </div>
      </CardContent>
    </Card>
    
    </Box>
  );
};
export default Login;
