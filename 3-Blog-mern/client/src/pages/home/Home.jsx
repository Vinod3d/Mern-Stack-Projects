import React from 'react'
import classess from './home.module.css'
import Navbar from '../../components/navbar/Navbar'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'

const Home = () => {
  return (
    <>
        <Navbar/>
        <FeaturedBlogs/>
    </>
  )
}

export default Home