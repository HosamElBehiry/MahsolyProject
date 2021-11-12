import './Login.css';
import Avatar from '../../public/images/avatar.svg';
import { FaLock} from 'react-icons/fa';
import {ImPhone} from 'react-icons/im'
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUserDataAfterLogin} from '../ActionFolder/Actions/userActions'
class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      password: '',
      error: '',
      errorMsg: ''
    }
  }

  CheckValidity = (e) => {
    e.preventDefault();
    const {mobile, password} = this.state;
    axios.post('http://localhost:8080/users/login', {mobile, password}).then((response) => {
      if(response.data.msg){
        localStorage.setItem('token', response.data.token);
        this.setState({error: false});
        this.props.getUserInfo();
        setTimeout(() => {
          this.props.history.push('/')
        }, 2000);
      }else{
        this.setState({error: true});
        setTimeout(() => {this.setState({error: ''});},2000)
      }
    }).catch((err)=>{
      console.log('Error', err)
    })
  }
  
  componentDidMount(){
    const inputs = document.querySelectorAll(".input-login");
    function addcl(){
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }
    function remcl(){
      let parent = this.parentNode.parentNode;
      if(this.value === ""){
        parent.classList.remove("focus");
      }
    }
    inputs.forEach(input => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  }

  

  render() {
    return (
      <div className="container-fluid login-components mt-5 d-flex justify-content-center">
      <div className="login-content">
			<form className="login-form-component" onSubmit={(e) => this.CheckValidity(e)}>
				<img src={Avatar} alt='' />
				<h2 className="title-login" >Login</h2>
				<div className="input-div-login one">
					<div className="i">
						<ImPhone className="icon fas fa-user" />
					</div>
					<div className="div">
						<h5>Mobile Number</h5>
						<input required type="text" className="input-login" value={this.state.mobile} onChange={(e)=> this.setState({mobile: e.target.value})} />
					</div>
				</div>
				<div className="input-div-login pass">
					<div className="i">
						<FaLock className="icon fas fa-lock" />
					</div>
					<div className="div">
						<h5>Password</h5>
						<input required type="password" className="input-login" value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})} />
					</div>
				</div>
				<span className='forget-password-login' href="#">Forgot Password?</span>
				<input type="submit" className="btn-login" value="Login" />
        <Link to="/Register" className='register-link'>
          <input className="btn-login" type='button' value="Register" />
        </Link>
			</form>
		</div>
    <div  className={this.state.error ? 'error result-msg-footer mt-5 fw-bolder' : this.state.error  === false ? 'success result-msg-footer mt-5 fw-bolder' : 'd-none'}>
        {this.state.error ? (this.state.errorMsg ? "You are already a Subscriber" : 'Data is not valid') : 'You Successfully Loged In'}
      </div>
  </div>
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
    getUserInfo: () => dispatch(fetchUserDataAfterLogin())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
