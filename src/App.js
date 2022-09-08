import React, { createContext, useReducer } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Account/Login'
import Cart from './components/Cart'
import Store from './components/Store'
import Signup from './components/Account/Signup'
import Shipping from './components/payment/Shipping'
import PlaceOrder from './components/payment/PlaceOrder'
import Logout from './components/Account/Logout'
import { initialState, reducer } from './Context/CartContext'
import Profile from './components/Account/Profile'
import Dashboard from './components/Account/Dashboard'
import AddProduct from './components/Account/AddProduct'
import AllProducts from './components/Account/AllProducts'
import ViewProduct from './components/ViewProduct'
import AllOrders from './components/Account/AllOrders'
import EditOrders from './components/Account/EditOrders'
import DeletProduct from './components/Account/DeletProduct'
import EditProducts from './components/Account/EditProducts'
import ApprovedOrders from './components/Account/ApprovedOrders'
import NewOrders from './components/Account/NewOrders'
import CancelOrders from './components/Account/CancelOrders'
import RefundOrders from './components/Account/RefundOrders'
import Help from './components/Account/Help'
import ThankYou from './components/payment/ThankYou'
import Contact from './components/Contact'
import Helps from './components/Helps'
import NewUsers from './components/Account/New_USERS'

export const UserContext = createContext();

const Routing = () =>{
  return (
  <Routes>
    <Route path='/' exact element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/approved' element={<ApprovedOrders />}/>
    <Route path='/new' element={<NewOrders />}/>
    <Route path='/cancel' element={<CancelOrders/>} />
    <Route path='/refund' element={<RefundOrders/>} />
    <Route path='/product/:_id' element={<ViewProduct />} />
    <Route path='/eprod/:_id' element={<EditProducts />} />
    <Route path='/edit/:_id' element={<EditOrders />} />
    <Route path='/delete/:_id' element={<DeletProduct />} />
    <Route path='/products' element={<Store />} />
    <Route path='/cart' element={<Cart />}/>
    <Route path='/help' element={<Help />}/>
    <Route path='/shipping' element={<Shipping />} />
    <Route path='/payment' element={<PlaceOrder />}/>
    <Route path='/logout' element={<Logout />}/>
    <Route path='/profile' element={<Profile />} />
    <Route path='/dashboard' element={<Dashboard />}/>
    <Route path='/product' element={<AddProduct />}/>
    <Route path='/allproduct' element={<AllProducts />}/>
    <Route path='/new-users' element={<NewUsers />}/>
    <Route path='/placed' element={<ThankYou />}/>
    <Route path='/Orders' element={<AllOrders />} />
    <Route path='/helps' element={<Helps />}/>
    <Route path='/contact' element={<Contact />}/>
    <Route path='*' element={<Home />} />
  </Routes>
  )
}

const App = () => {
const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
    </UserContext.Provider>
    </div>
  )
}

export default App
