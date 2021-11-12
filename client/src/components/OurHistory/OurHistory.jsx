import React from 'react'
import './OurHistory.css';
import Loader from '../../public/images/loader.png';
import { GiFarmer } from "react-icons/gi";
import {FaTractor} from 'react-icons/fa'
function OurHistory() {
  return (
    <div style={{marginBottom : '150px'}}>
      <div className="yellow-bckgrnd"></div>
      <div className="container first">
        <div className="row">
          <div className="col-lg-4">
            <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-1.jpg' alt='' />
            <div className='img-title fw-bolder text-center fs-3'>Agriculture Crops</div>
          </div>
          <div className="col-lg-4">
            <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-2.jpg' alt='' />
            <div className='img-title fw-bolder text-center fs-3'>Agriculture Lands</div>
          </div>
          <div className="col-lg-4">
            <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-3.jpg' alt='' />
            <div className='img-title fw-bolder text-center fs-3'>Companies</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className='history-left'>
              <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/about-1.jpg' alt='' />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="history-right">
              <div className="logo-history mb-3">
                <img  src={Loader} alt='' />
                <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/about-2.jpg' alt=''/>
              </div>
              <h6 className='history-greeting'>Welcome to Mahsoly</h6>
              <h1 className='fw-bolder mb-5'>Better Agriculture <br /> for Better Future</h1>
              <h3 className='lead fs-4 mb-5'>We have many years of agriculture & eco farming experience globaly, work with <span>professionals</span></h3>
              <h6 className='history-description'>There are many variations of passages of lorem ipsum available but the majority have suffered alteration in some form by injected humor or random word that donor send minimum take minute some lorem ipsum text which don't look even.</h6>
              <hr />
              <div className='d-flex justify-content-around align-items-center'>
                <div className='d-flex justify-content-around align-items-center history-prof-parent' >
                  <GiFarmer className='history-farmer-logo' />
                  <h4 className='history-professional'>Professional Traders</h4>
                </div>
                <div className='d-flex justify-content-around align-items-center history-prof-parent'>
                  <FaTractor className='history-farmer-logo me-3'/>
                  <h4 className='history-professional mt-1'>Professional Services</h4>
                </div>
              </div>
              <hr />
              <div className="buttons d-flex justify-content-around align-items-center">
                <button className='btn btn-warning fs-5'>Discover More</button>
                <button className='btn btn-warning fs-5'>Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurHistory
