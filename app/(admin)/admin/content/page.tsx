"use client"
import { Category } from '@/app/lib/categoryTypes';
import React, { useState } from 'react'

const page = () => {

  const [updateValue, setUpdateValue] = useState<Category | null>(null);
  
   console.log(updateValue);
  return (
    <div className=' overflow-x-hidden ms-[16.2%]  min-h-screen text-black'>

      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non laboriosam earum et aspernatur, quibusdam obcaecati? Nihil, molestiae nulla inventore architecto vero eius? Eligendi eaque necessitatibus porro, dolore placeat ut eos quo provident dicta ex magnam dolores sint obcaecati, quia molestias impedit odit cupiditate consectetur! Debitis ad nemo, in, consequatur eligendi excepturi impedit quam iure, ut id recusandae tenetur corporis nisi placeat suscipit dolor corrupti dolores. Illo animi dolore porro quasi facere libero nam id, itaque, impedit veritatis beatae veniam assumenda incidunt cum enim quis! Provident ipsum id quam vero sint sapiente exercitationem aliquid perspiciatis, optio velit non, distinctio ipsam nulla?
    </div>
  )
}

export default page