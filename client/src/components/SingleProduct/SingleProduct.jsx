import React, { Component } from 'react'
import './SingleProduct.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import {BsSearch} from 'react-icons/bs';
import {BiUserCircle, BiChevronRight} from 'react-icons/bi';
import {FaRegComments,FaBalanceScale} from 'react-icons/fa';
import {BsCurrencyDollar} from 'react-icons/bs';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class SingleProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      product: {},
      units: ['Ton', 'Kilogram', 'Ardib', 'Sack', 'Piece', 'Box'],
      landUnits: ['Acre', 'Carat', 'Shape'],
      isLand: false,
      latestPosts : []
    }
  }
  
  componentDidMount(){
    if(this.props.match.url.startsWith('/Lands')){
      this.setState({isLand: true});
      axios.get(`http://localhost:8080/lands/${this.props.match.params.id}`).then((response)=>{
        this.setState({product : response.data})
      }).catch((err)=>{
        console.log('Error', err)
      })
    }else{
      axios.get(`http://localhost:8080/agriculture-crops-router/${this.props.match.params.id}`).then((response)=>{
        this.setState({product : response.data})
      }).catch((err)=>{
        console.log('Error', err)
      })
    }
  }

  handleSubmit = (e) =>{
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='img-shops mb-5'>
          <img src='https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg' width="100%" alt='' />
            <h3>
              <Breadcrumb className='direction'>
                <Breadcrumb.Item active>Shops</Breadcrumb.Item>
                <Breadcrumb.Item>Single Product</Breadcrumb.Item>
              </Breadcrumb>
            </h3>
        </div>
        <div className='container single-product d-flex align-items-center justify-content-center'>
          <div className="row">
            <div className="col-lg-8 post-section">
              <img alt='' className='img-fluid mb-2' src={!this.state.isLand ? `http://localhost:8080/${this.state.product?.images}` : `http://localhost:8080/${this.state.product?.image}`} />
              <BiUserCircle className='fs-4 mb-1 shape'/> <span className="me-2 shape-span fs-5">by {this.state.product?.Owner?.name}</span>
              <FaRegComments className='fs-4 mb-1 shape'/> <span className="me-2 shape-span fs-5">{this.state.product?.comments?.length} Comments</span>
              <BsCurrencyDollar className='fs-4 mb-1 shape'/> <span className="me-3 shape-span fs-5">{this.state.product?.price} dollar</span>
              <FaBalanceScale className='me-1 fs-4 mb-1 shape'/> 
                <span className="me-2 shape-span fs-5">
                  {!this.state.isLand ? this.state.product?.quantity : this.state.product?.area} 
                  {!this.state.isLand ? this.state.units[this.state.product?.quantityId] : 
                  this.state.landUnits[this.state.product?.measurement-1]}
                </span>
              <h3 className='mt-2'>{this.state.product?.description}</h3>
              <p className='post-description'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut blanditiis beatae quos libero officiis et sunt veniam quibusdam illo praesentium? Accusantium atque delectus minima repudiandae ipsa aperiam, esse aut non quibusdam consequatur consectetur distinctio nam!</p>
              <hr className='mt-5'/>
              <div className="post-comments">
                <h3>2 Comments</h3>
                <div className="comment d-flex mt-4">
                  <div className="comment-img">
                    <img alt='' src='https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/blog-comment-1-1.jpg' />
                  </div>
                  <div className="comment-description">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="comment-owner"><h3 className='mt-2 ms-5 fw-bolder'>John Doe</h3></div>
                      <div className="date-of-comment">1 Nov,2021</div>
                    </div>
                    <p className='ms-5 fs-5'>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                </div>
                <hr />
              </div>
              <div className="post-comments">
                <div className="comment d-flex mt-4">
                  <div className="comment-img">
                    <img alt='' src='https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/blog-comment-1-2.jpg' />
                  </div>
                  <div className="comment-description">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="comment-owner"><h3 className='mt-2 ms-5 fw-bolder'>Jane Doe</h3></div>
                      <div className="date-of-comment">1 Nov,2021</div>
                    </div>
                    <p className='ms-5 fs-5'>Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                </div>
                <hr />
              </div>
              <div className="leaving-comment">
                <h2 className='mt-5'>Leave Comment</h2>
                <form action="" method="post" onSubmit={(e)=>this.handleSubmit(e)}>
                  <textarea placeholder='Write Message' rows="10"></textarea>
                  <button className='comment-submit btn btn-success fw-bolder'>Submit Comment</button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className='search-section'>
                <input type='text' placeholder='Search' />
                <BsSearch className='search-shape' />
              </div>
              <div className="recent-posts mt-3">
                  <h4 className='text-center mb-3'>Recent Posts</h4>
                  <div className="post d-flex align-items-center justify-content-center mb-3">
                    <img alt='' src='https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-1.jpg' />
                    <div className=" ms-3">
                      <div className='date mt-2 fw-bolder'>20 Nov,2020</div>
                      <div className="post-title">
                        Healthy Farm Diary Products
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="post d-flex align-items-center justify-content-center mb-3">
                    <img alt='' src='https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-2.jpg' />
                    <div className=" ms-3">
                      <div className='date mt-2 fw-bolder'> 20 Nov,2020 </div>
                      <div className="post-title"> Healthy Farm Diary Products </div>
                    </div>
                  </div>
                  <hr />
                  <div className="post d-flex align-items-center justify-content-center mb-3">
                    <img alt='' src='https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-3.jpg' />
                    <div className=" ms-3">
                      <div className='date mt-2 fw-bolder'>20 Nov,2020</div>
                      <div className="post-title">
                        Healthy Farm Diary Products
                      </div>
                    </div>
                  </div>
              </div>
              <div className="categories mt-2">
                <h4 className='ms-4 mb-3'>Categories</h4>
                <div className="d-flex justify-content-around mb-2">
                  <div className="category-name fs-5 fw-bolder"><Link to='/Crops'>Agriculture Crop</Link></div>
                  <div className="category-arrow fw-bold"><Link to='/Crops'><BiChevronRight className='me-2 fs-5'/></Link></div>
                </div>
                <div className="d-flex justify-content-around mb-2">
                  <div className="category-name fs-5 fw-bolder"><Link to='/Lands'>Agriculture Lands</Link></div>
                  <div className="category-arrow fw-bold"><Link to='/Lands'><BiChevronRight className='me-2 fs-5'/></Link></div>
                </div>
                <div className="d-flex justify-content-around mb-2">
                  <div className="category-name crop fs-5 fw-bolder"><Link to='/Stock'>Crops</Link></div>
                  <div className="category-arrow fw-bold"><Link to='/Stock'><BiChevronRight className='me-2 fs-5'/></Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
