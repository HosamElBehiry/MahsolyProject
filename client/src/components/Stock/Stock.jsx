import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Stock.css';
import {BsSearch} from 'react-icons/bs';
import {IoMdArrowDropdown} from 'react-icons/io';
import {RiStarSFill} from 'react-icons/ri';
import axios from 'axios';
export default class Stock extends React.Component {
  constructor(props) {
    super(props)
    this.selectRef = React.createRef();
    this.selectedRef = React.createRef();
    this.selectedBoxRef = React.createRef();
    this.isSelected = false;
    this.state = {
      crops : [],
      lists: ['All', 'Vegetables','Fruits', 'Others']
    }
  }

  handleClick = () =>{
    this.selectRef.current.style.display = (this.isSelected === false ? 'block' : 'none');
    this.isSelected = !this.isSelected;
  }

  changeSelection = (name, typeID) =>{
    this.selectedRef.current.innerHTML = name;
    if(typeID !== 0){
      axios.get(`http://localhost:8080/cropsRouter/typeId/${typeID}`).then((response)=>{
      this.setState({crops: response.data})
      }).catch((err)=>{
        alert('Error', err)
      })
    }else{
      axios.get(`http://localhost:8080/cropsRouter`).then((response)=>{
      this.setState({crops: response.data})
      }).catch((err)=>{
        alert('Error', err)
      })
    }
    this.handleClick();
  }

  componentDidMount(){
      axios.get('http://localhost:8080/cropsRouter/').then((response)=>{
        this.setState({crops: response.data})
      }).catch((err)=>{
        console.log('Error while getting data', err)
      })
  }

  render() {
    const {crops} = this.state;
    return (
      <div className='shops'>
          <div className='img-shops mb-5'>
            <img src='https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg' width="100%" alt='' />
              <h3>
                <Breadcrumb className='direction'>
                  <Breadcrumb.Item active>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Stock Market</Breadcrumb.Item>
                </Breadcrumb>
              </h3>
          </div>
          <div className="container all-products d-flex align-items-center justify-content-between">
            <div className='search-section'>
              <input type='text' placeholder='Search' />
              <BsSearch className='search-shape' />
            </div>
            <div className='result-numbers fw-bolder'> Showing 1-{this.state.crops.length} of 12 results</div>
            <div className='selected-box' ref={this.selectedBoxRef}>
              <div className='select-parent'>
                <div className='mt-2 selected'><span ref={this.selectedRef}>Sort by Popular </span> <IoMdArrowDropdown className='ms-3 mb-1 bottom-arrow' onClick={()=>this.handleClick()} /></div>
              </div>
            </div>
            <div className='select-box' ref={this.selectRef}>
              <div className='select-child'>
                {
                  this.state.lists.map((list, index)=>{
                    return (
                      <div className='mt-2 selected' key={index} onClick={()=>this.changeSelection(list, index)}>{list} </div>
                    )})
                }
              </div>
            </div>
          </div>
          <div className="container stock-market mt-4">
            <div className="row">
              {crops.map((crop)=>{
                return (
                  <div className="col-lg-4 mb-4 stock-section" key={crop._id}>
                    <img className='img-fluid' src={crop.img} alt='' />
                    <div className="d-flex align-items-center">
                      <p className='mt-4 fw-bolder stock-name mb-0'>{crop.name}</p>
                      <p className='mt-4 fw-bolder stock-stars mb-1'>
                        {[...Array(crop.stars)].map((x, i) =>
                          <RiStarSFill key={i} />
                        )}
                      </p>
                    </div>
                    <p className='stock-price'>
                      ${(crop.price - parseInt(crop.price)) > 0.0 ? 
                      crop.price : parseInt(crop.price)+'.0'}
                    </p>
                  </div>
                )})}
            </div>
          </div>
        </div>
    )
  }
}
