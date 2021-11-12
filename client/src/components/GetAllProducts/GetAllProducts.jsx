import React, { Component } from 'react'
import './GetAllProducts.css';
import {BiUserCircle, BiChevronLeft, BiChevronRight} from 'react-icons/bi';
import {FaRegComments} from 'react-icons/fa';
import {BsCart} from "react-icons/bs";
import {IoEyeOutline} from 'react-icons/io5';
import {FiHeart} from 'react-icons/fi';
import {AiOutlinePlusCircle, AiFillDelete} from 'react-icons/ai';
import {MdUpdate} from 'react-icons/md';
import {BsCurrencyDollar} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {AddToFavoutite} from '../ActionFolder/Actions/userActions';
import {deleteCrop} from '../ActionFolder/Actions/AgricultureCropActions';
class GetAllProducts extends Component {

  handleDeleteCrop = (crop_id) =>{
    let confirmMsg = window.confirm('Are You Sure You Want To Delete This Crop ?')
    if(confirmMsg){
      this.props.delCrop(crop_id);
      window.location.reload();
    }
  }
  
  render() {
    return (
      <div className='container get-all-products'>
        <div className="row">
          {
            this.props.crops && this.props.crops.map((crop)=>{
              let userDate = new Date(crop.createdAt).toString().split(' ');
              return (
                <div className="col-lg-4 mb-5 product" key={crop._id}>
                  <img className='mb-2' alt='' src={`http://localhost:8080/${crop.images}`} />
                  <BiUserCircle className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">by {crop.Owner.name}</span>
                  <FaRegComments className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{crop.comments.length} Comments</span>
                  <BsCurrencyDollar className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{crop.price} dollar</span>
                  <h3 className='mt-2'>{crop.description}</h3>
                  <div className="date">
                    <h5><span className="text-center ms-1 fw-bolder">{userDate[2]}</span> <br /><span className='text-center fw-bolder'>{userDate[1]}</span></h5>
                  </div>
                  <div className="buy-see-love text-center">
                    {crop.Owner._id !== this.props.userData?._id && 
                      <>
                        <span><FiHeart className='me-1' onClick={() => this.props.add(crop._id)}/></span>
                        <Link to="/singleProduct"><BsCart className='me-1'/></Link>
                      </>
                    }
                    <Link to={`/Crops/singleProduct/${crop._id}`}><IoEyeOutline className='me-1' /></Link>
                    
                    {this.props.userData && crop.Owner._id === this.props.userData?._id && 
                      <>
                        <span><MdUpdate className='me-1 update-icon'/></span>
                        <span><AiFillDelete className='me-1 delete-icon' onClick={() => this.handleDeleteCrop(crop._id)}/></span>
                      </> 
                    }
                  </div>
                </div>
              )
            })
          }
          {
            this.props.lands && this.props.lands.map((land)=>{
              let userDate = new Date(land.createdAt).toString().split(' ');
              return (
                <div className="col-lg-4 mb-5 product" key={land._id}>
                  <img className='mb-2' alt='' src={`http://localhost:8080/${land.image}`} />
                  <BiUserCircle className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">by {land.Owner.name}</span>
                  <FaRegComments className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{land.comments.length} Comments</span>
                  <BsCurrencyDollar className='fs-5 mb-1 shape'/> <span className="me-2 shape-span">{land.price} dollar</span>
                  <h3 className='mt-2'>{land.description}</h3>
                  <div className="date">
                    <h5><span className="text-center ms-1 fw-bolder">{userDate[2]}</span> <br /><span className='text-center fw-bolder'>{userDate[1]}</span></h5>
                  </div>
                  <div className="buy-see-love text-center">
                  {land.Owner._id !== this.props.userData?._id && 
                      <>
                        <Link to="/singleProduct"><FiHeart className='me-1'/></Link>
                        <Link to="/singleProduct"><BsCart className='me-1'/></Link>
                      </>
                    }
                    <Link to={`/Lands/singleProduct/${land._id}`}><IoEyeOutline className='me-1' /></Link>
                    {land.Owner._id === this.props.userData._id && 
                      <>
                        <span><MdUpdate className='me-1 update-icon'/></span>
                        <span><AiFillDelete className='me-1 delete-icon'/></span>
                      </> 
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          this.props.userData?._id && 
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
          <BiChevronLeft className='me-2'/>
          <div className="me-2 active">1</div>
          <div className="me-2">2</div>
          <div className="me-2">3</div>
          <BiChevronRight className='me-2'/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    userData: state.userReducer.userInfo,
    crops: state.CropReducer.Crops
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    add: (product_id) => dispatch(AddToFavoutite(product_id)),
    delCrop: (crop_id) => dispatch(deleteCrop(crop_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAllProducts);