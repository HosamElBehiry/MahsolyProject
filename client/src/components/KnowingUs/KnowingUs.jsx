import React from 'react'
import './KnowingUs.css';
import Loader from '../../public/images/loader.png';
import {FcOk} from 'react-icons/fc';
import {FaPlay} from 'react-icons/fa';
import {RiPlantLine} from 'react-icons/ri'
function KnowingUs() {
  return (
    <div className="container-fluid knowing-us">
      <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="col-lg-5 pt-4 pb-4 knowing-left">
              <img className='img-fluid' src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/video-1-1.jpg' alt=''/>
              <FaPlay className='playMark' />
            </div>
            <div className="col-lg-6 col-lg-offset-1 mr-4 knowing-right">
              <img alt='' src={Loader} className="pb-3"/>
              <h5 className='pb-0'>Get to Know Us</h5>
              <h1 className='knowing-title fw-bolder pb-2 fs-1'>Growing Healthy Food</h1>
              <p className='lead'>Lorem ipsum dolor sit amet nsectetur cing elituspe ndisse suscipit sagitis leo sit</p>
              <ul className='list-unstyled'>
                <li ><FcOk className='knowing-correct-mark me-2'/>Nsectetur cing elit.</li>
                <li ><FcOk className='knowing-correct-mark me-2'/>Suspe ndisse suscipit sagittis leo.</li>
                <li ><FcOk className='knowing-correct-mark me-2'/>Entum estibulum dignissim posuere.</li>
              </ul>
              <hr />
              <div className="total-products-summary">
                <RiPlantLine className='fs-1'/>
                <div className='fs-2 d-inline count fw-bolder'> 870,500 </div>
                <div className='fs-4 fw-bolder'> Total Agriculture Crops, Lands </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default KnowingUs
