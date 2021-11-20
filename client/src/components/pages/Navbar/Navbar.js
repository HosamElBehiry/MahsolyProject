import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import Logo from "../../../public/images/loader.png";
import EnglandFlag from '../../../public/images/englandFlag.jpg';
import EgyptFlag from '../../../public/images/egyFlag.png'
import { Link } from "react-router-dom";
import TopNavBar from "../TopNavBar/TopNavBar";
import {connect} from 'react-redux';
import {IoMdArrowDropdown} from 'react-icons/io';
import { getUserById } from "../../ActionFolder/Actions/userActions";

function Header(props) {
  const lists = ["Home", "About", "Crops", "Lands", "Stock", "Contact"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const notificationBox = useRef(null);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isNotificationBoxOpend, setNotificationBox] = useState(false);
  const displayLists = () => {
    return lists.map((list, index) => {
      return (
        <li
          key={index}
          className={index === currentIndex ? "nav-item active" : "nav-item"}
          onClick={() => setCurrentIndex(index)}
        >
          <Link to={`/${list}`} className="nav-link animate">
            {list}
          </Link>
        </li>
      );
    });
  };
  const handleNotifications = () => {
    notificationBox.current.style.display = (!isNotificationBoxOpend ? 'block' : 'none');
    setNotificationBox(!isNotificationBoxOpend);
  }
  useEffect(() => {
    props.getAllInfoAboutCurrentUser(props.userData?._id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <TopNavBar />
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent2"
          >
            <ul className="list-unstyled navbar-nav mb-2 mb-lg-0 left justify-content-end">
              <li className="nav-item">
                <span className="nav-link animate custom fw-bolder">
                  <img src={Logo} alt="Logo" className="mb-2" /> MAHSOLY
                </span>
              </li>
            </ul>
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 middle fw-bold">
              {displayLists()}
            </ul>
            <ul className="navbar-nav  mb-1 mb-lg-0 right">
              {
                props.isLog && 
                <li className="nav-item mb-2" onClick={()=> handleNotifications()}>
                <span className="nav-link pt-3 animate">
                  <IoIosNotificationsOutline className="fs-2" />
                  <span className={props.userData.Notification?.length > 0 ? 'number-of-notifications mb-1' : "d-none"}>{props.userData.Notification?.length}</span>
                </span>
              </li>
              }
              <li className="nav-item mb-2">
                <span className="nav-link pt-3 animate">
                  <span className={`${!isEnglish ? 'd-none' : 'aa'} 'aa'`}>
                    <img src={EnglandFlag} alt='' height={25} width={25} className="flag-img" />
                    <IoMdArrowDropdown onClick={()=>setIsEnglish(false)}/>
                  </span>
                  <span className={`${isEnglish ? 'd-none': 'aa'} 'aa'`}>
                    <img src={EgyptFlag} alt='' height={25} width={25} className="flag-img egypt" />
                    <IoMdArrowDropdown className="flag-img egypt" onClick={()=>setIsEnglish(true)} />
                  </span>
                </span>
              </li>
              
              <li className="nav-item">
                <span className="nav-link phone">
                  <FiPhoneCall />
                  <span className="our-phone-detail">
                    <span className="call-any-time">Call Anytime</span>
                    <span className="ourNumber"> 666 888 0000</span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="show-notifications" ref={notificationBox}>
          {
            props.fullUserData?.Notification?.slice().reverse().map((notify)=>{
              return (
                <div className="notification" key={notify._id}>{notify.description}</div>
              )
            })
          }
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {
    userData: state.userReducer.userInfo,
    isLog: state.userReducer.isLogged,
    fullUserData: state.userReducer.fullUserData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAllInfoAboutCurrentUser : (userID) => dispatch(getUserById(userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
