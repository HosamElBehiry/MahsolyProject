import React,{useRef, useState, useEffect} from 'react'
import {IoMdArrowDropdown} from 'react-icons/io';
import {AiOutlinePlus} from 'react-icons/ai';
import './AddAgricultureCrop.css';
import {connect} from 'react-redux';
import {AddCrop} from '../ActionFolder/Actions/AgricultureCropActions';
import {getAllCrops} from '../ActionFolder/Actions/CropsActions'
import {withRouter} from 'react-router-dom';
// import { useTranslation } from 'react-i18next';



function AddAgricultureCrop(props) {
  // props.showAllCrops();
  const cropNameArrow = useRef(null);
  const cropNames = useRef(null);
  const measurement_ = useRef(null);
  const measurementBox = useRef(null);
  const measurementArrow = useRef(null);
  const [measureError, setMeasureError] = useState(false);
  const fileInput = useRef(null);
  const ImgSection = useRef(null);
  const units = ['Ton', 'KiloGram', 'Ardib', 'Sack', 'Piece', 'Box'];
  const [currentCrops, setCurrentCrops] = useState([])
  const [cro, setCro] = useState([])
  const [cropImg, setCropImg] = useState('');
  const [imgError, setImgError] = useState(false);
  const [cropName, setCropName] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measurement, setMeasurement] = useState("");
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [locationError, setLocationError] = useState(false);
  const [description, setDescription] = useState('');
  const [isCropNameOpened, setIsCropNameOpened] = useState(false);
  const [isMeasurementArrowOpened, setIsMeasurementArrowOpened] = useState(false);
  const findMyLocation = () =>{
    navigator.geolocation
    .getCurrentPosition
    ((position)=>{
    setLongitude(position.coords.longitude)
    setLatitude(position.coords.latitude)}
    ,(error)=>console.log(error))
  }
  const handleClick = (fromArrowIcon, e = '') => {
    if(fromArrowIcon){
      cropNames.current.style.display = (isCropNameOpened === false ? 'block' : "none");
      setIsCropNameOpened(!isCropNameOpened);
    }
    else{
      setIsCropNameOpened(true);
      cropNames.current.style.display = e.target.value !== '' ? 'block' : 'none';
      findSimilar(e.target.value)
    }
  }
  const findSimilar = (currentValue) =>{
    const result = []
    cro.forEach((crop)=>{
      if(crop.name.toLowerCase().includes(currentValue.toLowerCase())){
        result.push(crop);
      }
    });
    setCurrentCrops(result);
  }

  const handleClickMeasurement = () => {
    measurement_.current.style.display = (isMeasurementArrowOpened === false ? 'block' : "none");
    setIsMeasurementArrowOpened(!isMeasurementArrowOpened);
  }

  const changeCropName = (cropName, cropID) =>{
    setCropName(cropName)
    setName(cropID)
    handleClick(true);
  }

  const changeMeasurement = (measure, index) => {
    measurementBox.current.innerHTML = measure;
    setMeasurement(index + 1)
    handleClickMeasurement();
  }
  const handleAddCropSubmit = (e) =>{
    e.preventDefault();
    if(cropImg === ''){
      setImgError(true);
    }else if(measurement === ''){
      setMeasureError(true);
    }else if (longitude === '' || latitude === ''){
      setLocationError(true);
    }
    else{
      const formData = new FormData();
      formData.append('name', name === '' ? cropName: name);
      formData.append('images',cropImg);
      formData.append('description',description);
      formData.append('locationLongitude',longitude);
      formData.append('locationLatitude',latitude);
      formData.append('price',parseFloat(price));
      formData.append('quantity',parseInt(quantity));
      formData.append('quantityId',measurement);
      props.add(formData);
      props.history.push('/Crops')
    }
  }

  useEffect(() => {
    props.showAllCrops();
    const result = props.AllCrops.Crops.map((crop)=> crop );
    setCurrentCrops(result);
    setCro(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="agriculture-crops" >
        <h2 className='mb-3 fw-bolder text-center'>Agriculture Crops</h2>
        <form method='post' onSubmit={(e) => handleAddCropSubmit(e)} >
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box crop-name-box mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' name= 'name' required autoFocus 
                  placeholder='Crop Name' type='text' autoComplete='off' onKeyUp={(e) => {handleClick(false, e)}}
                  value={cropName} onChange={(e) => setCropName(e.target.value)} 
                /> 
                <IoMdArrowDropdown refs={cropNameArrow} 
                  className='ms-3 mb-1 bottom-arrow fs-5' 
                  onClick={()=> handleClick(true)}
                />
              </div>
              <div className="crop-names" ref={cropNames}>
                {isCropNameOpened && 
                    currentCrops.map((crop)=>{
                      return (
                        <div key={crop._id} 
                          onClick={()=> changeCropName(crop.name, crop._id)}>{crop.name}
                        </div>
                      )
                    })
                }
              </div>
            </div>
            <div className='selected-box quantity-id mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Price'  name='price' required
                type='number' min={1} value={price} onChange={(e) => setPrice(e.target.value)}/> 
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className='selected-box quantity mb-3'>
              <div className='select-parent'>
                <input className='mt-2 selected' placeholder='Quantity' name='quantity' 
                type='number' value={quantity} required min={1} 
                onChange={(e) => setQuantity(e.target.value)}/> 
              </div>
            </div>
            <div className={`selected-box quantity-id mb-3 ${measureError && 'error'} `}>
              <div className='select-parent'>
                <div className={`mt-2 selected ${measureError && 'error'}`}><span ref={measurementBox}>Measurement</span> 
                  <IoMdArrowDropdown refs={measurementArrow} className='ms-3 mb-1 bottom-arrow' 
                  onClick={()=> {setMeasureError(false);handleClickMeasurement()}}/></div>
                <div className="crop-measurements" ref={measurement_}>
                  {
                    units.map((unit, index)=>{
                      return <div key={index} onClick={()=> changeMeasurement(unit, index)}>{unit}</div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className={`selected-box location-longitude mb-3 ${locationError && 'error'}`}>
              <div className='select-parent'>
                <input className={`mt-2 selected ${locationError && 'error'}`} placeholder='Location Longitude' 
                type='number' onClick={() => {setLocationError(false);findMyLocation()}} value={longitude} onChange={(e) => setLongitude(e.target.value)}/> 
              </div>
            </div>
            <div className={`selected-box location-latitude mb-3 ${locationError && 'error'}`}>
              <div className='select-parent'>
                <input className={`mt-2 selected ${locationError && 'error'}`} placeholder='Location Latitude' 
                type='number' value={latitude} onClick={() => {setLocationError(false);findMyLocation()}}
                onChange={(e) => setLatitude(e.target.value)}/> 
              </div>
            </div>
          </div>
          <div className={`selected-box mb-3 ${imgError && 'error' }`}>
            <div className='select-parent'>
              <div className={`mt-2 selected ${imgError && 'error'}`}>
                <span ref={ImgSection}>Choose Image </span> 
                  <AiOutlinePlus className='ms-3 mb-1 bottom-arrow' 
                    onClick={()=> {setImgError(false);fileInput.current.click()}}
                  />
                <input type="file" className='d-none' name='images'
                  ref={fileInput} accept='images/*'
                  onChange= {(e) => {ImgSection.current.innerHTML = 'Image has been added';setCropImg(e.target.files[0])}}
                />
              </div>
            </div>
          </div>
          <textarea placeholder='Write Description' rows="5" 
            className='mb-3' value={description} required
            onChange={(e) => setDescription(e.target.value)}>
          </textarea>
          <button className='agriculture-crop-submit btn btn-success fw-bolder'>Add Agriculture Crop</button>
        </form>
      </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddAgricultureCrop));

