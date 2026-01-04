import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from "@clerk/clerk-react"
import { DataProvider } from './context/DataContext.jsx'
// Import your Publishable Key
import {ToastContainer} from "react-toastify"
import {CartProvider} from "./context/CartContext.jsx"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <DataProvider>
    <CartProvider>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
    <ToastContainer
position="bottom-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </ClerkProvider>
    </CartProvider>
   </DataProvider>
  </StrictMode>,
)
