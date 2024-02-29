import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import Products from "../components/Products";


import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Home() {
  return (
    <>
    <Navbar />
    <Products />
    <footer className="footer" style={{marginTop: '50px'}}>
      <div style={{marginLeft: '150px', marginTop: '30px', display: 'inline-block'}}>
      <ul style={{listStyle:'none'}}>
      <li>About</li>
      <li>Help</li>
      <li>Contact us: Instagram <InstagramIcon /> Facebook<FacebookIcon /></li>

      </ul>
      </div>
    </footer>
    </>
  )
}