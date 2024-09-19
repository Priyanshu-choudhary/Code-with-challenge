import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import React ,{useRef}from 'react';
import SearchInput from '../home/Search/Searchbr';
function ParallaxBanner() {
  const ref = useRef()
  return (
    <Parallax pages={2} ref={ref}>
      <ParallaxLayer onClick={()=>{ref.current.scrollTo(3)}} speed={10} >
        <p style={{marginTop:"10%"}} className=' text-center text-Black text-7xl ml-5'>Elevate Your Coding Skills</p>
        <p className=' text-center ml-5 mt-3 text-xl'>Explore, code, compete: Courses, challenges, hackathons</p>
      </ParallaxLayer>
      
      <ParallaxLayer  speed={0.1}   >
       <SearchInput/>
      </ParallaxLayer>
    </Parallax>
  )
}

export default ParallaxBanner;