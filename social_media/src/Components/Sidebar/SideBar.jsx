import React from "react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="SideBarcontainer">
        <ul className="sidebarList">
          <li className="List">
            <span class="material-symbols-outlined">rss_feed</span>{" "}
            <span>Feed</span>
          </li>
          <li className="List">
            <span class="material-symbols-outlined">chat</span>{" "}
            <span>Chats</span>
          </li>
          <li className="List">
            <span class="material-symbols-outlined">play_circle</span>{" "}
            <span>Video</span>
          </li>
          <li className="List">
            <span class="material-symbols-outlined">group</span>{" "}
            <span>Groups</span>
          </li>
      
        
          <li className="List">
            <span class="material-symbols-outlined">event</span>{" "}
            <span>Events</span>
          </li>
        </ul>
        
       
          <hr />
        
       
        <div className="UserProfile">
          <div className="profils">
          <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1714521600&semt=sph" alt="" />
          <span className="UserNAme"> Vishwa k</span>
          </div>
          
        </div>
      </div>
    
    </>
    
  );
};

export default SideBar;
