import React from 'react';
import ImgUpload from "../components/ImgUpload";
import Navbar from "../components/Navbar";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function AddProduct() {
  return (
    <div>
        <Navbar />
        <div className="upload-form-container">
        <ImgUpload />
        </div>
        <footer className="footer" style={{marginTop: '50px'}}>
      <div style={{marginLeft: '50px', marginTop: '30px', display: 'inline-block'}}>
      <ul style={{listStyle:'none'}}>
      <li>About</li>
      <li>Help</li>
      <li>Contact us: Instagram <InstagramIcon /> Facebook<FacebookIcon /></li>

      </ul>
      </div>
    </footer>
    </div>
  )
}
