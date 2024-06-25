import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <>
      <div className="topcontainer">
        <div className="topheadline">
          <h3>Insta</h3>
        </div>
        <div className="topsearch">
          <div className="search">
            <span class="material-symbols-outlined">search</span>
            <input placeholder="Search for post or Video" />
          </div>
          
        </div>

        <div className="topbaricons">
          <div className="icons">
            <div className="person">
            
            
            </div>
            <div className="message">
              <span class="material-symbols-outlined">sms</span>
              <p className="num">1</p>
            </div>
            <div className="notification">
              <span class="material-symbols-outlined">notifications</span>
              <p className="num">1</p>
            </div>
          </div>
          <div className="topbarprofile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQKaS7LP80SEcKgz9-d_ORjkh1B9hPSUqkeI_mLSnDg&s"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
