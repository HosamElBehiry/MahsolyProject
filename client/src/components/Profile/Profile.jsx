import React, {useState, useEffect} from 'react'
import './Profile.css';
import {FaRegComments,FaBalanceScale} from 'react-icons/fa';
// import {FiHeart} from 'react-icons/fi';
import {BsCurrencyDollar} from 'react-icons/bs';
import axios from 'axios';
function Profile(props) {
  const [userData, setUserData] = useState({});
  const units = ["Ton", "Kilogram", "Ardib", "Sack", "Piece", "Box"];
  const landUnits = ["Acre", "Carat", "Shape"];
  useEffect(() => {
    axios.get(`http://localhost:8080/users/${props.match.params.id}`)
    .then((response)=>{
      setUserData(response.data);
    }).catch((err)=>{
      console.log('Error', err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
      <div className='container-fluid profile-section'>
        <div className="row">
        <div className="col-xl-8 mx-auto mt-3">
            <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 person-cover">
                  <div className="align-items-end profile-header">
                    <div className="profile mr-3 pt-5">
                      <img src={`http://localhost:8080/${userData.image}`} 
                        alt="..." width="130" className="rounded mb-2 img-thumbnail" 
                      />
                      {/* <span href="#" className="btn btn-dark btn-sm btn-block">Edit profile</span> */}
                    </div>
                    <div className="media-body mb-5 text-white">
                      <h4 className='person-name'>{userData.name}</h4>
                    </div>
                  </div>
                </div>
                <div className="p-4 d-flex justify-content-center text-center crops-lands-info fs-5">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item px-5">
                      <h5 className="font-weight-bold mb-0 d-block">{userData.AgricultureCrop?.length}</h5>
                      <small className="text-muted"> 
                        <i className="fa fa-picture-o mr-1"></i>Agriculture Crops</small>
                    </li>
                    <li className="list-inline-item px-5">
                      <h5 className="font-weight-bold mb-0 d-block">{userData.AgricultureLand?.length}</h5><small className="text-muted"> <i className="fa fa-user-circle-o mr-1"></i>Agriculture Lands</small>
                    </li>
                    <li className="list-inline-item px-5">
                      <h5 className="font-weight-bold mb-0 d-block">{userData.favourites?.length}</h5>
                      <small className="text-muted"> 
                        <i className="fa fa-picture-o mr-1"></i>Favourites</small>
                    </li>
                  </ul>
                </div>
                <div className="px-sm-3">
                    <div className="py-4">
                        <h5 className="mb-3 recent-posts">Recent posts</h5>
                        {
                          userData.AgricultureCrop?.map((crop)=>{
                            return (
                              <div className="bg-light rounded shadow-sm mb-3" key={crop._id}>
                                <img src = {`http://localhost:8080/${crop.images}`} height={'300px'} width={'100%'} alt="" className='rounded' />
                                <h3 className="mt-2">{crop.description}</h3>
                                  <p className="post-description mb-0 mt-2 fs-4 lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                  <ul className="list-inline small text-muted mt-3 mb-0">
                                    {/* <li className="list-inline-item mx-md-1">
                                      <FiHeart className='fs-5 mb-1 shape'/>
                                      <span className="me-2 shape-span">
                                        200 Likes
                                      </span>
                                    </li> */}
                                    <li className="list-inline-item mx-md-1">
                                      <FaRegComments className="fs-4 mb-1 shape" />{" "}
                                      <span className="me-2 shape-span">
                                        {crop.comments.length} {crop.comments.length > 1 ? 'Comments' : 'Comment'}
                                      </span>
                                    </li>
                                    <li className="list-inline-item">
                                      <BsCurrencyDollar className="fs-5 mb-1 shape" />{" "}
                                      <span className="me-3 shape-span fs-5">{crop.price} dollar</span>
                                    </li>
                                    <li className="list-inline-item">
                                      <FaBalanceScale className="me-1 fs-5 mb-1 shape" />
                                      <span className="me-2 shape-span fs-5">
                                        {crop.quantity} {units[crop.quantityId - 1]}
                                      </span>
                                    </li>
                                  </ul>
                              </div>
                            )
                          })
                        }
                        {
                          userData.AgricultureLand?.map((land)=>{
                            return (
                              <div className="bg-light rounded shadow-sm mb-3" key={land._id}>
                                <img src = {`http://localhost:8080/${land.image}`} height={'300px'} width={'100%'} alt="" className='rounded' />
                                <h3 className="mt-2">{land.description}</h3>
                                  <p className="post-description mb-0 mt-2 fs-4 lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                  <ul className="list-inline small text-muted mt-3 mb-0">
                                    {/* <li className="list-inline-item mx-md-1">
                                      <FiHeart className='fs-5 mb-1 shape'/>
                                      <span className="me-2 shape-span">
                                        200 Likes
                                      </span>
                                    </li> */}
                                    <li className="list-inline-item mx-md-1">
                                      <FaRegComments className="fs-4 mb-1 shape" />{" "}
                                      <span className="me-2 shape-span">
                                        {land.comments.length} {land.comments.length > 1 ? 'Comments' : 'Comment'}
                                      </span>
                                    </li>
                                    <li className="list-inline-item">
                                      <BsCurrencyDollar className="fs-5 mb-1 shape" />{" "}
                                      <span className="me-3 shape-span fs-5">{land.price} dollar</span>
                                    </li>
                                    <li className="list-inline-item">
                                      <FaBalanceScale className="me-1 fs-5 mb-1 shape" />
                                      <span className="me-2 shape-span fs-5">
                                        {land.area} {landUnits[land.measurement - 1]}
                                      </span>
                                    </li>
                                  </ul>
                              </div>
                            )
                          })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Profile
