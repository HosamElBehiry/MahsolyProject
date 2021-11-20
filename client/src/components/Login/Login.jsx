import "./Login.css";
import Avatar from "../../public/images/avatar.svg";
import { FaLock } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import React, { useState, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUserDataAfterLogin } from "../ActionFolder/Actions/userActions";

function Login(props) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const errorMsg = "";
  const passwordInput = useRef(null);
  const mobileInput = useRef(null);
  const parentMobile = useRef(null);
  const parentPassword = useRef(null);
  const H5ErrorMobile = useRef(null);
  const H5ErrorPassword = useRef(null);
  const CheckValidity = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/login", { mobile, password })
      .then((response) => {
        if (response.data.msg) {
          localStorage.setItem("token", response.data.token);
          setError(false);
          props.getUserInfo();
          props.history.push("/");
        } else {
          setError(true);
          setErrors();
        }
      })
      .catch(() => {
        setError(true);
        setErrors();
      });
  };

  const setErrors = () =>{
    mobileInput.current.classList.add('error')
    passwordInput.current.classList.add('error')
    parentMobile.current.classList.add("focus","error");
    parentPassword.current.classList.add("focus","error");
    H5ErrorMobile.current.classList.add('error');
    H5ErrorPassword.current.classList.add('error');
  }

  return (
    <div className="container-fluid login-components mt-5 d-flex justify-content-center">
      <div className="login-content">
        <form
          className="login-form-component"
          onSubmit={(e) => CheckValidity(e)}
        >
          <img src={Avatar} alt="" />
          <h2 className="title-login">Login</h2>
          <div className={error? "input-div-login one error" : "input-div-login one"} 
            ref={parentMobile}> {/* we need to add className error here when */}
            <div className="i">
              <ImPhone className="icon fas fa-user" />
            </div>
            <div className="div">
              <h5 ref={H5ErrorMobile}>Mobile Number</h5> {/* we need to add className error here  */}
              <input
                required
                ref={mobileInput}
                onFocus={() => {
                  if(error){
                    setMobile('');
                    mobileInput.current.classList.remove('error');
                    parentMobile.current.classList.remove('error');
                    H5ErrorMobile.current.classList.remove('error');
                  } 
                  parentMobile.current.classList.add("focus");
                }}
                onBlur={() => {
                  (mobileInput.current.defaultValue === '')
                  && parentMobile.current.classList.remove("focus");
                }}
                type="text"
                className="input-login"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className={error? "input-div-login pass error" : "input-div-login pass"} 
            ref={parentPassword}>
            <div className="i">
              <FaLock className="icon fas fa-lock" />
            </div>
            <div className="div">
              <h5 ref={H5ErrorPassword}>Password</h5>
              <input
                ref={passwordInput}
                required
                onFocus={() => {
                  if(error){
                    setPassword('');
                    passwordInput.current.classList.remove('error')
                    parentPassword.current.classList.remove("error");
                    H5ErrorPassword.current.classList.remove('error');
                  } 
                  parentPassword.current.classList.add("focus")
                }}
                onBlur={() => {
                  (passwordInput.current.defaultValue === '') &&  
                  parentPassword.current.classList.remove("focus")
                }}
                type="password"
                className="input-login"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <span className="forget-password-login" href="#">
            Forgot Password?
          </span>
          <input type="submit" className="btn-login" value="Login" />
          <Link to="/Register" className="register-link">
            <input className="btn-login" type="button" value="Register" />
          </Link>
        </form>
      </div>
      <div
        className={
          error
            ? "error result-msg-footer mt-5 fw-bolder"
            : error === false
            ? "success result-msg-footer mt-5 fw-bolder"
            : "d-none"
        }
      >
        {error
          ? errorMsg
            ? ""
            : "Data is not valid"
          : ""}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(fetchUserDataAfterLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
