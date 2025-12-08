import React from 'react'

import TrendingPerson from '../components/TrendingPerson'
import TrendingNews from '../components/TrendingNews'
import HeroTopNews from '../components/HeroTopNews'
import MajorNewsSection from '../components/MajorNewsSection'
// import Authform from '../components/auth/Authform'


const page = () => {



  return (
    <div className='overflow-x-hidden'>
      {/* <Authform/> */}
      {/* <TopSocialMediaHeader/>
      <HeaderNav/> */}
<TrendingPerson/>
      <TrendingNews/>
      <HeroTopNews/>
      <MajorNewsSection/>

    </div>
  )
}

export default page