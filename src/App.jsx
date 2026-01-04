import {useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Products from './pages/Product'
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from './pages/Cart'
import {Footer} from './component/Footer'
import {SingleProductPage } from "./component/SingleProductPage"
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'

const App = () => {
  const [location,setLocation]=useState() 
  const [openDropdown,setOpenDropdown]=useState(false);                                                                         
const getLocation = async ()=>{
   
  navigator.geolocation.getCurrentPosition(async pos=>{
    const {latitude,longitude} =  pos.coords
    // console.log(latitude,longitude)
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    // console.log(url)
    try{
      const location = await axios.get(url)
      const exactLocation = location.data.address
      setLocation(exactLocation)
      setOpenDropdown(false)
      
      // console.log("location",exactLocation)
    }
    catch(error){
      console.log("error fetching location",error)
    }
  })
}
const {cartItem,setCartItem} = useCart()



useEffect(()=>{
  getLocation()
},[])
// get item from storage
useEffect(()=>{
  const storedItem = localStorage.getItem("cartItem")
  if(storedItem){
    setCartItem(JSON.parse(storedItem))
  }
},[])

// set item from storage
useEffect(()=>{
  localStorage.setItem("cartItem",JSON.stringify(cartItem))
},[cartItem])



  return (
  <BrowserRouter>
  <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/products" element={<Products/>}></Route>
    <Route path="/products/:id" element={<SingleProductPage/>}></Route>
    <Route path="/category/:category"  element={<CategoryProduct/>}></Route>
    <Route path="/about" element={<About/>}></Route>
    <Route path="/contact" element={<Contact/>}></Route>
    <Route path="/cart" element={<Cart location={location} geolocation={getLocation}/>}></Route>
  </Routes>
  <Footer />
  </BrowserRouter>
  )
}

export default App
