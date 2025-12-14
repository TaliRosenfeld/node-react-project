import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { purple } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Register = () => {
  const navegate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const func = async (e) => {
    e.preventDefault()
    const obj = { username, password, name, email, phone }

    try {
      await Axios.post("http://localhost:2222/api/user/register", obj)
     
      navegate("/.login")
    } catch (error) {
      // console.log(error);
      if (error.response.status === 409) {
        alert("שם משתמש זה תפוס")
      }
      if (error.response.status === 400) {
        alert("נא למלא את כל השדות")
      }
    }
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center'}} sx={{ bgcolor: purple[300] ,width:"50%" }} >
     
      <form onSubmit={func} style={{width:"30%"}}> <br/>
      <span  sx={{ maxWidth:" 100%" }}style={{marginTop:'5vh',placeContent:'center', top:"50px"}}>
        <TextField onChange={(e) => { setUsername(e.target.value) }}  sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="*תעודת זהות"
          type="number"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
        // defaultValue="תעודת "
        />
        <br />
        <br />
        <TextField onChange={(e) => { setPassword(e.target.value) }} sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="*Password"
          type="password"
          
          autoComplete="current-password"
          variant="standard"
          color="secondary"
        /><br /><br />
        <TextField onChange={(e) => { setName(e.target.value) }} sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="*שם"
          type="string"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
        // defaultValue="תעודת "
        /><br /><br />
        <TextField onChange={(e) => { setEmail(e.target.value) }} sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="*מייל"
          type="email"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
        /><br /><br />
        <TextField onChange={(e) => { setPhone(e.target.value) }} sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="טלפון"
          type="number"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
          // {required:true}
        // defaultValue="תעודת "
        /><br />


        {/* <div>:שם</div>
        <input onChange={(e) => { setUsername(e.target.value) }} placeholder="שם משתמש"></input>
        <div>:קוד אישי</div>
        <input onChange={(e) => { setPassword(e.target.value) }} placeholder="קוד אישי"></input>
        <div>:שם</div>
        <input onChange={(e) => { setName(e.target.value) }} placeholder="שם"></input>
        <div>:מייל</div>
        <input onChange={(e) => { setEmail(e.target.value) }} placeholder="מייל"></input>
        <div>:טלפון</div>
        <input onChange={(e) => { setPhone(e.target.value) }} placeholder="טלפון"></input>
         */}
    <br />
      {/* <Button color="secondary" type="sumbit"   disabled={username===""||password==="" ||email===""||name===""}>אישור</Button> */}
      <Stack>
                <Button type="sumbit"  variant="contained" endIcon={<SendIcon />} color="secondary" style={{width:"15%"}}>
        Send
      </Button>
    </Stack>
      </span>
    
        </form>
    </div>
  );
}
export default Register;