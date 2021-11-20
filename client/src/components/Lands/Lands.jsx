import React, {useRef, useState} from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Lands.css';
import {BsSearch} from 'react-icons/bs';
import {IoMdArrowDropdown} from 'react-icons/io';
import GetAllProducts from '../GetAllProducts/GetAllProducts';
import {getAllLands} from '../ActionFolder/Actions/LandsAction'
import {connect} from 'react-redux';

function Lands(props) {
  const selectRef = useRef(null);
  const selectedRef = useRef(null);
  const selectedBoxRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () =>{
    selectRef.current.style.display = (!isSelected ? 'block' : 'none');
    setIsSelected(!isSelected)
  }
  const changeSelection = (name) =>{
    selectedRef.current.innerHTML = name;
    handleClick();
  }
  props.getAll();
  return (
    <div className='shops'>
    <div className='img-shops mb-5'>
      <img src='https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg' width="100%" alt='' />
        <h3>
          <Breadcrumb className='direction'>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Lands</Breadcrumb.Item>
          </Breadcrumb>
        </h3>
    </div>
    <div className="container all-products d-flex align-items-center justify-content-between">
      <div className='search-section'>
        <input type='text' placeholder='Search' />
        <BsSearch className='search-shape' />
      </div>
      <div className='result-numbers fw-bolder invisible'> Showing 1-6 of 12 results</div>
      <div className='selected-box' ref={selectedBoxRef}>
        <div className='select-parent'>
          <div className='mt-2 selected'><span ref={selectedRef}>Sort by Popular </span> 
          <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' onClick={()=>handleClick()} /></div>
        </div>
      </div>
      <div className='select-box' ref={selectRef}>
        <div className='select-child'>
          <div className='mt-2 selected' onClick={()=> changeSelection('All')}>All </div>
          <div className='mt-2 selected' onClick={()=>changeSelection('Agriculture Crops')}>Agriculture Crops</div>
          <div className='mt-2 selected' onClick={()=>changeSelection('Agriculture Lands')}>Agriculture Lands </div>
        </div>
      </div>
    </div>
    <GetAllProducts />
  </div>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAll: () => dispatch(getAllLands())
  }
}

export default connect(null, mapDispatchToProps)(Lands)
