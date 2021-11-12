import './Crops.css';
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {BsSearch} from 'react-icons/bs';
import {IoMdArrowDropdown} from 'react-icons/io';
import GetAllProducts from '../../GetAllProducts/GetAllProducts';
import {getAllCrops} from '../../ActionFolder/Actions/AgricultureCropActions';
import {connect} from 'react-redux';

class Crops extends React.Component {

  constructor(props) {
    super(props)
    this.selectRef = React.createRef();
    this.selectedRef = React.createRef();
    this.selectedBoxRef = React.createRef();
    this.isSelected = false;
    this.state = {
      sortBy : ['All','Vegetables','Fruits','Others'],
    }
  }

  handleClick = () =>{
    this.selectRef.current.style.display = (this.isSelected === false ? 'block' : 'none');
    this.isSelected = !this.isSelected;
  }

  changeSelection = (name) =>{
    this.selectedRef.current.innerHTML = name;
    this.handleClick();
  }

  render(){
    this.props.getAll();
    return (
        <div className='shops'>
          <div className='img-shops mb-5'>
            <img src='https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg' width="100%" alt='' />
              <h3>
                <Breadcrumb className='direction'>
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Crops</Breadcrumb.Item>
                </Breadcrumb>
              </h3>
          </div>
          <div className="container all-products d-flex align-items-center justify-content-between">
            <div className='search-section'>
              <input type='text' placeholder='Search' />
              <BsSearch className='search-shape' />
            </div>
            <div className='result-numbers fw-bolder'> Showing 1-6 of 12 results</div>
            <div className='selected-box' ref={this.selectedBoxRef}>
              <div className='select-parent'>
                <div className='mt-2 selected'>
                  <span ref={this.selectedRef}>Sort by Popular </span> 
                  <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' onClick={()=>this.handleClick()} />
                </div>
              </div>
            </div>
            <div className='select-box' ref={this.selectRef}>
              <div className='select-child'>
                {this.state.sortBy.map((list, index)=>{
                  return (
                    <div className='mt-2 selected' key={index} onClick={()=>this.changeSelection(list)}>{list}</div>
                )})}
              </div>
            </div>
          </div>
          <GetAllProducts />
        </div>
    )
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
    getAll: () => dispatch(getAllCrops())
  }
}

export default connect(null, mapDispatchToProps)(Crops);
