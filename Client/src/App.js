import './App.css';
import { Suspense } from 'react';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom'
import Nav from './commponts/Nav'
// import {  styled } from '@mui/material/styles';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//   },
// }));

// import HomePage from './commponts/HomePage';
// import Login from './commponts/Login';
// import Register from './commponts/Register';
// import Buy from './commponts/Buy';
// import Nav from './commponts/Nav';
// import Product from './commponts/Product';
// import AddProduct from './commponts/AddProduct'
// import MyBasket from './commponts/MyBasket'

// const LazyHomePage = React.lazy(() => import('./commponts/HomePage'))
const LazyLogin = React.lazy(() => import('./commponts/Login'))
const LazyRegister = React.lazy(() => import('./commponts/Register'))
const LazyNav = React.lazy(() => import('./commponts/Nav'))
const LazyBuy = React.lazy(() => import('./commponts/Buy'))
const LazyProduct = React.lazy(() => import('./commponts/Product'))
const LazyAddProduct = React.lazy(() => import('./commponts/AddProduct'))
const LazyMyBasket = React.lazy(() => import('./commponts/MyBasket'))

function App() {
  return (
    <>
      {/* <Provider store={myStore}> */}
        <Nav />
        {/* <Routes>
        <Route path='/.login' element={<Login/>}/>
        <Route path='/.register' element={<Register/>}/>
        <Route path='/.nav' element={<Nav/>}/>
        <Route path='/.Buy' element={<Buy/>}/>
        <Route path='/.product' element={<Product/>}/>
        <Route path='/.addproduct' element={<AddProduct/>}/>
        <Route path='/mybasket' element={<MyBasket/>}/>
          <Route path='/' element={<HomePage/>}/>
        </Routes> */}
        <Routes>
          <Route path='/' element={<Suspense fallback="loading..."><LazyBuy/></Suspense>} />
          <Route path='/.login' element={<Suspense fallback="loading..."><LazyLogin /></Suspense>} />
          <Route path='/.register' element={<Suspense fallback="loading..."><LazyRegister /></Suspense>} />
          <Route path='/.nav' element={<Suspense fallback="loading..."><LazyNav /></Suspense>} />
          <Route path='/.Buy' element={<Suspense fallback="loading..."><LazyBuy /></Suspense>} />
          <Route path='/.product' element={<Suspense fallback="loading..."><LazyProduct /></Suspense>} />
          <Route path='/.addproduct' element={<Suspense fallback="loading..."><LazyAddProduct /></Suspense>} />
          <Route path='/mybasket' element={<Suspense fallback="loading..."><LazyMyBasket /></Suspense>} />
        </Routes>
      {/* </Provider> */}
      {/* <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment> */}

    </>
  );
}

export default App;
