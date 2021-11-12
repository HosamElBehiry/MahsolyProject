import './FixedIcon.css';
import {FiChevronUp} from 'react-icons/fi';
import React, { Component } from 'react'

class FixedIcon extends Component {
  constructor(props) {
    super(props)
    this.fixedRef = React.createRef();
  }

  componentDidMount = () =>{
    window.onscroll = () => {
      if(window.scrollY > 300){
        this.fixedRef.current.style.display = 'block';
      }else{
        this.fixedRef.current.style.display = 'none';
      }
    }
  }
  
  render() {
    return (
      <div className='fixed-icon' ref={this.fixedRef} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <FiChevronUp className='mb-1'/>
      </div>
    )
  }
}

export default FixedIcon;

