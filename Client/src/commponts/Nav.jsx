import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Face2Icon from '@mui/icons-material/Face2';
import {  purple } from '@mui/material/colors';
import {login} from '../store/UserSlice'
const Nav = () => {

  const dispatch = useDispatch()
  const user = useSelector((myStore) => myStore.userSlice.user)
  console.log(user);
  // const user = "1111"
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  const clearLocalStorage = () => {
    localStorage.clear()
    dispatch(login(""))
    window.location.reload()
    navigate("/")
  }
  const token = localStorage.getItem("token")

  return (
    <>
      {/* <button ><Link to={"/"}>logout</Link></button>
      <button><Link to={"/.product"}>ניהול מוצרים</Link></button>
      <button><Link to={"/.buy"}>סל קניות</Link></button>
      <button>הסל שלי</button> */}
{token?
      <><Box sx={{ width: "100%"
      // , position:"fixed"
      // marginBottom: "9rem"
      , zIndex:"100" }} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/.login")} label="כניסה" icon={<Face2Icon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} color="red" onClick={() => navigate("/.register")} label="הרשמה" icon={<PersonAddIcon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/.buy")} label="החנות שלנו" icon={<StorefrontIcon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/mybasket")} label="?מה בסל" icon={<ShoppingBasketIcon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/.product")} label="ניהול מוצרים" icon={<ManageAccountsIcon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={clearLocalStorage} label="יציאה" icon={<><PersonOffIcon /></>} />
          {/* {user===""?<></>:<span>{user}</span>} */}
        </BottomNavigation>
      </Box></>:<>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/.login")} label="כניסה" icon={<Face2Icon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} color="red" onClick={() => navigate("/.register")} label="הרשמה" icon={<PersonAddIcon />} />
          <BottomNavigationAction sx={{ color: purple[300] }} onClick={() => navigate("/.buy")} label="החנות שלנו" icon={<StorefrontIcon />} />
        </BottomNavigation>
      </Box></>}
      {/* <h1>{user}</h1>
      {localStorage.getItem("token") ? <></> : */}
       <div style={{display:'flex',flexWrap:'wrap', gap:'10px', justifyContent:'center'}}>
        {user ? <h1>{user}</h1> : <div></div>}

        {/* <img src="."></img> */}
      </div>
    </>
  );
}
export default Nav;
 


