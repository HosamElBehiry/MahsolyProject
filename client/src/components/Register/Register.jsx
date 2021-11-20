import './Register.css';
import Avatar from '../../public/images/avatar.svg';
import { FaLock, FaUnlock, FaCamera} from 'react-icons/fa';
import {ImPhone} from 'react-icons/im';
import {FaUser} from 'react-icons/fa';
import {BsFillEnvelopeFill} from 'react-icons/bs';
import {MdLocationOn} from 'react-icons/md';
import React, { useRef, useState } from 'react';
import {fetchUserDataAfterLogin} from '../ActionFolder/Actions/userActions';
import {connect} from 'react-redux';
import axios from 'axios';

function Register(props) {

	const imgRef = useRef(null);
	const newImage = useRef(null);
	const userNameParent = useRef(null);
	const userNameInput = useRef(null);
	const H5UserName = useRef(null);
	const emailParent = useRef(null);
	const emailInput = useRef(null);
	const H5Email = useRef(null);
	const mobileParent = useRef(null);
	const mobileInput = useRef(null);
	const H5Mobile = useRef(null);
	const passwordParent = useRef(null);
	const passwordInput = useRef(null);
	const [isLocked, setIsLocked] = useState(true);
	const H5Password = useRef(null);
	const confirmpasswordParent = useRef(null);
	const confirmPasswordInput = useRef(null);
	const H5ConfirmPassword = useRef(null);
	const locationParent = useRef(null);
	const locationInput = useRef(null);
	const H5Location = useRef(null);
	const [userProfile, setUserProfile] = useState(Avatar);
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('')
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [location, setLocation] = useState('');
	const [error, setError] = useState('');
	const handleImage = (e) =>{
		const reader = new FileReader();
		reader.onload = ()=>{
			if(reader.readyState === 2){
				setUserProfile(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0]);
		setImage(e.target.files[0]);
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		if(password !== confirmPassword){
			setErrors(passwordInput, passwordParent, H5Password)
			setErrors(confirmPasswordInput, confirmpasswordParent, H5ConfirmPassword)
		}
		else if (image === '') {
			window.scrollTo({top: 0, behavior: 'smooth'})
			newImage.current.style.backgroundColor = '#f00';
		} 
		else {
			const formData = new FormData();
			formData.append('name', name)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('location', location)
			formData.append('mobile', mobile)
			formData.append('image', image);
			axios
			.post("http://localhost:8080/users/", 
			formData)
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem("token", response.data.token);
					props.getUserInfo();
					props.history.push("/");
				} else {
					setError(true);
					setErrors();
				}
			})
			.catch((err) => {
				if(err.response.data.errors?.length === 4 ) { 
					setErrors(mobileInput, mobileParent, H5Mobile)
					setErrors(userNameInput, userNameParent, H5UserName)
					setErrors(emailInput, emailParent, H5Email)
					setErrors(passwordInput,passwordParent,H5Password);
					setErrors(confirmPasswordInput, confirmpasswordParent, H5ConfirmPassword)
					setErrors(locationInput, locationParent, H5Location);
					newImage.current.style.backgroundColor = '#f00';
				}
				else if((err.response.data.errors && err.response.data.errors[0]?.param === 'mobile')
				|| err.response.data.error === 'This Mobile is already exists'){
					setErrors(mobileInput, mobileParent, H5Mobile)
				} else if((err.response.data.errors && err.response.data.errors[0].param === 'password')
				){
					setErrors(passwordInput,passwordParent,H5Password);
					setErrors(confirmPasswordInput, confirmpasswordParent, H5ConfirmPassword)
				}
				// setError(true);
				// setErrors();
			});
		}
	}
	const setErrors = (dataInput, dataParent, H5Error) =>{
		dataInput.current.classList.add('error')
    dataParent.current.classList.add("focus","error");
    H5Error.current.classList.add('error');
	}
	const removeErrors = (dataInput, dataParent, H5Error) =>{
		dataInput.current.classList.remove('error')
    dataParent.current.classList.remove("focus","error");
    H5Error.current.classList.remove('error');
	}
	const handleLock = (False) =>{
		setIsLocked(False);
		confirmPasswordInput.current.type = !False ? 'text' : 'password';
		passwordInput.current.type = !False ? 'text' : 'password'
	}
	const specifyLocation = () =>{
		window.navigator.geolocation.getCurrentPosition((position)=>{
			setLocation(position.coords.longitude + ' ' + position.coords.latitude);
			locationInput.current.value = 'Location have been set '
		}, ()=>{
			alert('Error while specifying location');
		})
	}
	return (
		<div className="container-fluid login-components mt-5 d-flex justify-content-center">
				<div className="login-content">
					<form className="login-form-component" onSubmit={(e) => handleSubmit(e)}>
						<div className='user-registeration-img'>
							<img src={userProfile} alt='' ref={newImage}/>
							<FaCamera className='camera-register fs-5' onClick={() => imgRef.current.click()}/>
							<input type="file" name='user-img' alt='' 
									onChange={(e) => handleImage(e)} accept='image/*'
									className='d-none' ref={imgRef}
							/>
						</div>
						<h2 className="title-login" >Register</h2>
						<div className="input-div-login one" ref={userNameParent}>
							<div className="i">
								<FaUser className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5 ref={H5UserName} className={error && 'error'}>User Name</h5>
								<input 
									type="text" required 
									name='user-name' pattern='^[A-Za-z]{3,}$'
									value={name} ref={userNameInput} 
									onChange={(e) => setName(e.target.value)}
									onFocus={()=> {
										error && setName('')
										removeErrors(userNameInput, userNameParent, H5UserName)
										userNameParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(userNameInput.current.defaultValue === '') && 
									userNameParent.current.classList.remove('focus')
									}}
									className="input-login" autoComplete='off' 
								/>
							</div>
						</div>
						<div className="input-div-login one" ref={emailParent}>
							<div className="i">
								<BsFillEnvelopeFill className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5 ref={H5Email}>Email</h5>
								<input 
									type="email" required
									name='user-email' 
									value={email} 
									ref={emailInput}
									onChange={(e) => setEmail(e.target.value)}
									onFocus={()=> {
										error && setEmail('') 
										removeErrors(emailInput, emailParent, H5Email)
										emailParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(emailInput.current.defaultValue === '') && 
										emailParent.current.classList.remove('focus')
									}}
									className="input-login" autoComplete='off'
								/>
							</div>
						</div>
						<div className="input-div-login one" ref={mobileParent}>
							<div className="i">
								<ImPhone className="icon fas fa-user" />
							</div>
							<div className="div">
								<h5 ref={H5Mobile}>Mobile Number</h5>
								<input 
									type="text" required 
									name='user-mobile' 
									value={mobile} ref={mobileInput}
									onChange={(e) => setMobile(e.target.value)}
									onFocus={()=> {
										error && setMobile('');
										removeErrors(mobileInput, mobileParent, H5Mobile)
										mobileParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(mobileInput.current.defaultValue === '') && 
										mobileParent.current.classList.remove('focus')
									}}
									className="input-login" autoComplete='none'/>
							</div>
						</div>
						<div className="input-div-login one" ref={passwordParent}>
							<div className="i">
								<FaLock className={!isLocked ? 'd-none' : 'icon fas fa-lock'} 
									onClick={()=>{handleLock(false)}} />
								<FaUnlock className={isLocked ? 'd-none' : 'icon fas fa-unlock'} 
									onClick={()=>{handleLock(true)}} />
							</div>
							<div className="div">
								<h5 ref={H5Password}>Password</h5>
								<input required
									type="password" 
									name='user-password'
									value={password} ref={passwordInput} 
									onChange={(e) => setPassword(e.target.value)} 
									onFocus={()=> {
										error && setPassword('') 
										removeErrors(passwordInput,passwordParent,H5Password)
										passwordParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(passwordInput.current.defaultValue === '') && 
										passwordParent.current.classList.remove('focus')
									}}
									className="input-login" />
							</div>
						</div>
						<div className="input-div-login one" ref={confirmpasswordParent}>
							<div className="i">
								<FaLock className={!isLocked ? 'd-none' : 'icon fas fa-lock'} 
									onClick={()=>{handleLock(false)}}/>
								<FaUnlock className={isLocked ? 'd-none' : 'icon fas fa-unlock'} 
								onClick={()=>{handleLock(true)}} />
							</div>
							<div className="div">
								<h5 ref={H5ConfirmPassword}>Confirm Password</h5>
								<input 
									type="password" required 
									name='user-confirm-password' 
									value={confirmPassword} ref={confirmPasswordInput} 
									onChange={(e) => setConfirmPassword(e.target.value)}
									onFocus={()=> {
										error && setConfirmPassword('')
										removeErrors(confirmPasswordInput, confirmpasswordParent, H5ConfirmPassword)
										confirmpasswordParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(confirmPasswordInput.current.defaultValue === '') && 
										confirmpasswordParent.current.classList.remove('focus')
									}}
									className="input-login" />
							</div>
						</div>
						<div className="input-div-login one" ref={locationParent}> {/* error here */}
							<div className="i">
								<MdLocationOn className="icon fas fa-user fs-4" />{/* error here */}
							</div>
							<div className="div">
								<h5 ref={H5Location} className={error && 'error'}>Location</h5>{/* error here */}
								<input 
									type="text" 
									value={location} ref={locationInput}
									onChange={(e) => setLocation(e.target.value)}
									onClick={()=> specifyLocation()}
									onFocus={()=> {
										error && setLocation('');
										removeErrors(locationInput, locationParent, H5Location)
										locationParent.current.classList.add("focus")
									}}
									onBlur={()=>{
										(locationInput.current.defaultValue === '') && 
										locationParent.current.classList.remove('focus')
									}}
									name='user-location' className={error ? "input-login error" : "input-login"} /> {/* error here */}
							</div>
						</div>
						<input type="submit" className="btn-login" value="Register" />
					</form>
				</div>
			</div>
	)
}

const mapDispatchToProps = (disptach) =>{
	return {
		getUserInfo: () => disptach(fetchUserDataAfterLogin()),
	}
}

export default connect(null, mapDispatchToProps)(Register)
