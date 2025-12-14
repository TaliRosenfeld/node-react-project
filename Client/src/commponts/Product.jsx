import { useState } from "react";
import { useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {  purple } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Product = () => {

  const [expanded, setExpanded] = React.useState(false);

  // const [expanded, setExpanded] = React.useState(Array(length).fill(false));
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // const handleExpandClick = (index)=>{
  //   const newExpanded =[...expanded];
  //   newExpanded[index]=!newExpanded[index];
  //   setExpanded(newExpanded);
  // }



  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const fetchProd = async () => {
    const { data } = await Axios.get("http://localhost:2222/api/prudoct/");
    setProductList(data);
    // setLength(productList.length)
  };

  const deleteProduct1 = async (p) => {
    try {
      const token = localStorage.getItem("token");
      console.log(p);

      await Axios.delete(`http://localhost:2222/api/prudoct/${p}`, {
        headers: {
          'Authorization': token
        }
      });
      fetchProd();
    }
    catch (error) {
      if (error.response.status === 401)
        alert("משתמש לא מורשה");
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  if (productList.length === 0) return <> <h1 style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>ניהול מוצרים</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}><Button color='secondary' onClick={() => navigate("/.addproduct")} variant="outlined">הוספת מוצר</Button></div></>

  return (
    <>
      {/* <Nav /> */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        <h1>ניהול מוצרים</h1></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}><Button color='secondary' onClick={() => navigate("/.addproduct")} variant="outlined">הוספת מוצר</Button></div>
      {/* <button onClick={() => navigate("/.addproduct")}>הוספת מוצר</button> */}
      {/* {productList.map((p, index) => {
        return <div>
          <img src={`/${p.img}`} />
          <img src={`../${p.img}.jpg`} style={{ height: "100px", width: "100px" }}></img>
          {index + 1}. {p.descrabtion}
          <PlusIcon />
<PlusIcon color="secondary" />
          <DeleteForeverIcon onClick={() => deleteProduct1(p._id)}></DeleteForeverIcon>
          <button onClick={() => navigate("/.addproduct", { state: { p } })}>עריכת מוצר</button>
        </div>;
      })} */}
      {/* <Fab onClick={() => navigate("/.addproduct")} color="pink" aria-label="add">
        <AddIcon />
      </Fab> */}
      {/* <div style={{display:"flex"}}> */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {productList.map((p,index) => {
          return (<div style={{ width: '300px' }}>
            <Card key={index} 
            sx={{ maxWidth: 345 }} style={{ marginTop: '3vh', border: "solid", display: 'grid', placeContent: 'center', borderColor: "purple" }}>
              <CardHeader
                title={p.descrabtion}
                //subheader={p.price}
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }

                avatar={
                  <Avatar sx={{ bgcolor: purple[300] }} aria-label="recipe">
                    {p.productKode}
                  </Avatar>
                }
              />
              <CardMedia
                style={{ height: '200px', width: 'auto', justifyContent: 'center', alignItems: 'center' }}
                component="img"
                height="194"
                image={`../${p.img}.jpg`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <span>{`${p.price}$ :מחיר`}</span>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon /> */}
                {/* <BottomNavigation>
                <BottomNavigationAction onClick={() => navigate("/.addproduct", { state: { p } })} label="עריכה" icon={<UpdateIcon />} />
                </BottomNavigation> */}
                {/* </IconButton> */}
                <DriveFileRenameOutlineTwoToneIcon onClick={() => navigate("/.addproduct", { state: { p } })} label="עריכה" aria-label="share" color="secondary">
                  <ShareIcon />
                </DriveFileRenameOutlineTwoToneIcon>
                <DeleteIcon onClick={() => deleteProduct1(p._id)} label="מחיקה" color="secondary">
                  {/* <ShareIcon /> */}
                </DeleteIcon>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  color="secondary"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {`סוג: ${p.type}`}
                  </Typography>
                  <Typography paragraph>
                    {`צבע: ${p.color}`}
                  </Typography>
                  <Typography paragraph>
                    {`${p.amount} :כמות`}
                  </Typography>
                  <Typography paragraph>
                    {`${p.company} :חברה`}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card></div>)
        })}

      </div>



    </>
  );
}
export default Product;