import React from 'react';
import "./About.css";
import OurHistory from '../../OurHistory/OurHistory';
import KnowingUs from '../../KnowingUs/KnowingUs';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CompletedTasks from '../../CompletedTasks/CompletedTasks';
function About(){
  return(
    <div>
      <div className='about-starting-img'>
        <img src="https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/02/organic-news-24.jpg" alt="" height="400"  width="100%" />
        <Breadcrumb className='direction'>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <OurHistory />
      <KnowingUs />
      <CompletedTasks />
    </div>
  )
}

export default About;