import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {Container } from '@mui/material';
import {Link} from "react-router-dom";
import productContext from '../context/productContext';
import banner from "../images/banner1.jpg"
import banner2 from "../images/banner2.jpg";
import {Button} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function Products() {
    // const [products, setProducts] = useState([]);
    const {products, setProducts, search, setSearch} = useContext(productContext);
    const [isLoading, setIsLoading] = useState(false)
    let bannerImage = [banner, banner2];
    let imageIndex = 0;

    const fetchProducts = async() => {
        if(search === true){
            return
        }
        const res = await axios.get("http://localhost:4200/v1/products/");
        const products = res.data.products;
        console.log(products);
        setProducts(products);
    }

    const handleBannerImage = () => {
        let img = document.getElementById('banner-img')
        if(img.src == banner2){
            img.src = banner
        } 
        else if (img.src == banner){
            img.src = banner2
        }
        else{
            img.src = banner2
        }
       
    }

    useEffect(() => {
        setIsLoading(true)
        fetchProducts();
        setTimeout(() => {
            setIsLoading(false);
        }, 300)
    }, [search])

  return (
    <Container>
        { search? null :
        <div className="home-banner" style={{display: 'flex'}}>
            <img src={banner} alt="banner" id="banner-img" style={{width: '1140px'}}/>
            <Button onClick={handleBannerImage}><ArrowForwardIosIcon /></Button>
        </div>
        }
        <h2>Products</h2>
        { isLoading? <div className="loading-bar"><CircularProgress /></div> :
        <div className="products-container">
        { products.length === 0? <h4>No products found!</h4> :
        <ul className="products-home-list">
            {
                products.map((el) => {
                    return <Link to={`/product-details/${el._id}`} style={{textDecoration: "none", color: "black"}}><li key={el._id} className="product-list"><img src={`http://localhost:4200/images/${el.image.data}`} alt="cover-img" className="cover-img"/> 
                    <p style={{fontWeight:"500"}}>{el.name.length> 35? `${el.name.substring(0, 36)}...`: el.name}</p>
                    <p>${el.startingPrice? el.startingPrice : 0}</p></li></Link>
                }
                )
            }
        </ul> 
        }
        <hr />
        <div className="next-prev-btns" style={{display: 'flex', justifyContent: 'space-between' }}>
            <Button><NavigateBeforeIcon /></Button>
            <Button><NavigateNextIcon /></Button>
        </div>
        </div>
}
    </Container>
  )
}
