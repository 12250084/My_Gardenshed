import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Thermofoil from "../pages/Thermofoil";
import ThermofoilProducts from "../pages/Thermofoil";
import AllProductsPage from "../pages/CustomShedsProduct";
import SuccessPayment from "../pages/SuccessPayment";
import FailurePayment from "../pages/FailurePayment";
import ContactUs from "../pages/ContactUs";
import OrderDetails from "../pages/OrderDetails";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path: "orders",
                        element : <OrderDetails/>
                    }
                ]
            },
            {
                path: "thermofoil",
                element : <ThermofoilProducts/>
            },
            {
                path: "thermofoil/:productId",
                element : <ThermofoilProducts/>
            },
            {
                path: "custom-sheds",
                element : <AllProductsPage/>
            },
            {
                path: "custom-sheds/:productId",
                element : <AllProductsPage/>
            },
            {
                path: "success",
                element: <SuccessPayment/>
            },
            {
                path : "cancel",
                element: <FailurePayment/>
            },
            {
                path : "contact",
                element: <ContactUs/>
            }
        ]
    }
])


export default router