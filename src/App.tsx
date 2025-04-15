// import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import LandngLogin from './pages/LandngLogin'
// import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import { ToastProvider } from './context/ToastContext'


function App() {
  // const [count, setCount] = useState<number>(0)
  const loaction = useLocation()

  const showFooter = loaction.pathname !== '/'

  return (
    <ToastProvider>
      <div className='min-h-screen h-full flex flex-col'>
        <Header/>
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<LandngLogin/>}/>
            <Route path='/home' element={<Home/>} />
            <Route path='/product/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </div>
       {showFooter&& <Footer/>}
      </div>
    </ToastProvider>
  )
}

export default App
