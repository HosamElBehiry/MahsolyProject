import React from 'react'
import './Home.css';
import OurHistory from '../../OurHistory/OurHistory';
import Offers from '../../Offers/Offers';
import ContactHome from '../../ContactHome/ContactHome';
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className='main-div'>
          <div className='first'>
            <h2 className='text-center'>Welcome to Our Web Site</h2>
            <h1 className='text-center fs-1' ><span>Agriculture</span> <br /> & Eco Farming</h1>
            <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/banner-1-shape-1.png' alt=''/>
            <p className='lead fs-4 text-center'>In Our Web Site You Can Buy & Sell Agriculture Crops, Agriculture Lands</p>
            <button className='btn btn-warning fs-4'>Discover More</button>
          </div>
        </div>
        <OurHistory />
        <Offers />
        <ContactHome />
      </div>
    )
  }
}
