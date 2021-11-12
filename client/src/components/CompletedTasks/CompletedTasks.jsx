import React from 'react'
import './CompletedTasks.css';
import { FaHandshake} from 'react-icons/fa';
import {RiUserStarFill, RiPlantLine} from 'react-icons/ri';
import {GiFarmer} from 'react-icons/gi';
function CompletedTasks() {
  return (
    <div className='container completed-tasks'>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 text-center shape-parent">
            <RiPlantLine className="ms-4 shape"/>
            <h2 className='mb-0 counter'>6,420</h2>
            <h5>Agriculture Products</h5>
          </div>
          <div className="col-lg-3 col-md-6 text-center shape-parent">
            <FaHandshake className="ms-4 shape"/>
            <h2 className='mb-0 counter'>8,800</h2>
            <h5>Completed Projects</h5>
          </div>
          <div className="col-lg-3 col-md-6 text-center shape-parent">
            <RiUserStarFill className="ms-4 shape"/>
            <h2 className='mb-0 counter'>9,280</h2>
            <h5>Total Users</h5>
          </div>
          <div className="col-lg-3 col-md-6 text-center shape-parent">
            <GiFarmer className="ms-4 shape"/>
            <h2 className='mb-0 counter'>1,800</h2>
            <h5>Expert Traders</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedTasks
