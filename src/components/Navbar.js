import React, {useState, useContext} from "react";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Link, useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from "@mui/material"
import axios from "axios";
import productContext from "../context/productContext";
import TemporaryDrawer from "./temporaryDrawer";


export default function Navbar (){
    const {products, setProducts, searchQuery, setSearchQuery, search, setSearch} = useContext(productContext);
    const Navigate = useNavigate();
    const handleSearch = async(e) => {
      e.preventDefault();
      setSearch(true);
      Navigate('/')
      const resp = await axios.get(`http://localhost:4200/v1/products/?item=${searchQuery}`);
      //const resp = await axios.get(`http://localhost:4200/v1/products/`, {params: {item: searchQuery}}); u can do this way as well
        const data = resp.data.products;
        setProducts(data);
    }
    
    const handleHomeButtonClick = () => {
      setSearchQuery('');
      setSearch(false)
    }

    return(
        <>
        <nav className="navbar-home">
        <div>
        <Link to="/" style={{textDecoration: "none", color: "white"}} onClick={handleHomeButtonClick}><h1 className="nav-header">BestBuy.in <ShoppingCartCheckoutIcon /></h1></Link><br />
        </div>
        <div>
        <form method="GET" onSubmit={handleSearch}>
        <TextField id="outlined-basic" label="What are you looking for?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} variant="outlined" sx={{color: "white", backgroundColor:"white", width: "500px", marginTop: "20px", border: "1px solid #FFD700", height: "45px"}} 
        InputProps={{style: {height: "45px"}}} placeholder="e.g, iPhone 15"/>
        <Button type="submit" variant="contained" sx={{marginTop: "20px", backgroundColor: "#FFD700", height: "45px"}}><SearchIcon /></Button>
        </form>
        </div>
        <ul className="nav" >
          <li className="nav-el"><AccountCircleIcon sx={{display: "inline-flex", verticalAlign: "text-bottom" }} fontSize="large"/> </li>
          <Link to="/AddProduct" style={{textDecoration: "none", color: "white"}}><li className="nav-el"><AddBusinessIcon sx={{display: "inline-flex", verticalAlign: "text-bottom" }} fontSize="large"/> </li></Link>
        </ul>
        </nav>
        <nav style={{backgroundColor: "#FFD700"}}>
        <p style={{ border: "2px solid yellow", color: 'white', position: 'relative', top: '5'}}><TemporaryDrawer sx={{color: 'white'}}/></p>
        </nav>
        </>
    )
}