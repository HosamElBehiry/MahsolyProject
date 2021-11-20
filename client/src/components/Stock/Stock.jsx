import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Stock.css";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiStarSFill } from "react-icons/ri";
import {connect} from 'react-redux';
import {getAllStocks, getByTypeId} from '../ActionFolder/Actions/StockActions';

function Stock(props) {
  const selectRef = useRef(null);
  const selectedRef = useRef(null);
  const selectedBoxRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const lists = ["All", "Vegetables", "Fruits", "Others"];
  const handleClick = () => {
    selectRef.current.style.display = !isSelected ? "block" : "none";
    setIsSelected(!isSelected);
  };
  const changeSelection = (name, typeID) => {
    selectedRef.current.innerHTML = name;
    if (typeID !== 0) {
      props.getStockByTypeId(typeID);
    } else {
      props.getAllStocks();
    }
    handleClick();
  };
  useEffect(() => {
    props.getAllStocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="shops">
      <div className="img-shops mb-5">
        <img
          src="https://ninetheme.com/themes/html-templates/oganik/assets/images/backgrounds/page-header-bg-1-1.jpg"
          width="100%"
          alt=""
        />
        <h3>
          <Breadcrumb className="direction">
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Stock Market</Breadcrumb.Item>
          </Breadcrumb>
        </h3>
      </div>
      <div className="container all-products d-flex align-items-center justify-content-between">
        <div className="search-section">
          <input type="text" placeholder="Search" />
          <BsSearch className="search-shape" />
        </div>
        <div className="result-numbers fw-bolder">
          {" "}
          Showing 1-{props.stockArray.length} of 12 results
        </div>
        <div className="selected-box" ref={selectedBoxRef}>
          <div className="select-parent">
            <div className="mt-2 selected">
              <span ref={selectedRef}>Sort by Popular </span>{" "}
              <IoMdArrowDropdown
                className="ms-3 mb-1 bottom-arrow"
                onClick={() => handleClick()}
              />
            </div>
          </div>
        </div>
        <div className="select-box" ref={selectRef}>
          <div className="select-child">
            {lists.map((list, index) => {
              return (
                <div
                  className="mt-2 selected"
                  key={index}
                  onClick={() => changeSelection(list, index)}
                >
                  {list}{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container stock-market mt-4">
        <div className="row">
          {props.stockArray.map((crop) => {
            return (
              <div className="col-lg-4 mb-4 stock-section" key={crop._id}>
                <img className="img-fluid" src={crop.img} alt="" />
                <div className="d-flex align-items-center">
                  <p className="mt-4 fw-bolder stock-name mb-0">{crop.name}</p>
                  <p className="mt-4 fw-bolder stock-stars mb-1">
                    {[...Array(crop.stars)].map((x, i) => (
                      <RiStarSFill key={i} />
                    ))}
                  </p>
                </div>
                <p className="stock-price">
                  $
                  {crop.price - parseInt(crop.price) > 0.0
                    ? crop.price
                    : parseInt(crop.price) + ".0"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {
    stockArray: state.StockReducer.Stock
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getAllStocks: () => dispatch(getAllStocks()),
    getStockByTypeId: (stockID) => dispatch(getByTypeId(stockID))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Stock);
