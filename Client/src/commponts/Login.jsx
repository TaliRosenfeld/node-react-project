import { useState } from "react";
import {useDispatch}from'react-redux';
import {login} from '../store/UserSlice'
import {useNavigate } from "react-router-dom";
import Axios from 'axios'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { purple} from '@mui/material/colors';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const Login = () => {
  const dispatch = useDispatch()
  // const user = useSelector((myStore)=>myStore.userSlice.user)
  const navegate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const func = async (e) => {
    e.preventDefault()
    const obj = { username, password }
    // console.log(obj,"Hhhh");
    try {
      const { data } = await Axios.post("http://localhost:2222/api/user/login", obj)
      localStorage.setItem("token", `Bearer ${data.accesstoken}`)
      console.log(data.user.name);
      dispatch(login(data.user.name))
      navegate("/")
    } catch (error) {
      if (error.response.status === 400)
        alert("נא למלא את כל הפרטים")
      else if (error.response.status === 401) {
        alert("משתמש לא קיים")
        navegate("/.register")
      }
      //console.log(error);
    }
  }
  return (
    <div style={{ display: 'flex',width:"100%" , flexWrap: 'wrap', gap: '10px', justifyContent: 'center'}}>
      <form onSubmit={func} style={{width:"30%"}}>
        {/* <div>:שם</div>
        <input onChange={(e) => { setUsername(e.target.value) }} placeholder=":שם"></input>
        <div>:קוד אישי</div>
        <input onChange={(e) => { setPassword(e.target.value) }} placeholder=":קוד אישי"></input>
        <br /> */}
        
        <div  sx={{ maxWidth:" 100%" }}style={{marginTop:'5vh',placeContent:'center', top:"50px"}}>
        <TextField onChange={(e) => { setUsername(e.target.value) }}  sx={{ bgcolor: purple[100] }} style={{width:"100%"}}
          id="standard-password-input"
          label="*תעודת זהות"
          type="number"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
         minlength={5}
         
        // defaultValue="תעודת "
        /><br />
        <br/>
        <TextField  minlength="9" onChange={(e) => { setPassword(e.target.value) }} sx={{ bgcolor: purple[100] }} style={{width:"100%",size:"3"}}
          id="standard-password-input"
          label="*Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          color="secondary"
         
        />
         {/* <Avatar  aria-label="recipe">
                  {p.productKode}
                </Avatar> */}
                <br/>
                <br/>
                <Stack>
                <Button type="sumbit"  variant="contained" endIcon={<SendIcon />} color="secondary" style={{width:"15%"}}>
        Send
      </Button>
    </Stack>
        {/* <button type="sumbit"><CheckIcon>אישור</CheckIcon></button> */}
        </div></form>
      
    </div>
  );
}
export default Login;



