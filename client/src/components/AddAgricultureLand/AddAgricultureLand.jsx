import React, { Component } from 'react'
import {IoMdArrowDropdown} from 'react-icons/io';
import {AiOutlinePlus} from 'react-icons/ai';
import './AddAgricultureLand.css';

export default class AddAgricultureLand extends Component {
  constructor(props) {
    super(props)
    this.isTypeArrowOpened = false;
    this.isTypeTradingArrowOpened = false;
    this.typeTradingBox = React.createRef();
    this.typeBox = React.createRef();
    this.type = React.createRef();
    this.measurement = React.createRef();
    this.measurementBox = React.createRef();
    this.isMeasurementArrowOpened = false;
    this.typeTrading = React.createRef();
  }

  handleClickType(){
    this.typeBox.current.style.display = (this.isTypeArrowOpened === false ? 'block' : "none");
    this.isTypeArrowOpened = !this.isTypeArrowOpened;
  }

  handleMeasurement(){
    this.measurementBox.current.style.display = (this.isMeasurementArrowOpened === false ? 'block' : "none");
    this.isMeasurementArrowOpened= !this.isMeasurementArrowOpened;
  }

  handleTypeTrading(){
    this.typeTradingBox.current.style.display = (this.isTypeTradingArrowOpened === false ? 'block' : "none");
    this.isTypeTradingArrowOpened= !this.isTypeTradingArrowOpened;
  }

  changeType(type){
    this.type.current.innerHTML = type;
    this.handleClickType();
  }

  changeMeasurement(measurement){
    this.measurement.current.innerHTML = measurement;
    this.handleMeasurement();
  }

  changeTypeTrading(typeTrading){
    this.typeTrading.current.innerHTML = typeTrading;
    this.handleTypeTrading();
  }

  
  
  render() {
    return (
      <div className="agriculture-lands" >
        <h2 className='mb-3 fw-bolder text-center'>Agriculture Lands</h2>
        <form action="" method='post'>
        <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box quantity mb-3'>
              <div className='select-parent'>
                <div className='mt-2 selected'>
                  <span ref={this.type}>Type</span> 
                  <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' 
                    onClick={()=> this.handleClickType()}/>
                </div>
                <div className="crop-names" ref={this.typeBox}>
                  <div onClick={()=> this.changeType('Mud')}>Mud</div>
                  <div onClick={()=> this.changeType('Sandy')}>Sandy</div>
                  <div onClick={()=> this.changeType('Squirt')}>Squirt</div>
                  <div onClick={()=> this.changeType('Silt')}>Silt</div>
                  <div onClick={()=> this.changeType('Mixture')}>Mixture</div>
                  <div onClick={()=> this.changeType('Calcareous')}>Calcareous</div>
                </div>
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Price' type='number' /> 
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box quantity mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Area' type='number' /> 
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <div className='mt-2 selected'>
                  <span ref={this.measurement}>Measurement </span> 
                  <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' 
                    onClick={() => this.handleMeasurement()}/>
                </div>
                <div className="crop-names" ref={this.measurementBox}>
                  <div onClick={()=> this.changeMeasurement('Acre')}>Acre</div>
                  <div onClick={()=> this.changeMeasurement('Carat')}>Carat</div>
                  <div onClick={()=> this.changeMeasurement('Share')}>Share</div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box location-longitude mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Location Longitude' type='number' /> 
              </div>
            </div>
            <div className='selected-box location-latitude mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Location Latitude' type='number' /> 
              </div>
            </div>
          </div>
          <div className='selected-box mb-3'>
            <div className='select-parent'>
              <div className='mt-2 selected'><span>Choose Images </span> <AiOutlinePlus className='ms-3 mb-1 bottom-arrow'/></div>
            </div>
          </div>
          <textarea placeholder='Write Description' rows="5" className=' mb-3'></textarea>
          <button className='agriculture-crop-submit btn btn-success fw-bolder'>Add Agriculture Land</button>
        </form>
      </div>
    )
  }
}
