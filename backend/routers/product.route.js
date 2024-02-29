const express = require("express");
const router = express.Router();
const Product = require("../db/product.model");


router.get("/", async (req, res) => {
    try {
        const query = req.query.item;
        const re = new RegExp(req.query.item, "i")
        //const re = new RegExp("^" + req.query.item + "$", "i")
        if(query){
            //const searchedProduct = await Product.find({name: {$regex: /samsung/i}});
            const searchedProduct = await Product.find({$or: [{name: re}, {category: re}]});
            return res.status(200).json({"products": searchedProduct, "msg": "success!"})
        }
        const allProducts = await Product.find();
        return res.status(200).json({ "products": allProducts, "msg": "success!" });
    }
    catch (err) {
        return res.status(400).json(err);
    }
})


router.get(`/product-details/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const newID = id.replace(":", "")
        const productDetails = await Product.findById(`${newID}`);
        return res.status(200).json(productDetails);
    }
    catch (err) {
        return res.status(400).json(err);
    }
})

router.delete('/delete-product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id)
        return res.status(204).json("product deleted");
    }
    catch (err) {
        return res.status(400).json(err);
    }
})

router.patch('/update-product', async(req, res) => {
    try{
        const {id} = req.body;
        const {currentBid} = req.body;
        const resp = await Product.findByIdAndUpdate(id, {CurrentBid: currentBid})
        return res.status(201).json(resp);
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err);
    }
})


module.exports = router;