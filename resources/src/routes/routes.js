// routes.js
import {createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from 'react-router-dom';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ProductScreen from '../screens/product';
import App from '../App';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/view/:productId' element={<ProductScreen />} />
        </Route>
    )
);

export default router;
