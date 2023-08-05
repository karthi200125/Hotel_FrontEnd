import React from 'react';
import './Footer.css';
import { FaUsers, FaBriefcase, FaQuoteLeft, FaHandshake } from 'react-icons/fa';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="flists">
        <div className="fcon">
          <ul className="flist">            
            <li className="ftitle">About Us</li>
            <li className="flistitem"><FaUsers size={20} /> Our Team</li>
            <li className="flistitem"><FaBriefcase size={20} /> Careers</li>
            <li className="flistitem"><FaQuoteLeft size={20} /> Testimonials</li>
            <li className="flistitem"><FaHandshake size={20} /> Partners</li>
          </ul>

          {/* Address */}
          <ul className="flist">
            <li className="ftitle">Address</li>
            <li className="flistitem"><IoLocationSharp size={20} /> 123 Main St</li>
            <li className="flistitem"><IoLocationSharp size={20} /> City, State ZIP</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Country</li>
            <li className="flistitem"><AiOutlinePhone size={20} /> Phone: (123) 456-7890</li>
            <li className="flistitem"><AiOutlineMail size={20} /> Email: info@example.com</li>
          </ul>

          {/* Cities */}
          <ul className="flist">
            <li className="ftitle">Cities</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Mumbai</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Delhi</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Bangalore</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Kolkata</li>
            <li className="flistitem"><IoLocationSharp size={20} /> Chennai</li>
          </ul>

          {/* Social Media Pages */}
          <ul className="flist">
            <li className="ftitle">Pages</li>
            <li className="flistitem"><FiFacebook size={20} /> Facebook</li>
            <li className="flistitem"><FiTwitter size={20} /> Twitter</li>
            <li className="flistitem"><FiInstagram size={20} /> Instagram</li>
            <li className="flistitem"><FiLinkedin size={20} /> LinkedIn</li>
            <li className="flistitem"><FiYoutube size={20} /> YouTube</li>
          </ul>
        </div>
      </div>
      <div className="ftext">Copyright © 2023 Travel Trove</div>
    </div>
  );
};

export default Footer;
