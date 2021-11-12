import React, { Component } from 'react'
import './ContactHome.css';
import Loader from '../../public/images/loader.png';
import axios from 'axios';

export default class ContactHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName : '',
      email : '',
      mobile : '',
      message : '',
      error : ''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const {fullName, email, mobile, message} = this.state;
    axios.post('http://localhost:8080/contact', {fullName, email, mobile, message}).then(()=>{
      this.setState({error : false});
      setTimeout(() => {
        this.setState({error : ''})
      }, 2000);
    }).catch(()=>{
      this.setState({error : true})
      setTimeout(() => {
        this.setState({error : ''})
      }, 2000);
    })
    this.setState({
      fullName: '', email: '', mobile: '', message: ''
    })
  }
  
  render() {
    return (
      <div className='container'>
      <div className="contact-home d-flex align-items-center justify-content-around">
        <div className='contact-home-img'>
          <img src='https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/contact-1.jpg' alt='' />
        </div>
        <div className="contact-home-ui">
          <img src={Loader} alt='' className='mb-3'/>
          <h6 className='mb-2'>Contact Now</h6>
          <h1>Leave Us Message</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
              <input 
                type="text" 
                placeholder='Full Name' 
                value={this.state.fullName} 
                required
                onChange={(e) => this.setState({fullName : e.target.value})} 
                name='fullName' autoComplete='none'/>
              <input type="email" 
                placeholder='Email Address' 
                value={this.state.email} 
                required 
                onChange={(e) => this.setState({email : e.target.value})}  
                name='email' autoComplete='none' 
                pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              />
              <input type="text" 
                placeholder='Mobile Number' 
                value={this.state.mobile} 
                required 
                onChange={(e) => this.setState({mobile : e.target.value})} 
                name='mobile' autoComplete='none' 
                pattern='^(010|011|012|015)[0-9]{8}'
              />
              <textarea cols="30" rows="10" 
                placeholder='Leave Message' 
                value={this.state.message} 
                required
                onChange={(e) => this.setState({message : e.target.value})} 
                name='message' autoComplete='none'></textarea>
              <button className='btn btn-warning' type='submit'>Send Message</button>
          </form>
        </div>
      </div>
      <div className={this.state.error ? 'error result-msg mt-5 fw-bolder' : this.state.error === false ? 'success result-msg mt-5 fw-bolder' : 'd-none'}>
        {this.state.error ? 'Error Invalid' : 'Message Successfully Sent'}
      </div>
    </div>
    )
  }
}
