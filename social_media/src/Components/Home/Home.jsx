import React from 'react'
import "./Home.css"
import Topbar from '../Topbar/Topbar'
import SideBar from '../Sidebar/SideBar'
import RightBar from '../RightBar/RightBar'
import Feed from '../Feed/Feed'


const Home = () => {
  return (
    <div className='container2'>

      <Topbar/>
     
      <div className="HomeContainer">
          <SideBar/>
          <Feed/>
          <RightBar/>
      </div>
    
    </div>
  )
}

export default Home
