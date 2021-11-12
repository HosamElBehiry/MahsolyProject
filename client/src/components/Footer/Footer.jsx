import React, {useState} from 'react'
import './Footer.css';
import Loader from '../../public/images/loader.png';
import {IoIosSend} from 'react-icons/io';
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import {AiOutlineRight} from 'react-icons/ai';
import {BsWhatsapp} from 'react-icons/bs';
import {CgPhone} from 'react-icons/cg';
import { BsFillEnvelopeFill } from "react-icons/bs";
import {MdLocationOn} from 'react-icons/md';
import CopyRight from '../CopyRight/CopyRight';
import axios from 'axios';
function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/subscribers/',{email}).then(()=>{
      setError(false);
      setTimeout(() => {
        setError('')
      }, 3000);
    }).catch((err)=>{
      setError(true);
      setTimeout(() => {
        setError('')
      }, 3000);
      if(err.message.indexOf("409")){
        setErrorMsg('You are already subscriber')
      }
    })
    setEmail('')
  }

  return (
    <div className='container-fluid footer'>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-first-cont-1 mb-5">
                <img src={Loader} alt='' className='mb-2'  /> <span className='logo-footer-word'>Mahsoly</span>
              </div>
              <div className='footer-first-cont-2 mt-2'>
                <p>There are many variations of passages of lorem ipsum available, but the majority suffered.</p>
              </div>
              <div className='footer-first-cont-3 mt-2 mb-4'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input className='mb-1' required type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <button className='btn btn-warning'><IoIosSend /></button>
                </form>
              </div>
              <div className="footer-first-cont-4 ">
                <BsFacebook className='fs-5 me-5'/>
                <BsTwitter className='fs-5 me-5'/>
                <BsPinterest className='fs-5 me-5'/>
                <BsInstagram className='fs-5 me-5'/>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-second-1">
                <h4 className='mb-5'>Links</h4>
                <div className="mb-3 fs-6"><AiOutlineRight className="me-1 mb-1"/> Our Project</div>
                <div className="mb-3 fs-6"><AiOutlineRight className="me-1 mb-1"/>About Us</div>
                <div className="mb-3 fs-6"><AiOutlineRight className="me-1 mb-1"/>Our Service </div>
                <div className="mb-3 fs-6"><AiOutlineRight className="me-1 mb-1"/>UpComming</div>
                <div className="mb-3 fs-6"><AiOutlineRight className="me-1 mb-1"/>Volunteers</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-third-1">
                <h4 className='mb-5'>News</h4>
              </div>
              <div className="footer-third-2 mt-3 d-flex align-items-center justify-content-between">
                <div className='footer-third-2-img-div'>
                  <img className='mb-3 me-3' src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/02/organic-news-10-e1614194630371-150x150.jpg' height='70' width='70' alt=''/>
                </div>
                <div className="footer-third-2-desc">
                  <h6>Dec 3, 2020</h6>
                  <p>Simple and Delicious Keto Salads</p>
                </div>
              </div>
              <div className="footer-third-3 mt-3 d-flex align-items-center justify-content-between">
                <div className='footer-third-3-img-div'>
                  <img className='mb-3 me-3' src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/02/organic-news-6-e1608714911535-150x150.jpg' height='70' width='70' alt=''/>
                </div>
                <div className="footer-third-3-desc">
                  <h6>Dec 3, 2020</h6>
                  <p>Friendly Breakfast Ideas</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-forth-1">
                <h4 className='mb-5'>Contact</h4>
              </div>
              <div className="footer-forth-1-sub">
                <BsWhatsapp className='fs-5 me-2 mb-1 contact-footer-logo'/> <span className='footer-detail'>555 342 0032</span>
                <hr />
              </div>
              <div className="footer-forth-1-sub">
                <CgPhone className='fs-5 me-2 mb-1 contact-footer-logo'/> <span className='footer-detail'>666 888 0000</span>
                <hr />
              </div>
              <div className="footer-forth-1-sub">
                <BsFillEnvelopeFill className='fs-5 me-2 mb-1 contact-footer-logo'/> <span className='footer-detail'>Mahsoly@gmail.com</span>
                <hr />
              </div>
              <div className="footer-forth-1-sub">
                <MdLocationOn className='fs-4 me-2 mb-1 contact-footer-logo'/> <span className='footer-detail'>Mokattam Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>
        <CopyRight />
      </footer>
      <div  className={error ? 'error result-msg-footer mt-5 fw-bolder' : error === false ? 'success result-msg-footer mt-5 fw-bolder' : 'd-none'}>
        {error ? (errorMsg ? "You are already a Subscriber" : 'Error Invalid') : 'You are Subscriber Now'}
      </div>
    </div>
  )
}

export default Footer
