import './TopNavBar.css';
import { BsTwitter } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { BsPinterest } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import {FaUser} from 'react-icons/fa';
import {IoLogOut} from 'react-icons/io5';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { deleteUserInfo } from '../../ActionFolder/Actions/userActions';
import {connect} from 'react-redux';

class Topnavbar extends Component {

  LogOut = () =>{
    localStorage.removeItem('token');
    this.props.logout();
    this.props.history.push('/Contact')
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" 
          data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link myhover" ><AiFillFacebook /></span>
            </li>
            <li className="nav-item">
              <span className="nav-link myhover" ><BsTwitter /></span>
            </li>
            <li className="nav-item">
              <span className="nav-link myhover" ><BsPinterest /></span>
            </li>
            <li className="nav-item">
              <span className="nav-link myhover" ><BsInstagram /></span>
            </li>
            <li className="nav-item">
              <span className="nav-link text" >Welcome to MAHSOLY</span>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!localStorage.getItem('token') ?
                <>
                  <li className="nav-item">
                    <span className="nav-link myhover right" ><BsFillEnvelopeFill /></span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link myhover right top-nav-email" >Mahsoly@gmail.com</span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link myhover right" ><BsFillClockFill /></span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link myhover right top-nav-appointments" >Mon - Sat 8:00 - 6:30, Sunday - CLOSED</span>
                  </li>
                </> : 
                <>
                  <li className="nav-item">
                    <span className="nav-link myhover right " ><FaUser /></span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link myhover right greet-user-top-navbar fw-bolder" >Welcome {this.props.userData.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link myhover right " ><IoLogOut className="fs-4"/></span>
                  </li>
                  <li className="nav-item" onClick={()=> this.LogOut()}>
                    <span className="nav-link myhover right greet-user-top-navbar fw-bolder" >Logout</span>
                  </li>
                </>  
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    userData: state.userReducer.userInfo
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    logout: () => dispatch(deleteUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topnavbar));
