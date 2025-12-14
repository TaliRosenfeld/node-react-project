import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddProduct = () => {


    // const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };


    const location = useLocation()
    const product = location.state
    const navigate = useNavigate()
    console.log(product);
    const [productKode, setProductKode] = useState(product ? product.p.productKode : "")
    const [type, setType] = useState(product ? product.p.type : "מחוגים")
    const [color, setColor] = useState(product ? product.p.color : "")
    const [amount, setAmount] = useState(product ? product.p.amount : 0)
    const [img, setImg] = useState(product ? product.p.img : 1)
    const [price, setPrice] = useState(product ? product.p.price : 0)
    const [descrabtion, setDescrabtion] = useState(product ? product.p.descrabtion : "")
    const [company, setCompany] = useState(product ? product.p.company : "")


    const func = async (e) => {

        e.preventDefault()
        console.log(product + "hjhghgfhxdcc");
        const token = localStorage.getItem("token");
        if (location.state) {
            // if (!location.state._id) {
            //     alert("bhvggcfdcxfg")
            // }
            console.log(location.state + "111111111");
            const id = product.p._id
            const obj = { id, type, color, amount, img, price, descrabtion, company }
            console.log(obj);
            try {
                await Axios.put(`http://localhost:2222/api/prudoct/`, obj, {
                    headers: { 'Authorization': token }
                })
                navigate("/.product")
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            const obj = { productKode, type, color, amount, img, price, descrabtion, company }
            try {
                await Axios.post(`http://localhost:2222/api/prudoct/`, obj, {
                    headers: { 'Authorization': token }
                })
                navigate("/.product")
            }
            catch (error) {
                <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success Alert with an encouraging title.
                </Alert>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    This is an info Alert with an informative title.
                </Alert>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    This is a warning Alert with a cautious title.
                </Alert>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error Alert with a scary title.
                </Alert>
            </Stack>
                if (error.response.status === 400)
                    alert("כל השדות חובה")
                else if (error.response.status === 401){
                <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success Alert with an encouraging title.
                </Alert>
                <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    This is an info Alert with an informative title.
                </Alert>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    This is a warning Alert with a cautious title.
                </Alert>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    This is an error Alert with a scary title.
                </Alert>
            </Stack>
                    alert("משתמש לא מורשה")}
                else if (error.response.status === 409)
                    alert("קוד מוצר זה קיים במערכת")
            }
        }
        // e.preventDefault()
        // const obj = {productKode,type,color,amount,company,img,descrubtion }
        // const { stam } = await Axios.post(`http://localhost:2223/api/product/`,obj)
        // navigate("/.product")

    }
    return (

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center'}}>

            {/* <Nav /> */}
            <h1>מלא את פרטי המוצר</h1>
            <form onSubmit={func}>
                {product ? <h1>עדכון</h1> : <h1>הוספה</h1>}
                <div style={{ flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                    {product ? <></> : <><div>:קוד מוצר</div>
                        <TextField onChange={(e) => { setProductKode(e.target.value) }} style={{}}
                            required
                            id="outlined-required"
                            type="number"
                            min="1"
                            max="42"
                            defaultValue={productKode}
                            color="secondary" /></>}
                    <div>:סוג</div>
                    {/* <input onChange={(e) => { setType(e.target.value) }} placeholder={type}></input> */}
                    {/* <Box sx={{ minWidth: 30 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{type}</InputLabel>
                        <Select
                            //   labelId="demo-simple-select-label"
                            //   id="demo-simple-select"
                            //   value={age}
                            //   label="Age"
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            <MenuItem value={"דיגיטלי"}>דיגיטלי</MenuItem>
                            <MenuItem value={"מחוגים"}>מחוגים</MenuItem>
                        </Select>
                    </FormControl>
                </Box> */}
                    <FormControl onChange={(e) => { setType(e.target.value) }}>
                        {/* <FormLabel id="demo-radio-buttons-group-label"></FormLabel> */}
                        <RadioGroup sel
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={type}
                            name="radio-buttons-group"
                            color="secondary"
                        >
                            <FormControlLabel value="מחוגים" control={<Radio />} label="מחוגים" />
                            <FormControlLabel value="דיגיטלי" control={<Radio />} label="דיגיטלי" />

                        </RadioGroup>
                    </FormControl>

                    <div>:צבע</div>
                    <TextField onChange={(e) => { setColor(e.target.value) }}
                        required
                        id="outlined-required"
                        label=""
                        defaultValue={color}
                        color="secondary"
                    />

                    <div>:כמות</div>
                    <TextField onChange={(e) => { setAmount(e.target.value) }}
                        required
                        id="outlined-required"
                        type="number"
                        maxRows={2}
                        defaultValue={amount}
                        color="secondary"

                    />
                    <div>:תמונה</div>
                    <TextField onChange={(e) => { setImg(e.target.value) }} style={{}}
                        required
                        id="outlined-required"
                        type="number"
                        min="1"
                        max="42"
                        defaultValue={img}
                        color="secondary" />
                    <div>:תיאור</div>
                    <TextField onChange={(e) => { setDescrabtion(e.target.value) }}
                        required
                        id="outlined-required"
                        label=""
                        defaultValue={descrabtion}
                        color="secondary"
                    />
                    <div>:חברה</div>
                    <TextField onChange={(e) => { setCompany(e.target.value) }}
                        required
                        id="outlined-required"
                        label=""
                        defaultValue={company}
                        color="secondary"
                    />
                    <div>:מחיר</div>
                    <TextField onChange={(e) => { setPrice(e.target.value) }} style={{}}
                        required
                        id="outlined-required"
                        type="number"
                        min="1"
                        max="42"
                        defaultValue={price}
                        color="secondary" />
                </div>
                {/* <input  placeholder={img}></input> */}

                {/* <input onChange={(e) => { setPrice(e.target.value) }} type="number" max="10000000" min="0" placeholder={price}></input>
               
                <input onChange={(e) => { setDescrabtion(e.target.value) }} placeholder={descrabtion}></input>
             
                <input onChange={(e) => { setCompany(e.target.value) }} placeholder={company}></input> */}
                <br />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    {product ? <Button type="sumbit" color='secondary' variant="outlined">עדכן מוצר</Button> :
                        <Button type="sumbit" color='secondary' variant="outlined">הוסף מוצר</Button>}
                </div>
            </form>


        </div>
    );
}
export default AddProduct;