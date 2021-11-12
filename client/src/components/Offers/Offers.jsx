import React from 'react';
import './Offers.css'
import Loader from '../../public/images/loader.png';
import {FaTractor, FaHandHoldingHeart} from 'react-icons/fa';
import {GiFruitTree} from 'react-icons/gi';
class Offers extends React.Component {
  render() {
    return (
      <div className="container-fluid offers">
        <header className='text-center pt-5'>
            <img src={Loader} alt='' />
            <h5 className='fw-bolder mb-1'>Welcome to Mahsoly</h5>
            <h1>What We're Offering</h1>
        </header>
        <div className="container offers">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-7.jpg' alt='' />
              <div className="offers-parent">
                <div className='offers-cont-shape'><GiFruitTree /></div>
                <h3 className='text-center fw-bolder offers-ag-cont'>Agriculture Lands</h3>
                <p className='offer-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, harum est?</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-5.jpg' alt='' />
              <div className="offers-parent">
                <div className='offers-cont-shape'><FaHandHoldingHeart /></div>
                <h3 className='text-center fw-bolder offers-ag-cont'>Agriculture Crops</h3>
                <p className='offer-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, harum est?</p>
              </div>  
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/service-6.jpg' alt='' />
              <div className="offers-parent">
                <div className='offers-cont-shape'><FaTractor/></div>
                <h3 className='text-center fw-bolder offers-ag-cont'>Companies</h3>
                <p className='offer-desc'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, harum est?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Offers;
