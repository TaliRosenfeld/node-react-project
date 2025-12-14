import Axios from 'axios'
import { useEffect, useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
const images = [

  {
    url: '/static/images/buttons/camera.jpg',
    title: 'Camera',
    width: '100%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
const Mybasket = () => {
  const token = localStorage.getItem("token")
  const [basket, setBasket] = useState([])

  // const [url,setUrl] = useState("")
  const getBasket = async () => {
    try {
      const { data } = await Axios.get("http://localhost:2222/api/basket/", {
        headers: {
          'Authorization': token
        }
      })
      setBasket(data)
    }
    catch (error) {
      if (error.response.status === 401) {
        alert("משתמש לא מורשה")
        // navigate("/.login")
      }
      else
        alert("שגיאה")
    }
  }
  const deleteProduct = async (b) => {
    const token = localStorage.getItem("token")
    const obj = b._id
    console.log(token);
    try {
      await Axios.delete(`http://localhost:2222/api/basket/${obj}`, {
        headers: {
          'authorization': token
        }
      })
      getBasket();
    }
    catch (error) {
      if (error.response.status === 401)
        alert("משתמש לא מורשה");
    }

  }
  useEffect(() => {
    getBasket();
  }, []);
  if (basket.length === 0) return <><h1 style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>?????הסל ריק מה תבחר לקנות</h1>  </>
  console.log(basket)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
      {/* <Nav /> */}
      {basket.map((b, index) => {

        // b.productRef.amount
        // setUrl()
        //    { s=}
        // console.log(b.productRef.img);
        return b.product != null ? <span>

          {b.product.color = `../${b.product.img}.jpg`}
          {/* {setCount(count+1)} */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {images.map((image) => (
              <ImageButton onClick={() => deleteProduct(b)}
                focusRipple

                style={{
                  width: image.width,
                }}
              >
                <ImageSrc style={{ backgroundImage: `url(${b.product.color})` }} sx={{ display: 'flex', minWidth: 300, justifyContent: "center" }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography

                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      justifyContent: "center",
                    }}
                    style={{ width: "100%" }}
                  >
                    DELETE
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            ))}
          </Box>
       
          <> <h3>${b.product.price}</h3>
            <h3>{b.product.descrabtion}</h3>
            <h3>{b.product.company}</h3></></span> : <></>
      })}
      {/* {count===0&&<h1 style={{display:'flex',flexWrap:'wrap', gap:'10px', justifyContent:'center'}}>?????הסל ריק מה תבחר לקנות</h1>} */}
    </div>
  );
}
export default Mybasket;