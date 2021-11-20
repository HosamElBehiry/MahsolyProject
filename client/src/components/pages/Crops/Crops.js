import "./Crops.css";
import React, { useRef, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import GetAllProducts from "../../GetAllProducts/GetAllProducts";
import { getAllCrops } from "../../ActionFolder/Actions/AgricultureCropActions";
import { connect } from "react-redux";

function Crops(props) {
  const selectRef = useRef(null);
  const selectedRef = useRef(null);
  const selectedBoxRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const sortBy = ["All", "Vegetables", "Fruits", "Others"];
  const handleClick = () => {
    selectRef.current.style.display = !isSelected ? "block" : "none";
    setIsSelected(!isSelected);
  };
  const changeSelection = (name) => {
    selectedRef.current.innerHTML = name;
    handleClick();
  };
  props.getAll();
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
            <Breadcrumb.Item>Crops</Breadcrumb.Item>
          </Breadcrumb>
        </h3>
      </div>
      <div className="container all-products d-flex align-items-center justify-content-between">
        <div className="search-section">
          <input type="text" placeholder="Search" />
          <BsSearch className="search-shape" />
        </div>
        <div className="result-numbers fw-bolder invisible">
          Showing 1-6 of 12 results
        </div>
        <div className="selected-box" ref={selectedBoxRef}>
          <div className="select-parent">
            <div className="mt-2 selected">
              <span ref={selectedRef}>Sort by Popular </span>
              <IoMdArrowDropdown
                className="ms-3 mb-1 bottom-arrow"
                onClick={() => handleClick()}
              />
            </div>
          </div>
        </div>
        <div className="select-box" ref={selectRef}>
          <div className="select-child">
            {sortBy.map((list, index) => {
              return (
                <div
                  className="mt-2 selected"
                  key={index}
                  onClick={() => changeSelection(list)}
                >
                  {list}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <GetAllProducts />
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAll: () => dispatch(getAllCrops()),
  };
};

export default connect(null, mapDispatchToProps)(Crops);
