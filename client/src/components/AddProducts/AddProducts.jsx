import React from 'react';
import './AddProducts.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddAgricultureCrop from '../AddAgricultureCrop/AddAgricultureCrop';
import AddAgricultureLand from '../AddAgricultureLand/AddAgricultureLand';

const Addproducts = () => {
  return (
    <React.Fragment>
      <div className='img-shops mb-5'>
        <img src='https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg' width="100%" alt='' />
          <h3>
            <Breadcrumb className='direction'>
              <Breadcrumb.Item active>Shop</Breadcrumb.Item>
              <Breadcrumb.Item>Add Products</Breadcrumb.Item>
            </Breadcrumb>
          </h3>
      </div>
      <div className='container add-product d-flex justify-content-center'>
        {
          window.location.href.includes('/Lands') 
          ?  <AddAgricultureLand /> 
          :  <AddAgricultureCrop />
        }
      </div>
    </React.Fragment>
  );
}

export default Addproducts;

