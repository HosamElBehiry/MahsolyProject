import React, { useState, useRef } from 'react'
import {IoMdArrowDropdown} from 'react-icons/io';
import {AiOutlinePlus} from 'react-icons/ai';
import {AddNewLand} from '../ActionFolder/Actions/LandsAction';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import './AddAgricultureLand.css';

function AddAgricultureLand(props) {
  const [isTypeArrowOpened, setIsTypeArrowOpened] = useState(false);
  const [isMeasurementArrowOpened, setIsMeasurementArrowOpened] = useState(false);
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [landType, setLandType] = useState('')
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locationError, setLocationError] = useState(false);
  const [landImg, setLandImg] = useState('');
  const [landMeasurement, setLandMeasurement] = useState('');
  const types = ['Mud', 'Sandy', 'Squirt', 'Silt', 'Mixture', 'Calcareous'];
  const units = ['Acre', 'Carat', 'Share'];
  const typeBox = useRef(null);
  const [typeError, setTypeError] = useState(false);
  const type = useRef(null);
  const measurement = useRef(null);
  const [measureError, setMeasureError] = useState(false);
  const measurementBox = useRef(null);
  const landImgFile = useRef(null);
  const ImgSection = useRef('')
  const [imgError, setImgError] = useState(false);

  const handleClickType = () => {
    typeBox.current.style.display = (!isTypeArrowOpened ? 'block' : "none");
    setIsTypeArrowOpened(!isTypeArrowOpened)
  }
  const handleMeasurement = () => {
    measurementBox.current.style.display = (!isMeasurementArrowOpened ? 'block' : "none");
    setIsMeasurementArrowOpened(!isMeasurementArrowOpened)
  }
  const changeType = (newType) => {
    type.current.innerHTML = newType;
    setLandType(types.indexOf(newType) + 1);
    handleClickType();
  }
  const changeMeasurement = (newMeasurement) => {
    measurement.current.innerHTML = newMeasurement;
    setLandMeasurement(units.indexOf(newMeasurement) + 1);
    handleMeasurement();
  }
  const spectifyLocation = () =>{
    navigator.geolocation
    .getCurrentPosition(
      (position)=>{
        setLongitude(position.coords.longitude); 
        setLatitude(position.coords.latitude)
      },
      (error)=> alert('Error', error)
      )
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      if(landType === ''){
        setTypeError(true);
      } else if (longitude === '' || latitude === ''){
        setLocationError(true);
      }else if (landMeasurement === ''){
        setMeasureError(true);
      }else if (landImg === ''){
        setImgError(true)
      }else {
        const formData = new FormData();
        formData.append('description', description)
        formData.append('area', area)
        formData.append('image', landImg)
        formData.append('longitude', longitude);
        formData.append('latitude', latitude);
        formData.append('type', landType);
        formData.append('price', price);
        formData.append('measurement', landMeasurement);
        props.addLand(formData);
        props.history.push('/Lands');
      }
    }
    
  return (
    <div className="agriculture-lands" >
        <h2 className='mb-3 fw-bolder text-center'>Agriculture Lands</h2>
        <form method='post' onSubmit={(e)=>handleSubmit(e)}>
        <div className="d-flex align-items-center justify-content-between">
            <div className={`selected-box quantity mb-3 ${typeError && 'error'} `}>
              <div className='select-parent'>
                <div className={`mt-2 selected ${typeError && 'error'}`}>
                  <span ref={type}>Type</span> 
                  <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' 
                    onClick={()=> {setTypeError(false);handleClickType()}}/>
                </div>
                <div className="crop-names" ref={typeBox}>
                  {types.map((t,i)=>{ return(<div key={i} onClick={()=> changeType(t)}>{t}</div>)})}
                </div>
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Price' type='number' required
                  value={price} onChange={(e)=> setPrice(e.target.value)} min={1} 
                /> 
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box quantity mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Area' type='number'
                  value={area} onChange={(e)=> setArea(e.target.value)} min={1} required
                /> 
              </div>
            </div>
            <div className={`selected-box quantity-id mb-3 ${measureError && 'error'} `}>
              <div className='select-parent'>
                <div className={`mt-2 selected ${measureError && 'error'}`}>
                  <span ref={measurement}>Measurement </span> 
                  <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' 
                    onClick={() => {setMeasureError(false);handleMeasurement()}}/>
                </div>
                <div className="crop-names" ref={measurementBox}>
                  {units.map((u,i)=> {return (<div key={i} onClick={()=> changeMeasurement(u)}>{u}</div>)})}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className={`selected-box location-longitude mb-3 ${locationError && 'error'}`}>
              <div className='select-parent'>
                <input className={`mt-2 selected ${locationError && 'error'}`} placeholder='Location Longitude' 
                  type='number' value={longitude} onChange={(e)=>setLongitude(e.target.value)} 
                  onClick={() => {setLocationError(false);spectifyLocation()}}
                /> 
              </div>
            </div>
            <div className={`selected-box location-latitude mb-3 ${locationError && 'error'}`}>
              <div className='select-parent'>
                <input className={`mt-2 selected ${locationError && 'error'}`} placeholder='Location Latitude' 
                  type='number' value={latitude} onChange={(e)=>setLatitude(e.target.value)} 
                  onClick={() => {setLocationError(false);spectifyLocation()}}
                /> 
              </div>
            </div>
          </div>
          <div className={`selected-box mb-3 ${imgError && 'error'}`}>
            <div className='select-parent'>
              <div className={`mt-2 selected ${imgError && 'error'} `}>
                <span ref={ImgSection}>Choose Images </span> 
                <AiOutlinePlus className='ms-3 mb-1 bottom-arrow' onClick={()=>{setImgError(false);landImgFile.current.click()}}/>
                <input ref={landImgFile} type="file" className='d-none' accept='images/*'
                  onChange={(e)=> {ImgSection.current.innerHTML=`Image has been added` ; setLandImg(e.target.files[0])}} 
                />
              </div>
            </div>
          </div>
          <textarea placeholder='Write Description' rows="5"  required
            className=' mb-3' value={description} onChange={(e)=> setDescription(e.target.value)}>
          </textarea>
          <button className='agriculture-crop-submit btn btn-success fw-bolder' type='submit'>Add Agriculture Land</button>
        </form>
      </div>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addLand : (formData) => dispatch(AddNewLand(formData)) 
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddAgricultureLand))
