import React, { useState } from 'react'
import './GetAllProducts.css';
import {BiUserCircle} from 'react-icons/bi';
import {FaRegComments} from 'react-icons/fa';
import {BsCart} from "react-icons/bs";
import {IoEyeOutline} from 'react-icons/io5';
import {FiHeart} from 'react-icons/fi';
import {AiOutlinePlusCircle, AiFillDelete} from 'react-icons/ai';
import {MdUpdate} from 'react-icons/md';
import {BsCurrencyDollar} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToFavourite} from '../ActionFolder/Actions/userActions';
import {deleteCrop} from '../ActionFolder/Actions/AgricultureCropActions';
import { deleteLand } from '../ActionFolder/Actions/LandsAction';

function GetAllProducts(props) {
  const errorMsg = '';
  const [error, setError] = useState('');
  const [favouriteCrops, setFavouriteCrops] = useState(props.userData !== {} ? props.userData?.favourites : undefined)
  const handleDelete = (productID) =>{
    let confirmMsg = window.confirm('Are You Sure You Want To Delete This Product ?')
    confirmMsg && (window.location.href.includes('Crops') ? props.delCrop(productID) : props.delLand(productID))
  }
  const handleFavouriteClick = (cropID) =>{
    if(favouriteCrops !== undefined){
      props.addFavourite(cropID)
      if(favouriteCrops.includes(cropID)){
        const filterdItems = favouriteCrops.filter((elem)=> elem !== cropID)
        setFavouriteCrops(filterdItems)
      }else{
        setFavouriteCrops([...favouriteCrops, cropID])
      }
    }else{
      setError(true)
      setTimeout(() => setError(''), 2000);
    }
  }
  return (
    <div className='container get-all-products'>
    <div className="row">
      {
        window.location.href.includes('/Crops') && props.crops && props.crops.map((crop)=>{
          let userDate = new Date(crop.createdAt).toString().split(' ');
          return (
            <div className="col-lg-4 mb-5 product" key={crop._id}>
              <img className='mb-2' alt='' src={`http://localhost:8080/${crop.images}`} />
              <Link to={`/Profile/${crop.Owner._id}`} className='text-decoration-none'><BiUserCircle className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">by {crop.Owner.name}</span></Link>
              <FaRegComments className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{crop.comments.length} Comments</span>
              <BsCurrencyDollar className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{crop.price} dollar</span>
              <h3 className='mt-2'>{crop.description.slice(0,40)} {crop.description.length > 40 && '...'}</h3>
              <div className="date">
                <h5>
                  <span className="text-center ms-1 fw-bolder">{userDate[2]}</span> 
                    <br />
                  <span className='text-center fw-bolder'>{userDate[1]}</span>
                </h5>
              </div>
              <div className="buy-see-love text-center">
                {crop.Owner._id !== props.userData?._id && 
                  <>
                    <span>
                      <FiHeart className={favouriteCrops !== undefined 
                        && favouriteCrops.includes(crop._id) ? 'active me-1' : 'me-1'} 
                        onClick={() => handleFavouriteClick(crop._id)}/>
                    </span>
                    <Link to="/singleProduct"><BsCart className='me-1'/></Link>
                  </>
                }
                <Link to={`/Crops/singleProduct/${crop._id}`}><IoEyeOutline className='me-1' /></Link>
                
                {props.userData && crop.Owner._id === props.userData?._id && 
                  <>
                    <span><MdUpdate className='me-1 update-icon'/></span>
                    <span><AiFillDelete className='me-1 delete-icon' onClick={() => handleDelete(crop._id)}/></span>
                  </> 
                }
              </div>
            </div>
          )
        })
      }
      {
        window.location.href.includes('/Lands') && props.lands && props.lands.map((land)=>{
          let userDate = new Date(land.createdAt).toString().split(' ');
          return (
            <div className="col-lg-4 mb-5 product" key={land._id}>
              <img className='mb-2' alt='' src={`http://localhost:8080/${land.image}`} />
              <Link to={`/Profile/${land.Owner._id}`} className='text-decoration-none'><BiUserCircle className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">by {land.Owner.name}</span></Link>
              <FaRegComments className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{land.comments.length} Comments</span>
              <BsCurrencyDollar className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{land.price} dollar</span>
              <h3 className='mt-2'>{land.description}</h3>
              <div className="date">
                <h5><span className="text-center ms-1 fw-bolder">{userDate[2]}</span> <br /><span className='text-center fw-bolder'>{userDate[1]}</span></h5>
              </div>
              <div className="buy-see-love text-center">
              {land.Owner._id !== props.userData?._id && 
                <>
                  <span>
                    <FiHeart className={favouriteCrops !== undefined 
                      && favouriteCrops.includes(land._id) ? 'active me-1' : 'me-1'} 
                      onClick={() => handleFavouriteClick(land._id)}/>
                  </span>
                  <Link to="/singleProduct"><BsCart className='me-1'/></Link>
                </>
              }
              <Link to={`/Lands/singleProduct/${land._id}`}><IoEyeOutline className='me-1' /></Link>
              {land.Owner._id === props.userData._id && 
                <>
                  <span><MdUpdate className='me-1 update-icon'/></span>
                  <span><AiFillDelete className='me-1 delete-icon' onClick={() => handleDelete(land._id)}/></span>
                </> 
              }
              </div>
            </div>
          )
        })
      }
    </div>
    {
      props.userData?._id && 
      <div className='add-product text-center mb-4'>
        {
          <Link to={window.location.href.endsWith('Lands')? '/Lands/addProducts' : '/Crops/addProducts'}>
            <button className='btn btn-success fw-bolder'> 
              <AiOutlinePlusCircle className='mb-2 me-2 fw-bolder fs-2'/>Add Agriculture 
                {window.location.href.endsWith('Lands')? ' Land' : ' Crop'}
            </button>
          </Link>
        }
      </div>
    }
    <div className="pages text-center d-flex align-items-center justify-content-center">
    </div>
    <div  className={error ? 'error result-msg-footer mt-5 fw-bolder' : error  === false ? 'success result-msg-footer mt-5 fw-bolder' : 'd-none'}>
    {error ? (errorMsg ? "asdasdas" : 'You are Not Signed In') : 'You Successfully Loged In'}
  </div>
  </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    userData: state.userReducer.userInfo,
    crops: state.CropReducer.Crops,
    lands: state.Lands.lands
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addFavourite: (product_id) => dispatch(addToFavourite(product_id)),
    delCrop: (crop_id) => dispatch(deleteCrop(crop_id)),
    delLand: (land_id) => dispatch(deleteLand(land_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAllProducts);
