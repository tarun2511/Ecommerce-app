import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import VerifiedIcon from '@mui/icons-material/Verified';
import PolicyIcon from '@mui/icons-material/Policy';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProductDetails() {
    const [details, setDetails] = useState([]);
    const {id} = useParams();
    const [productDeleted, setProductDeleted] = useState(false);
    const [rating, setRating] = useState(1);
    const [userBid, setUserBid] = useState(0);
    const [submitBidError, setSubmitBidError] = useState(false);
    const maxRating = 5;
    const minRating = 1;
    const [loading, setLoading] = useState(false);


    const fetchDetails = async () => {
        setLoading(true)
        const resp = await axios.get(`http://localhost:4200/v1/products/product-details/${id}`);
        setDetails(resp.data);
        setTimeout(() => {
            setLoading(false)
        }, 300)
        
        
    }
    useEffect(() => {
        fetchDetails();
    }, [])

    const handleDelete = async (e) => {
        const resp = await axios.delete(`http://localhost:4200/v1/products/delete-product/${id}`);
        if (resp.status === 204) {
            setProductDeleted(true)
        }
    }

    function handleRatingChange(e){
        if(e > maxRating){
            e = maxRating
        }
        if(e < minRating){
            e = minRating
        }
        setRating(e);
    }

    const handleSubmitBid = async (e) => {
        e.preventDefault();
        if (userBid <= details.startingPrice){
            setSubmitBidError(true)
            setTimeout(() => {
                setSubmitBidError(false)
            }, 1500)
            
            return
        }
        else{
            const res = await axios.patch(`http://localhost:4200/v1/products/update-product`, {
                id: details._id,
                currentBid: userBid
            })           
        }
        fetchDetails();
    }



    return (
        <>
            <Navbar />
            <h1>Product details</h1>
            {   loading === true ?  <CircularProgress />:
                productDeleted ? <Alert severity="error">Product successfully deleted. <Link to="/">Back to home</Link></Alert> :
                    <div>
                        <div className="details-flex-container">
                            <div className="details-product-image-container">
                                <img src={details.image ? `http://localhost:4200/images/${details.image.data}` : null} alt="cover-img" className="details-product-cover-img" />
                                <div className="details-delete-bid">
                            <Button variant="outlined" color="error" size="small" onClick={e => handleDelete(e)} sx={{width: "100px", height: "25px", fontSize: "10px", marginLeft: "5px"}}><DeleteIcon /> Delete</Button>                       
                            </div>
                            </div>
                            <div className="product-details-container">
                                <h2>{details.name}</h2>
                                <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Starting price: ${details.startingPrice}</h4>
                                <h4 style={{marginTop: "10px", marginBottom: "10px"}}>Current bid: ${details.CurrentBid}</h4>

                                <p><strong>About the product:</strong></p>
                                <p>{details.description}</p>
                                <p style={{marginTop : "10px"}}><strong>Brand:</strong>{details.brand? details.brand : 'N/A'}</p>
                                <div className="site-features">
                                    <p>Fast delivery <OfflineBoltIcon sx={{display: "inline-flex", verticalAlign: "text-bottom" }}/></p>
                                    <p>6 months warranty <VerifiedIcon sx={{display: "inline-flex", verticalAlign: "text-bottom" }}/></p>
                                    <p>Genuine product <PolicyIcon sx={{display: "inline-flex", verticalAlign: "text-bottom" }}/></p>
                                   
                                </div>
                                <div className="details-rating">
                                <form>
                                <label htmlFor="bid-place">Place a bid: </label> 
                                <input type="Number" name="bid-place" value={userBid} min={details.startingPrice} onChange={e => setUserBid(e.target.value)}/>
                                <Button variant="contained" size="small" sx={{width: "40px", height: "20px", fontSize: "10px", marginLeft: "5px"}} onClick={handleSubmitBid}>Submit</Button><br />
                                </form>
                                {
                                    submitBidError? <Alert severity="error">Your bid should be greater than the current bid; i.e.${details.startingPrice}</Alert>: null
                                }
                                    <lablel htmlFor="rating">Rate the product: </lablel>
                                    <input type="Number" name="rating" min="0" max="5" value={rating} onChange={e => handleRatingChange(e.target.value)} style={{marginTop: "20px"}}/>
                                </div>
                            </div>
                        </div>            
                    </div>
            }
        </>
    )
}