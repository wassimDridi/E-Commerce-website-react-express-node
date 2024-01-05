import { useState } from 'react'
import { Container } from "react-bootstrap";
import {Routes , Route} from 'react-router-dom'
import Home from "./components/Home"
import Store from "./components/Store"
import About from "./components/About"
import Navbar from "./components/Navbar"
import AddProduct from "./components/admin/AddProduct"
import EditArticle from "./components/admin/EditArticle"
import Inscription from './components/client/Inscription'
import LogIn from './components/client/LogIn'
import PdfCart from "./components/PdfCart"
import ShoppingCartContextProvider from './context/shoppingCartContext';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <ShoppingCartContextProvider>
    <Navbar />
      <Container className='mb-4'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PdfCart" element={<PdfCart />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/EditArticle" element={<EditArticle />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <Footer />
      </ShoppingCartContextProvider>
    </>
  )
}

export default App
