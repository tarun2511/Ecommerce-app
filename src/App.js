import './App.css';
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import React, {useState} from "react";
import productContext from './context/productContext';


function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);
  return (
  <productContext.Provider value={{products, setProducts, searchQuery, setSearchQuery, search, setSearch}}>
  <BrowserRouter>
  <>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/AddProduct" element={<AddProduct />} />
    <Route path="/product-details/:id" element={<ProductDetails />} />
  </Routes>
  </>
  </BrowserRouter>
  </productContext.Provider>
  );
 
}

export default App;
