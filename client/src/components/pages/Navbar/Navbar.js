import React from 'react';
import "./Navbar.css";
import {BsSearch} from "react-icons/bs";
import {BsCart} from "react-icons/bs";
import {FaPhoneAlt} from "react-icons/fa";
import  Logo from '../../../public/images/loader.png';
import {Link} from "react-router-dom";
import TopNavBar from '../TopNavBar/TopNavBar';
class Header extends React.Component{
  
  constructor(props) {
    super(props)
    this.state = {
      lists : ['Home', 'About', 'Crops', 'Lands', 'Stock', 'Contact'],
      currentIndex : 0
    }
  }

  handleClick = (index) => {
    this.setState({
      currentIndex : index
    })
  }

  displayLists = () => {
    return (
      this.state.lists.map((list, index)=>{
        return (
            <li key={index} className={index === this.state.currentIndex ? "nav-item active" : "nav-item"} onClick={ () => this.handleClick(index)} >
              <Link  to={`/${list}`} className="nav-link animate">{list}</Link>
            </li> 
          ) 
        }
      )
    )
  }

  render(){
    return(
      <div>
        <TopNavBar />
        <nav className="navbar navbar-expand-lg navbar-light" >
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent2">
              <ul className="list-unstyled navbar-nav mb-2 mb-lg-0 left justify-content-end">
                <li className="nav-item">
                  <span className="nav-link animate custom fw-bolder"><img src={Logo} alt="Logo" className='mb-2' /> MAHSOLY</span>
                </li>
              </ul>
              <ul className="navbar-nav m-auto mb-2 mb-lg-0 middle fw-bold" >
                {this.displayLists()}
              </ul>
              <ul className="navbar-nav  mb-1 mb-lg-0 right">
                <li className="nav-item mb-2">
                  <span className="nav-link pt-3 animate" ><BsSearch className='fs-4' /></span>
                </li>
                <li className="nav-item mb-2">
                  <span className="nav-link pt-3 animate" ><BsCart  className='fs-4'/></span>
                </li>
                <li className="nav-item">
                  <span className="nav-link phone" ><FaPhoneAlt/>
                    <span className='mt-5 ourNumber' >+2 012 345 6789</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;