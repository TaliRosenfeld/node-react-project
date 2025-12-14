import { useEffect, useState } from "react";
import Axios from "axios";
import * as React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
import { purple} from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


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
const Buy = () => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [productList, setProductList] = useState([]);
  const fetchProd = async () => {
    const { data } = await Axios.get("http://localhost:2222/api/prudoct/");
    setProductList(data);
  };
  const addToBasket = async (id) => {
    const token = localStorage.getItem("token");
    const obj = { id: id }
    try {
      await Axios.post("http://localhost:2222/api/basket/", obj, {
        headers: {
          'Authorization': token
        }
      })
      alert("המוצר נוסף לסל")
    }
    catch (error) {
      if (error.response.status === 401)
        alert("משתמש לא מורשה");
    }


  }
  useEffect(() => {
    fetchProd();
  }, []);

  // if (productList.length === 0) return <h1>Louding</h1>;

  return (
    <>
      {/* <Nav /> */}
      <h1 style={{display:'flex',flexWrap:'wrap', gap:'10px', justifyContent:'center'}}>קניה מהנה</h1>
      {/* <button onClick={() => navigate("/mybasket")}>הסל שלי</button> */}
      {/* {productList.map((p, index) => {
        return <div> */}
           <div style={{display:'flex',flexWrap:'wrap', gap:'10px', justifyContent:'center'}}>
      {productList.map((p) => {
        return (<div style={{width:'300px'}}>
          <Card sx={{ maxWidth: 345 ,backgroundColor:"secondary"}}style={{marginTop:'3vh',border:"solid" , display:'grid',placeContent:'center',borderColor:"purple"}}>
            <CardHeader
              title={p.descrabtion}
              //subheader={p.price}
              // action={
              //   <IconButton aria-label="settings"   color="secondary">
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
            style={{height:'200px', width:'auto'}}
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
              {/* <DriveFileRenameOutlineTwoToneIcon onClick={() => navigate("/.addproduct", { state: { p } })} label="עריכה" aria-label="share"> */}
                {/* <ShareIcon /> */}
              {/* </DriveFile/</Card>RenameOutlineTwoToneIcon> */}
              {!localStorage.getItem("token")?<></>:
              <AddShoppingCartIcon onClick={() => addToBasket(p._id)} label="קניה"   color="secondary">
                <ShareIcon />
              </AddShoppingCartIcon>}
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
                {/* <Typography paragraph>
                  {`${p.amount} :כמות`}
                </Typography> */}
                <Typography paragraph>
                  {`${p.company} :חברה`}
                </Typography>
              </CardContent>
            </Collapse>
          </Card></div>)
      })}

</div>
          {/* {index + 1}. {p.descrabtion}
          <img src={`../${p.img}.jpg`} style={{height:"100px",width:"100px"}}></img>
          <AddShoppingCartIcon onClick={() => addToBasket(p._id)}></AddShoppingCartIcon> */}
          {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
          {/* <RxUpdate /> */}
        {/* </div>;
      })
      } */}



    </>
  );
}
export default Buy;