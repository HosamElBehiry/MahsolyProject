import React, { useState, useEffect } from "react";
import "./SingleProduct.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BsSearch } from "react-icons/bs";
import { BiUserCircle, BiChevronRight } from "react-icons/bi";
import { FaRegComments, FaBalanceScale, FaPhoneAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState('');
  const isLand = window.location.href.includes('Lands') ? true: false
  const units = ["Ton", "Kilogram", "Ardib", "Sack", "Piece", "Box"];
  const landUnits = ["Acre", "Carat", "Shape"];
  useEffect(() => {
    let CropUrl = `http://localhost:8080/agriculture-crops-router/${props.match.params.id}`;
    let LandUrl = `http://localhost:8080/lands/${props.match.params.id}`;
    axios
    .get(isLand ? LandUrl : CropUrl)
    .then((response) => {
      setProduct(response.data);
    })
    .catch((err) => {
      alert("Error .....", err);
    });
  },[props.match.params.id, isLand]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/${props.match.url.includes('Crops') ? 'agriculture-crops-router' : 'lands'}/addComment/${props.match.params.id}`,{description}, 
    {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}).then(()=>{
      setDescription('');
      window.location.reload();
    }).catch((err)=>{
      alert('Error adding new Comment', err);
    })
  };

  const getAllComments = () =>{
    return (product.comments?.map((comment)=>{
      return (
        <div className="post-comments" key={comment._id}>
          <div className="comment d-flex mt-4">
            <div className="comment-img">
              <img
                alt=""
                src={`http://localhost:8080/${comment.user.image}`}
              />
            </div>
            <div className="comment-description">
              <div className="d-flex align-items-center justify-content-between">
                <div className="comment-owner">
                  <h3 className="mt-2 ms-5 fw-bolder">{comment.user.name}</h3>
                </div>
                <div className="date-of-comment">1 Nov,2021</div>
              </div>
              <p className="ms-5 fs-5">
                {comment.description}
              </p>
            </div>
          </div>
          <hr />
        </div>
      )
    }))
  }

  return (
    <div>
      <div className="img-shops mb-5">
        <img
          src="https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg"
          width="100%"
          alt=""
        />
        <h3>
          <Breadcrumb className="direction">
            <Breadcrumb.Item active>Shops</Breadcrumb.Item>
            <Breadcrumb.Item>Single Product</Breadcrumb.Item>
          </Breadcrumb>
        </h3>
      </div>
      <div className="container single-product d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-lg-8 post-section">
            <img
              alt=""
              className="img-fluid mb-2"
              src={
                !isLand
                  ? `http://localhost:8080/${product.images}`
                  : `http://localhost:8080/${product?.image}`
              }
            />
            <Link to={`/Profile/${product.Owner?._id}`} className='text-decoration-none'>
              <BiUserCircle className="fs-4 mb-1 shape" />{" "}
              <span className="me-2 shape-span fs-5">
                by {product.Owner?.name}
              </span>
            </Link>
            <FaRegComments className="fs-4 mb-1 shape" />{" "}
            <span className="me-2 shape-span fs-5">
              {product.comments?.length} Comments
            </span>
            <BsCurrencyDollar className="fs-4 mb-1 shape" />{" "}
            <span className="me-3 shape-span fs-5">{product.price} dollar</span>
            <FaBalanceScale className="me-1 fs-4 mb-1 shape" />
            <span className="me-2 shape-span fs-5">
              {!isLand ? product.quantity : product?.area}
              {!isLand
                ? units[product.quantityId - 1]
                : landUnits[product?.measurement - 1]}
            </span>
            <FaPhoneAlt className="me-1 mb-1 shape"/>
            <span className="me-2 shape-span fs-5">{product.Owner?.mobile}</span>
            <h3 className="mt-2">{product.description}</h3>
            <p className="post-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
              blanditiis beatae quos libero officiis et sunt veniam quibusdam
              illo praesentium? Accusantium atque delectus minima repudiandae
              ipsa aperiam, esse aut non quibusdam consequatur consectetur
              distinctio nam!
            </p>
            <hr className="mt-5" />
            <h3>{product.comments?.length} Comments</h3>
            {
              getAllComments()
            }
            <div className="leaving-comment">
              <h2 className="mt-5">Leave Comment</h2>
              <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                <textarea placeholder="Write Message" 
                  rows="10"value={description} onChange={(e)=> setDescription(e.target.value)}>  
                </textarea>
                <button className="comment-submit btn btn-success fw-bolder">
                  Submit Comment
                </button>
              </form>
            </div>
            <div className="date">
              <h5>
                <span className="text-center ms-1 fw-bolder">
                  {new Date(product.createdAt).toDateString().split(' ')[2]}
                </span> <br />
                <span className='text-center fw-bolder'>
                  {new Date(product.createdAt).toDateString().split(' ')[1]}
                </span>
              </h5>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="search-section">
              <input type="text" placeholder="Search" />
              <BsSearch className="search-shape" />
            </div>
            <div className="recent-posts mt-3">
              <h4 className="text-center mb-3">Recent Posts</h4>
              <div className="post d-flex align-items-center justify-content-center mb-3">
                <img
                  alt=""
                  src="https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-1.jpg"
                />
                <div className=" ms-3">
                  <div className="date mt-2 fw-bolder">20 Nov,2020</div>
                  <div className="post-title">Healthy Farm Diary Products</div>
                </div>
              </div>
              <hr />
              <div className="post d-flex align-items-center justify-content-center mb-3">
                <img
                  alt=""
                  src="https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-2.jpg"
                />
                <div className=" ms-3">
                  <div className="date mt-2 fw-bolder"> 20 Nov,2020 </div>
                  <div className="post-title">
                    {" "}
                    Healthy Farm Diary Products{" "}
                  </div>
                </div>
              </div>
              <hr />
              <div className="post d-flex align-items-center justify-content-center mb-3">
                <img
                  alt=""
                  src="https://ninetheme.com/themes/html-templates/oganik/assets/images/blog/lp-1-3.jpg"
                />
                <div className=" ms-3">
                  <div className="date mt-2 fw-bolder">20 Nov,2020</div>
                  <div className="post-title">Healthy Farm Diary Products</div>
                </div>
              </div>
            </div>
            <div className="categories mt-2">
              <h4 className="ms-4 mb-3">Categories</h4>
              <div className="d-flex justify-content-around mb-2">
                <div className="category-name fs-5 fw-bolder">
                  <Link to="/Crops">Agriculture Crop</Link>
                </div>
                <div className="category-arrow fw-bold">
                  <Link to="/Crops">
                    <BiChevronRight className="me-2 fs-5" />
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-around mb-2">
                <div className="category-name fs-5 fw-bolder">
                  <Link to="/Lands">Agriculture Lands</Link>
                </div>
                <div className="category-arrow fw-bold">
                  <Link to="/Lands">
                    <BiChevronRight className="me-2 fs-5" />
                  </Link>
                </div>
              </div>
              <div className="d-flex justify-content-around mb-2">
                <div className="category-name crop fs-5 fw-bolder">
                  <Link to="/Stock">Crops</Link>
                </div>
                <div className="category-arrow fw-bold">
                  <Link to="/Stock">
                    <BiChevronRight className="me-2 fs-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SingleProduct;
