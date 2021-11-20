import React, { useState } from "react";
import "./ContactHome.css";
import Loader from "../../public/images/loader.png";
import axios from "axios";

function ContactHome() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/contact", {
        fullName,
        email,
        mobile,
        message,
      })
      .then(() => {
        setError(false);
        setTimeout(() => setError(""), 2000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(""), 2000);
      });
    setFullName("");
    setEmail("");
    setMobile("");
    setMessage("");
  };
  return (
    <div className="container">
      <div className="contact-home d-flex align-items-center justify-content-around">
        <div className="contact-home-img">
          <img
            src="https://ninetheme.com/themes/agrikon/wp-content/uploads/2020/12/contact-1.jpg"
            alt=""
          />
        </div>
        <div className="contact-home-ui">
          <img src={Loader} alt="" className="mb-3" />
          <h6 className="mb-2">Contact Now</h6>
          <h1>Leave Us Message</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              name="fullName"
              autoComplete="none"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="none"
              pattern='^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              required
              onChange={(e) => setMobile(e.target.value)}
              name="mobile"
              autoComplete="none"
              pattern="^(010|011|012|015)[0-9]{8}"
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Leave Message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              autoComplete="none"
            ></textarea>
            <button className="btn btn-warning" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          error
            ? "error result-msg mt-5 fw-bolder"
            : error === false
            ? "success result-msg mt-5 fw-bolder"
            : "d-none"
        }
      >
        {error ? "Error Invalid" : "Message Successfully Sent"}
      </div>
    </div>
  );
}

export default ContactHome;
