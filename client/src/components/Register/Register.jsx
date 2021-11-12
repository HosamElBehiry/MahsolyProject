import './Register.css';
import Avatar from '../../public/images/avatar.svg';
import { FaLock, FaCamera} from 'react-icons/fa';
import {ImPhone} from 'react-icons/im';
import {FaUser} from 'react-icons/fa';
import {BsFillEnvelopeFill} from 'react-icons/bs';
import {MdLocationOn} from 'react-icons/md';
import React, { Component } from 'react';
class Register extends Component {

	constructor(props) {
		super(props);
		this.imgRef = React.createRef();
		this.newImage = React.createRef();
		this.state = {
			userProfile : Avatar,
			userName : "",
			userMail : "",
			userMobile : "",
			userPassWord: "",
			userConfirmPassword : "",
			userLocation : ""
		}
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

	handleImage = (e) =>{
		const reader = new FileReader();
		reader.onload = ()=>{
			if(reader.readyState === 2){
				this.setState({
					userProfile : reader.result
				})
			}
		}
		reader.readAsDataURL(e.target.files[0])
	}

	handleSubmit = (e) =>{
		e.preventDefault();
		// this.props.history.push('/');
	}

  render() {
    return (
      <div className="container-fluid login-components mt-5 d-flex justify-content-center">
				<div className="login-content">
					<form className="login-form-component" onSubmit={(e) => this.handleSubmit(e)}>
						<div className='user-registeration-img'>
							<img src={this.state.userProfile} alt='' ref={this.newImage}/>
							<FaCamera className='camera-register fs-5' onClick={() => this.imgRef.current.click()}/>
							<input type="file" name='user-img' alt='' 
									onChange={(e) => this.handleImage(e)} accept='image/*'
									className='d-none' ref={this.imgRef}
							/>
						</div>
						<h2 className="title-login" >Register</h2>
						<div className="input-div-login one">
							<div className="i">
								<FaUser className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5>User Name</h5>
								<input 
									type="text" 
									name='user-name' 
									value={this.state.userName} 
									onChange={(e) => this.setState({userName : e.target.value})}
									className="input-login" autoComplete='none' 
								/>
							</div>
						</div>
						<div className="input-div-login one">
							<div className="i">
								<BsFillEnvelopeFill className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5>Email</h5>
								<input 
									type="email" 
									name='user-email' 
									value={this.state.userMail} 
									onChange={(e) => this.setState({userMail : e.target.value})}
									className="input-login" autoComplete='none'/>
							</div>
						</div>
						<div className="input-div-login one">
							<div className="i">
								<ImPhone className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5>Mobile Number</h5>
								<input 
									type="text" 
									name='user-mobile' 
									value={this.state.userMobile} 
									onChange={(e) => this.setState({userMobile : e.target.value})}
									className="input-login" autoComplete='none'/>
							</div>
						</div>
						<div className="input-div-login one">
							<div className="i">
								<FaLock className="icon fas fa-lock" />
							</div>
							<div className="div">
								<h5>Password</h5>
								<input 
									type="password" 
									name='user-password'
									value={this.state.userPassWord} 
									onChange={(e) => this.setState({userPassWord : e.target.value})} 
									className="input-login" />
							</div>
						</div>
						<div className="input-div-login one">
							<div className="i">
								<FaLock className="icon fas fa-lock" />
							</div>
							<div className="div">
								<h5>Confirm Password</h5>
								<input 
									type="password" 
									name='user-confirm-password' 
									value={this.state.userConfirmPassword} 
									onChange={(e) => this.setState({userConfirmPassword : e.target.value})}
									className="input-login" />
							</div>
						</div>
						<div className="input-div-login one">
							<div className="i">
								<MdLocationOn className="icon fas fa-user fs-4" />
							</div>
							<div className="div">
								<h5>Location</h5>
								<input 
									type="text" 
									value={this.state.userLocation} 
									onChange={(e) => this.setState({userLocation : e.target.value})}
									name='user-location' className="input-login" />
							</div>
						</div>
						<input type="submit" className="btn-login" value="Register" />
					</form>
				</div>
			</div>
    );
  }
}

export default Register;
