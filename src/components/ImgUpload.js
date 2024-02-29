import React,{useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import {Alert} from "@mui/material";


export default function ImgUpload () {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [startingPrice, setStartingPrice] = useState(0);
    const [category, setCategory] = useState("Others");
    const [brand, setBrand] = useState("");

    const categories = ["Electronics", "Appliances", "Fashion", "Computers&Laptops"
    , "Mobiles", "Sports", "Books", "Beauty&Health", "Groceries","Stationary", "Others"];

    function handleSubmit (e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("image", image);
        formData.append("startingPrice", startingPrice)
        formData.append("category", category);
        formData.append("brand", brand);
        axios.post(`http://localhost:4200/upload`, 
            formData)
        .then(res => {
            setSuccess(true)
            setName("");
            setDesc("");
            setImage([]);
            setStartingPrice(0);
            setBrand("");
            setCategory("Others")
            setTimeout(() => {
                setSuccess(false)   
            }, 3000)}
            ).catch((err) => {
                console.log(err)
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 3000)
            });
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value)
    }

    return(
        <>
        {
            success? <Alert severity="success">Hurrayyy! Product successfully uploaded.</Alert> : null
        }
        {
            error? <Alert severity="error">OOPS! Product can't be uploaded.</Alert>: null
        }

        <div className="img-upload-form-container">
            <h2 style={{marginBottom: "20px", textDecoration: "underline"}}>Enter product details</h2>
        <form method="POST" encType="multipart/form-data" className="addProductForm">
        {/* encType="multipart/form-data" - put it inside form for img upload*/}
            <label htmlFor="product_name" className="addProductForm-label">Enter product name:  </label>
            <input type="text" id="product_name" value={name} name="product_name" variant="outlined" size="small" onChange={e => setName(e.target.value)} style={{width: "300px", height: "40px"}}/><br/>
            <label htmlFor="product_description" className="addProductForm-label">Enter product description:  </label>
            <textarea name="product_description" sx={{marginTop: "10px"}} className="addProductForm-field" multiline="true" value={desc} onChange={e => setDesc(e.target.value)} style={{width: "300px", height: "100px"}}></textarea><br />
            <label htmlFor="starting_price" className="addProductForm-label">Starting price($):</label>
            <input type="Number" name="starting_price" className="addProductForm-field" value={startingPrice} onChange={e => setStartingPrice(e.target.value)}/><br />
            <label htmlFor="brand" className="addProductForm-label">Brand name:</label>
            <input type="text" name="brand" className="addProductForm-field" value={brand} onChange={e => setBrand(e.target.value)}/><br />
        
        <label htmlFor="category" className="addProductForm-label">Category:</label>
        <select name="category" className="addProductForm-field" value={category} onChange={handleCategoryChange}>
            {
                categories.map((el) => {
                    return <option value={el}>{el}</option>
                })
            }
        </select>
        <br />
        <div className="addProduct-img-submit">
        <input multiple type="file" onChange={(e) => {setImage(e.target.files[0])}} name="image"/>
        <Button variant="contained" size="small" onClick={handleSubmit}>Submit</Button>
        </div>
        </form>
        </div>
        </>
    )
}