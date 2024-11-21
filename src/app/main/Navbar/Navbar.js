import React from 'react'

const Navbar = ({Component,sx}) => {
  return (
    <div className='w-full shadow-md' style={{backgroundColor:"#FFFFFF",...sx}} ><Component/></div>
  )
}

export default Navbar