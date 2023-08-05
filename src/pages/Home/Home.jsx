import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/header'
import List from '../List/List'
import Featured from '../../components/Featured/featured'
import PropertyList from '../../components/PropertyList/PropertyList'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Header/>
        <div className="homecontainer">
            <Featured/>        
        <h1 className="hometitle">Browse for Property type</h1>
        <PropertyList/>
        <h1 className="hometitle">Home Guest Love</h1>
        <FeaturedProperties/>        
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default Home