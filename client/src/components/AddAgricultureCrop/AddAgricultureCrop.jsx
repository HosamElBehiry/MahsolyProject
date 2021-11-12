import React, { Component } from 'react'
import {IoMdArrowDropdown} from 'react-icons/io';
import {AiOutlinePlus} from 'react-icons/ai';
import './AddAgricultureCrop.css';
import {connect} from 'react-redux';
import {AddCrop} from '../ActionFolder/Actions/AgricultureCropActions';
import {getAllCrops} from '../ActionFolder/Actions/CropsActions'
import axios from 'axios';
class AddAgricultureCrop extends Component {
  constructor(props) {
    super(props)
    this.isMeasurementArrowOpened = false;
    this.cropNameArrow = React.createRef();
    this.cropNames = React.createRef();
    this.measurement = React.createRef();
    this.measurementBox = React.createRef();
    this.measurementArrow = React.createRef();
    this.fileInput = React.createRef();
    this.ImgSection = React.createRef();
    this.state = {
      units : ['Ton', 'KiloGram', 'Ardib', 'Sack', 'Piece', 'Box'],
      currentCrops: [],
      cro: [],
      cropImg: '',
      cropName: '',
      price: '',
      name: '',
      quantity: '',
      measurement: -1,
      longitude: '',
      latitude: '',
      description: '',
      isCropNameOpened : false
    }
    this.props.showAllCrops();
  }
  
  handleClick(fromArrowIcon, e = ''){
    if(fromArrowIcon){
      this.cropNames.current.style.display = (this.state.isCropNameOpened === false ? 'block' : "none");
      this.setState({isCropNameOpened: !this.state.isCropNameOpened})
    }
    else{
      this.setState({isCropNameOpened: true})
      this.cropNames.current.style.display = e.target.value !== '' ? 'block' : 'none';
      this.findSimilar(e.target.value)
    }
  }

  findSimilar = (currentValue) =>{
    const result = []
    this.state.cro.forEach((crop)=>{
      if(crop.name.toLowerCase().includes(currentValue.toLowerCase())){
        result.push(crop);
      }
    });
    this.setState({currentCrops: result})
  }

  handleClickMeasurement(){
    this.measurement.current.style.display = (this.isMeasurementArrowOpened === false ? 'block' : "none");
    this.isMeasurementArrowOpened = !this.isMeasurementArrowOpened;
  }

  changeCropName = (cropName, cropID) =>{
    this.setState({cropName});
    this.setState({name: cropID})
    this.handleClick(true);
  }

  changeMeasurement = (measure, index) => {
    this.measurementBox.current.innerHTML = measure;
    this.setState({measurement: index + 1});
    this.handleClickMeasurement();
  }
  
  handleSubmit = (e) =>{
    e.preventDefault();
    const {name,price,quantity,longitude, latitude, description, cropImg} = this.state;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('images',cropImg);
    formData.append('description',description);
    formData.append('locationLongitude',longitude);
    formData.append('locationLatitude',latitude);
    formData.append('price',parseFloat(price));
    formData.append('quantity',parseInt(quantity));
    formData.append('quantityId',this.state.measurement);
    axios.post(`https://httpbin.org/anything`, formData).then((response)=>{
      console.log(response)
    }).catch((err)=>{
      console.log('Error', err)
    })
    // this.props.add(formData);
  }

  componentDidMount(){
    const result = this.props.AllCrops.Crops.map((crop)=> crop );
    this.setState({currentCrops: result, cro: result})
  }
  
  render() {
    const {price,quantity,longitude, latitude, description} = this.state;
    return (
      <div className="agriculture-crops" >
        <h2 className='mb-3 fw-bolder text-center'>Agriculture Crops</h2>
        <form method='post' onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data">
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box crop-name-box mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' name= 'name' required autoFocus 
                  placeholder='Crop Name' type='text' autoComplete='off' onKeyUp={(e) => {this.handleClick(false, e)}}
                  value={this.state.cropName} onChange={(e) => this.setState({cropName: e.target.value})} 
                /> 
                <IoMdArrowDropdown refs={this.cropNameArrow} 
                  className='ms-3 mb-1 bottom-arrow fs-5' 
                  onClick={()=> this.handleClick(true)}
                />
              </div>
              <div className="crop-names" ref={this.cropNames}>
                {this.state.isCropNameOpened && 
                    this.state.currentCrops.map((crop)=>{
                      return (
                        <div key={crop._id} onClick={()=> this.changeCropName(crop.name, crop._id)}>{crop.name}</div>
                      )
                    })
                }
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Price'  name='price'
                type='number' value={price} onChange={(e) => this.setState({price: e.target.value})}/> 
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box quantity mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Quantity' name='quantity' 
                type='number' value={quantity} onChange={(e) => this.setState({quantity: e.target.value})}/> 
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <div className='mt-2 selected'><span ref={this.measurementBox}>Measurement </span> 
                  <IoMdArrowDropdown refs={this.measurementArrow} className='ms-3 mb-1 bottom-arrow' 
                  onClick={()=> this.handleClickMeasurement()}/></div>
                <div className="crop-measurements" ref={this.measurement}>
                  {
                    this.state.units.map((unit, index)=>{
                      return <div key={index} onClick={()=> this.changeMeasurement(unit, index)}>{unit}</div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box location-longitude mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Location Longitude' 
                type='number' value={longitude} onChange={(e) => this.setState({longitude: e.target.value})}/> 
              </div>
            </div>
            <div className='selected-box location-latitude mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Location Latitude' 
                type='number' value={latitude} onChange={(e) => this.setState({latitude: e.target.value})}/> 
              </div>
            </div>
          </div>
          <div className='selected-box mb-3'>
            <div className='select-parent'>
              <div className='mt-2 selected'>
                <span ref={this.ImgSection}>Choose Image </span> 
                  <AiOutlinePlus className='ms-3 mb-1 bottom-arrow' 
                    onClick={()=> this.fileInput.current.click()}
                  />
                <input type="file" className='d-none' name='images'
                  ref={this.fileInput} accept='images/*'
                  onChange= {(e) => {this.ImgSection.current.innerHTML = 'Image has been added';this.setState({cropImg: e.target.files[0]})}}
                />
              </div>
            </div>
          </div>
          <textarea placeholder='Write Description' rows="5" 
            className=' mb-3' value={description} 
            onChange={(e) => this.setState({description: e.target.value})}>
          </textarea>
          <button className='agriculture-crop-submit btn btn-success fw-bolder'>Add Agriculture Crop</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    addedCrop: state.CropReducer.isAdded,
    AllCrops: state.Crops
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    add: (formData) => dispatch(AddCrop(formData)),
    showAllCrops: () => dispatch(getAllCrops())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAgricultureCrop);