const express = require('express');
const app = express();
const product_route = require("./routers/product.route");
const mongoose = require("mongoose");
const multer = require('multer');
const Product = require("./db/product.model");
const path = require("path");


const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'})); //to allow origin
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
const port = 4200;
app.use("/v1/products", product_route);
app.get("/", (req, res) => {
    res.send("hello from the backend")
})

//storage
const Storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: Storage}).single("image");  //single("image") - the name inside the brackets has to be same as form field name

app.post("/upload", upload, (req, res, err) => {
            const {name, desc, startingPrice, category, brand} = req.body;
            const filename = req.file? req.file.filename : "null"
            const prod = new Product({
                name: name,
                description: desc,
                startingPrice: startingPrice,
                category: category,
                brand: brand,
                image: {
                    data: filename,
                    contentType: "image/png"
                }
            })

            prod.save()
            .then(() => res.status(200).json({msg: "successfully uploaded"}))
            .catch(err => res.status(400).json(err));
    })

const server = () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("successfully connected to the DB");
    }
    catch(err){
        console.log(err);
    }
    app.listen(port, () => {
        console.log(`server is listening at port ${port}`);
    })
}

server();