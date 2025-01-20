import React from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Home = () => {
  return (
    <>
      <div className='container' style={{textAlign:"center"}}>
        <h1 style={{marginBottom:"10px"}}><HomeIcon fontSize="large"/> Board App</h1>
        <h2 style={{marginBottom:"10px"}}><FavoriteIcon fontSize="medium"/> 게시판 앱</h2>
        <Link to="/boards" className='btn'>게시판</Link>
      </div>
    </>
  )
}

export default Home